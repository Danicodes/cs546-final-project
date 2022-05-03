// chat.js (routes)
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System. Ethan Grzeda


// Sources

// I used this webpage to find out how to check whether an object is a date:
// https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
// I used this webpage to learn about the Date.getTime() function:
// https://www.w3schools.com/jsref/jsref_gettime.asp

// Constants
const MAX_MESSAGE_LENGTH = 256;
const statusStates = ["PENDING", "ACTIVE", "REJECTED", "COMPLETED"];
const xss = require('xss');

// Imports

const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
const data = require('../data');
const chatData = data.chat;
const mongoCollections = require("./../config/mongoCollections");

const usersCol = mongoCollections.users;
const relationshipsCol = mongoCollections.relationships;
const chatsCol = mongoCollections.chats;


router
    .route("/:id/messages")
    // Displays messages for a given relationship
    // QueryParams: timestamp
    // Response: Latest message objects
    .get(async (req, res) => {

        try{
            //console.log("GET /chats/:id/messages route"); // debug

            // <ERROR CHECKING> --> CHANGE THESE TO ERROR PAGES ONCE THOSE ARE DONE

            let id = xss(req.params.id);
            let timestamp = xss(req.body.timestamp);

            let errorFlag = false;

            // Check that id is provided, it is a valid ObjectId, and that it corresponds to an existing relationship
            if(!errorFlag && !id){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "id must be provided"});
                //res.status(400).json("GET /relationship/:id/messages: id must be provided");
            }
            if(!errorFlag && !ObjectId.isValid(id)){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "id must be a valid ObjectId"});
                //res.status(400).json("GET /relationship/:id/messages: id must be a valid ObjectId");
            }
            let foundRelationship = null;
            if(!errorFlag){
                const relationshipsCollection = await relationshipsCol();
                foundRelationship = await relationshipsCollection.findOne({"_id": ObjectId(id)});
                if(foundRelationship === null){
                    errorFlag = true;
                    res.render('frames/404error', {errorMessage: "We could not find a relationship with the given id"});
                    //res.status(404).json("GET /relationship/:id/messages: could not find a relationship with the given id");
                }
            }
            // Check that timestamp is provided, it is a valid timestamp, it is not for a time before the relationship was created, and the chat for the relationship can be found
            if(!errorFlag && !timestamp){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "timestamp must be provided"});
                //res.status(400).json("GET /relationship/:id/messages: timestamp must be provided");
            }
            // I used this webpage to learn more about the Javascript Date object:
            // https://www.w3schools.com/jsref/jsref_obj_date.asp
            // I'm assuming the timestamp will be passed as a string representation of the integer of the number of milliseconds
            if(!errorFlag){
                timestamp = parseInt(timestamp);
                if(isNaN(timestamp)){
                    errorFlag = true;
                    res.render('frames/400error', {errorMessage: "timestamp must be an integer"});
                    //res.status(400).json("GET /relationship/:id/messages: timestamp must be an integer");
                }
            }
            if(!errorFlag && timestamp < 0){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "timestamp must be nonnegative"});
                //res.status(400).json("GET /relationship/:id/messages: timestamp must be nonnegative");
            }
            let foundChat = null;
            if(!errorFlag){
                const chatsCollection = await chatsCol();
                foundChat = await chatsCollection.findOne({"_id": foundRelationship["chatChannel"]});
                if(foundChat === null){
                    errorFlag = true;
                    res.render('frames/404error', {errorMessage: "We could not find the chat channel for the relationship"});
                    //res.status(404).json("GET /relationship/:id/messages: could not find the chat channel for the relationship");
                }
            }
            if(!errorFlag){
                let chatCreated = foundRelationship["createdOn"];
                chatCreated = chatCreated.getTime();
                if(chatCreated > timestamp){
                    errorFlag = true;
                    res.render('frames/400error', {errorMessage: "timestamp given must be after the relationship was created"});
                    //res.status(400).json("GET /relationship/:id/messages: timestamp given must be after the relationship was created");
                }
            }

            // </ERROR CHECKING>

            if(!errorFlag){
                let chatMessages = await chatData.getChatWithTimestamp(foundRelationship["chatChannel"].toString(), timestamp);
                res.json(chatMessages);
            }
        } catch (e) {
            //console.log("Error in GET /relationships/:id/messages route:"); // 500
            //console.log(e); // debug
            res.render('frames/500error');
            //res.status(500).json(e);
        }
        

    })
    // When a user sends a new message for a particular relationship
    // ReqBody: author, timestamp, message
    // Response: Latest status of the relation
    .post(async (req, res) => {

        // I don't quite understand why we're returning the relationship status at the end of this one, but I implemented it nonetheless

        try{
            //console.log("POST /chats/:id/messages route"); // debug

            // <ERROR CHECKING> --> CHANGE THESE TO ERROR PAGES ONCE THOSE ARE DONE

            let id = xss(req.params.id);
            let author = xss(req.body.author);
            let timestamp = xss(req.body.timestamp);
            let message = xss(req.body.message);

            let errorFlag = false; // Set to true if any error occurs, where the user is served an error page

            // Check that id is provided, it is a valid ObjectId, and that it corresponds to an existing relationship
            if(!errorFlag && !id){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "id must be provided"});
                //res.status(400).json("POST /relationships/:id/messages: id must be provided");
            }
            if(!errorFlag && !ObjectId.isValid(id)){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "id must be a valid ObjectId"});
                //res.status(400).json("POST /relationships/:id/messages: id must be a valid ObjectId");
            }
            let foundRelationship = null;
            if(!errorFlag){
                const relationshipsCollection = await relationshipsCol();
                foundRelationship = await relationshipsCollection.findOne({"_id": ObjectId(id)});
                if(foundRelationship === null){
                    errorFlag = true;
                    res.render('frames/404error', {errorMessage: "We could not find a relationship with the given id"});
                    //res.status(404).json("POST /relationships/:id/messages: could not find a relationship with the given id");
                }
            }
            // Check that author is provided, it is a valid ObjectId, it exists in the database, and it is part of the relationship
            if(!errorFlag && !author){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "author must be provided"});
                //res.status(400).json("POST /relationships/:id/messages: author must be provided");
            }
            if(!errorFlag && !ObjectId.isValid(author)){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "author must be a valid ObjectId"});
                //res.status(400).json("POST /relationships/:id/messages: author must be a valid ObjectId");
            }
            if(!errorFlag){
                const usersCollection = await usersCol();
                const foundUser = await usersCollection.findOne({"_id": ObjectId(author)});
                if(!errorFlag && foundUser === null){
                    errorFlag = true;
                    res.render('frames/404error', {errorMessage: "We could not find a user with the given user id"});
                    //res.status(404).json("POST /relationships/:id/messages: could not find an a user with the given author id");
                }
            }
            if(!errorFlag && foundRelationship["mentor"].toString().localeCompare(author) !== 0 && foundRelationship["mentee"].toString().localeCompare(author) !== 0){
                errorFlag = true;
                res.render('frames/404error', {errorMessage: "We could not find the given author in the given relationship"});
                //res.status(404).json("POST /relationships/:id/messages: could not find the given author in the given relationship");
            }
            // Check that timestamp is provided, it is a valid timestamp, it's not before the chat was created, and that the chat for the relationship can be found
            if(!errorFlag && !timestamp){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "timestamp must be provided"});
                //res.status(400).json("POST /relationships/:id/messages: timestamp must be provided");
            }
            if(!errorFlag){
                timestamp = parseInt(timestamp);
                if(isNaN(timestamp)){
                    errorFlag = true;
                    res.render('frames/400error', {errorMessage: "timestamp must be a number"});
                    //res.status(400).json("POST /relationships/:id/messages: timestamp must be a number");
                }
            }
            if(!errorFlag && timestamp < 0){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "timestamp must be nonnegative"});
                //res.status(400).json("POST /relationships/:id/messages: timestamp must be nonnegative");
            }
            if(!errorFlag){
                const chatsCollection = await chatsCol();
                const foundChat = await chatsCollection.findOne({"_id": foundRelationship["chatChannel"]});
                if(foundChat === null){
                    errorFlag = true;
                    res.render('frames/404error', {errorMessage: "We could not find a chat channel for the given relationship"});
                    //res.status(404).json("POST /relationship/:id/messages: could not find a chat channel for the given relationship");
                }
            }
            if(!errorFlag){
                let relationshipCreated = foundRelationship["createdOn"];
                relationshipCreated = relationshipCreated.getTime();
                if(relationshipCreated > timestamp){
                    errorFlag = true;
                    res.render('frames/400error', {errorMessage: "timestamp given must be after the chat was created"});
                    //res.status(400).json("POST /relationship/:id/messages: timestamp given must be after the chat was created");
                }
            }
            // Check that message is provided, it is not empty, it is not just spaces, and that it is not longer than the maximum message length
            if(!errorFlag && !message){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "message must be provided"});
                //res.status(400).json("POST /relationship/:id/messages: message must be provided");
            }
            if(!errorFlag && message === ""){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "message must not be empty"});
                //res.status(400).json("POST /relationship/:id/messages: message must not be empty");
            }
            if(!errorFlag && message.trim() === ""){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "message must not be just spaces"});
                //res.status(400).json("POST /relationship/:id/messages: message must not be just spaces");
            }
            if(!errorFlag){
                message = message.trim();
                if(message.length > MAX_MESSAGE_LENGTH){
                    errorFlag = true;
                    res.render('frames/400error', {errorMessage: "message must not be longer than the maximum message length"});
                    //res.status(400).json("POST /relationship/:id/messages: message must not be longer than the maximum message length");
                }
            }

            // </ERROR CHECKING>

            if(!errorFlag){
                await chatData.newMessage(author, id, message);
                res.json(await chatData.getStatus(id));
            }
        } catch (e) {
            //console.log("Error in POST /relationships/:id/messages route:"); // 500
            //console.log(e); // debug
            res.render('frames/500error');
            //res.status(500).json(e);
        }
    })

router
    .route("/:id/status")
    // Optional
    // When the status of a relationship needs to be retrieved periodically
    // Response: Latest status of relationhip
    .get(async (req, res) => {
        try{
            console.log("GET /relationships/:id/status"); // debug

            // <ERROR CHECKING> --> CHANGE THESE TO ERROR PAGES ONCE THOSE ARE DONE

            let id = xss(req.params.id);

            let errorFlag = false;

            // Check that id is provided, it is a valid ObjectId, and that it corresponds to an existing relationship
            if(!errorFlag && !id){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "id must be provided"});
                //res.status(400).json("GET /relationship/:id/status: id must be provided");
            }
            if(!errorFlag && !ObjectId.isValid(id)){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "id must be a valid ObjectId"});
                //res.status(400).json("GET /relationship/:id/status: id must be a valid ObjectId");
            }
            if(!errorFlag){
                const relationshipsCollection = await relationshipsCol();
                const foundRelationship = await relationshipsCollection.findOne({"_id": ObjectId(id)});
                if(foundRelationship === null){
                    errorFlag = true;
                    res.render('frames/404error', {errorMessage: "We could not find a relationship with the given id"});
                    //res.status(404).json("GET /relationship/:id/status: could not find a relationship with the given id");
                }
            }

            // </ERROR CHECKING>

            if(!errorFlag){
                res.json(await chatData.getStatus(id));
            }
        } catch (e) {
            console.log("Error in GET /relationships/:id/status route:"); // 500
            console.log(e); // debug
            res.render('frames/500error');
            //res.status(500).json(e);
        }
    })
    // When a user performs an action for a relationship and status needs to be updated
    // ReqBody: newStatus
    // Response: Updated status of relationship
    .post(async (req, res) => {
        try{
            console.log("POST /relationships/:id/status"); // debug

            // <ERROR CHECKING> --> CHANGE THESE TO ERROR PAGES ONCE THOSE ARE DONE

            let id = xss(req.params.id);
            let newStatus = xss(req.body.newStatus);

            let errorFlag = false;

            // Check that id is provided, it is a valid ObjectId, and it corresponds to an existing relationship
            if(!errorFlag && !id){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "id must be provided"});
                //res.status(400).json("POST /relationships/:id/status: id must be provided");
            }
            if(!errorFlag && !ObjectId.isValid(id)){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "id must be a valid ObjectId"});
                //res.status(400).json("POST /relationships/:id/status: id must be a valid ObjectId");
            }
            if(!errorFlag){
                const relationshipsCollection = await relationshipsCol();
                const foundRelationship = await relationshipsCollection.findOne({"_id": ObjectId(id)});
                if(foundRelationship === null){
                    errorFlag = true;
                    res.render('frames/404error', {errorMessage: "We could not find a relationship with the given id"});
                    //res.status(404).json("POST /relationship/:id/status: could not find a relationship with the given id");
                }
            }
            // Check that newStatus is provided, and that it is a valid status string
            if(!errorFlag && !newStatus){
                errorFlag = true;
                res.render('frames/400error', {errorMessage: "newStatus must be provided"});
                //res.status(400).json("POST /relationship/:id/status: newStatus must be provided");
            }
            if(!errorFlag){
                let validStatus = false;
                for(let i = 0; i < statusStates.length; i++){
                    if(statusStates[i].localeCompare(newStatus) === 0){
                        validStatus = true;
                        break;
                    }
                }
                if(!validStatus){
                    errorFlag = true;
                    res.render('frames/400error', {errorMessage: "newStatus must be a valid status string"});
                    //res.status(400).json("POST /relationship/:id/status: newStatus must be a valid status string");
                }
            }

            // </ERROR CHECKING>

            if(!errorFlag){
                await chatData.updateStatus(id, newStatus);
                res.json(await chatData.getStatus(id));
            }
        } catch (e) {
            //console.log("Error in POST /relationships/:id/status route:"); // 500
            //console.log(e); // debug
            res.render('frames/500error');
            //res.status(500).json(e);
        }
    })


// Placeholder routes for testing
router
    .route("/")
    .get(async (req, res) => {
        console.log("GET /relationships route"); // debug
    })
    .post(async (req, res) => {
        console.log("POST /relationships route"); // debug
    })


module.exports = router;

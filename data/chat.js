// chat.js (data)
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System. Ethan Grzeda


// Sources
// I brushed up on the return value of updateOne() here:
// https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/


// Constants
const MAX_MESSAGE_LENGTH = 256;
const statusStates = ["PENDING", "ACTIVE", "REJECTED", "COMPLETED"];

// Imports
const { ObjectId } = require('mongodb');
const { status } = require('../enums');
const UnprocessibleRequest = require('../errors/UnprocessibleRequest');
const mongoCollections = require('./../config/mongoCollections');
const mongoConnection = require('./../config/mongoConnection');
const chatsCol = mongoCollections.chats;
const usersCol = mongoCollections.users;
const relationshipsCol = mongoCollections.relationships;
const chatValidation = require('./../validations/chatValidation');

// Exported Functions
module.exports = {
    description: 'These are the functions for the chat feature of MentorMe',

    /*
    * Returns the inserted message object
    * 
    * Parameters:
    *  - sender             string form of a user's _id
    *  - relationship       string form of a relationship's _id
    *  - message            string
    */
    newMessage: async (sender, relationship, message, timestamp) => {
        // <ERROR CHECKING>

        // Check that sender is provided, it is a string, it is valid ObjectId, and that it exists in the database
        if(!sender) throw "newMessage: sender must be provided";
        if(typeof sender !== "string") throw "newMessage: sender must be a string";
        if(!ObjectId.isValid(sender)) throw "newMessage: sender must be a valid ObjectId";
        const usersCollection = await usersCol();
        const senderUser = await usersCollection.findOne({ "_id": ObjectId(sender) });
        if(senderUser === null) throw "newMessage: sender must be an existing user";

        // Check that relationship is provided, it is a string, it is a valid ObjectId, it can be found in the database, and it includes the sender
        if(!relationship) throw "newMessage: relationship must be provided";
        if(typeof relationship !== "string") throw "newMessage: relationship must be a string";
        if(!ObjectId.isValid(relationship)) throw "newMessage: relationship must be a valid ObjectId";
        const relationshipsCollection = await relationshipsCol();
        const messageRelationship = await relationshipsCollection.findOne({ "_id": ObjectId(relationship) });
        if(messageRelationship === null) throw "newMessage: relationship must be an existing relationship";
        if(messageRelationship.status != status.APPROVED) throw UnprocessibleRequest(`Only Active Relationships - ${messageRelationship.status} can add messages to the channel`);
        let found = false;
        if(messageRelationship["mentor"].toString().localeCompare(sender) === 0 || messageRelationship["mentee"].toString().localeCompare(sender) === 0) found = true;
        if(!found) throw "newMessage: relationship must include sender";

        // Check that message is provided, it is a string, it isn't empty, it isn't just spaces, and it isn't over the maximum message length
        if(typeof message === "undefined") throw "newMessage: message must be provided";
        if(typeof message !== "string") throw "newMessage: message must be a string";
        if(message.length === 0) throw "newMessage: message must not be empty";
        message = message.trim();
        if(message.length === 0) throw "newMessage: message must not be just spaces";
        if(message.length > MAX_MESSAGE_LENGTH) throw "newMessage: message must not be too long";

        // Check that timestamp is provided, it is a number, it is valid, and it is not before the start of the relationship
        if(!timestamp) throw "newMessage: timestamp must be provided";
        if(typeof timestamp !== "number") throw "newMessage: timestamp must be a number";
        if(timestamp < 0) throw "newMessage: timestamp must not be negative";
        let relationshipStart = messageRelationship["createdOn"].getTime();
        if(timestamp < relationshipStart) throw "newMessage: timestamp must not be before the relationship was started";

        // </ERROR CHECKING>

        // Make the message object
        let createdMessage = {
            "author": new ObjectId(sender),
            "message": message,
            "Datetime": new Date(timestamp)
        };

        const channelId = messageRelationship["chatChannel"];

        // Insert the object into the database and make sure it was inserted correctly
        const chatsCollection = await chatsCol();
        const updatedInfo = await chatsCollection.updateOne({"_id": channelId}, {"$push": {"messages": createdMessage}});
        if(!updatedInfo.acknowledged){
            throw "newMessage() could not insert the newly created chat message into the database";
        }

        return createdMessage;
    },

    /*
    * Returns the messages array of the specified chat channel
    * 
    * Parameters:
    *  - channelId          string form of a chat channel's _id
    */
    getChatByChannel: async (channelId) => {
        // <ERROR CHECKING>

        // Check that channelId is provided, it is a string, it is a valid ObjectId, and it is in the database
        if(!channelId) throw "getChatByChannel: channelId must be provided";
        if(typeof channelId !== "string") throw "getChatByChannel: channelId must be a string";
        if(!ObjectId.isValid(channelId)) throw "getChatByChannel: channelId must be a valid ObjectId";
        const chatsCollection = await chatsCol();
        const foundChannel = await chatsCollection.findOne({ "_id": ObjectId(channelId) });
        if(foundChannel === null) throw "getChatByChannel: channelId must be the id of an existing channel";

        // </ERROR CHECKING>

        return foundChannel["messages"];
    },

    /*
    * Returns the messages array of the specified chat channel, but only with messages sent by the time of the specified timestamp
    * 
    * Parameters:
    *  - channelId          string form of a chat channel's _id
    *  - timestamp          number (integer) form of a timestamp object (representing the number of milliseconds since midnight on January 1st, 1970)
    */
    getChatWithTimestamp: async (channelId, timestamp) => {
        // <ERROR CHECKING>

        // Check that channelId is provided, it is a string, it is a valid ObjectId, and it is in the database
        if(!channelId) throw "getChatWithTimestamp: channelId must be provided";
        if(typeof channelId !== "string") throw "getChatWithTimestamp: channelId must be a string";
        if(!ObjectId.isValid(channelId)) throw "getChatWithTimestamp: channelId must be a valid ObjectId";
        const chatsCollection = await chatsCol();
        const foundChannel = await chatsCollection.findOne({ "_id": ObjectId(channelId) });
        if(foundChannel === null) throw "getChatWithTimestamp: channelId must be the id of an existing channel";

        // Check that timestamp is provided, it is a number, and it is a valid timestamp
        if(!timestamp) throw "getChatWithTimestamp: timestamp must be provided";
        if(typeof timestamp !== "number") throw "getChatWithTimestamp: timestamp must be a number";
        if(timestamp < 0) throw "getChatWithTimestamp: timestamp must not be negative";

        // </ERROR CHECKING>

        let allMessages = foundChannel["messages"];
        let filteredMessages = [];
        for(let i = 0; i < allMessages.length; i++){
            let currentTimestamp = allMessages[i]["Datetime"];
            let currentNumber = currentTimestamp.getTime();
            if(currentNumber <= timestamp){
                filteredMessages.push(allMessages[i]);
            }
        }

        return filteredMessages;
    },

    /*
    * Returns the updated status string of the updated relationship
    * 
    * Parameters:
    *  - relationshipId     string form of a relationship's _id
    *  - newStatus          string (PENDING, ACTIVE, REJECTED, or COMPLETED)
    */
    updateStatus: async (relationshipId, newStatus) => {
        // <ERROR CHECKING>

        // Check that relationshipId is provided, it is a string, it is a valid ObjectId, and it is in the database
        if(!relationshipId) throw "updateStatus: relationshipId must be provided";
        if(typeof relationshipId !== "string") throw "updateStatus: relationshipId must be a string";
        if(!ObjectId.isValid(relationshipId)) throw "updateStatus: relationshipId must be a valid ObjectId";
        const relationshipsCollection = await relationshipsCol();
        let foundRelationship = await relationshipsCollection.findOne({"_id": ObjectId(relationshipId)});
        if(foundRelationship === null) throw "updateStatus: relationshipId must by the id of an existing relationship";

        // Check that newStatus is provided, it is a string, and it is a valid status
        if(!newStatus) throw "updateStatus: newStatus must be provided";
        if(typeof newStatus !== "string") throw "updateStatus: newStatus must be a string";
        let validStatus = false;
        for(let i = 0; i < statusStates.length; i++){
            if(newStatus.localeCompare(statusStates[i]) === 0){
                validStatus = true;
                break;
            }
        }
        if(!validStatus) throw "updateStatus: newStatus must be a valid status";

        // </ERROR CHECKING>

        let updatedInfo = await relationshipsCollection.updateOne({"_id": ObjectId(relationshipId)}, {"$set": {"status": newStatus}});
        if(!updatedInfo.acknowledged){
            throw "updateStatus() could not update the status";
        }

        return {updated: true};
    },

    /*
    * Returns the _id of the newly created blank chat channel
    */
    newChannel: async () => {
        let newChat = {
            "messages": []
        }

        const chatsCollection = await chatsCol();
        const insertInfo = await chatsCollection.insertOne(newChat);
        if(!insertInfo.acknowledged || !insertInfo.insertedId){
            throw "newChannel: Could not add a chat channel to the database";
        }

        return insertInfo.insertedId.toString();
    },

    /*
    * Returns the status string of the specified relationship
    * 
    * Parameters:
    *  - relationship       string form of a relationship's _id
    */
    getStatus: async (relationship) => {

        // <ERROR CHECKING>

        // Check that relationship is provided, it is a string, it is a valid ObjectId, and it corresponds to an existing relationship
        if(!relationship) throw "getStatus: relationship must be provided";
        if(typeof relationship !== "string") throw "getStatus: relationship must be a string";
        if(!ObjectId.isValid(relationship)) throw "getStatus: relationship must be a valid ObjectId";
        const relationshipsCollection = await relationshipsCol();
        const messageRelationship = await relationshipsCollection.findOne({ "_id": ObjectId(relationship) });
        if(messageRelationship === null) throw "getStatus: relationship must be an existing relationship";

        // </ERROR CHECKING>

        return messageRelationship["status"];
    }
}
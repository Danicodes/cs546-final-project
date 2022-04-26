// chat.js (data)
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System. Ethan Grzeda

// Constants
const MAX_MESSAGE_LENGTH = 256;
const statusStates = ["PENDING", "ACTIVE", "REJECTED", "COMPLETED"];

// Imports
const { ObjectId } = require('mongodb');
const mongoCollections = require('./../config/mongoCollections');
const mongoConnection = require('./../config/mongoConnection');
const chatsCol = mongoCollections.chats;
const usersCol = mongoCollections.users;
const relationshipsCol = mongoCollections.relationships;

// Exported Functions
module.exports = {
    description: 'These are the functions for the chat feature of MentorMe',

    // This function is finished but untested
    newMessage: async (sender, relationship, message) => {
        // <ERROR CHECKING>

        // Check that sender is provided
        if(!sender) throw "newMessage: sender must be provided";
        // Check that sender is a string
        if(typeof sender !== "string") throw "newMessage: sender must be a string";
        // Check that sender is a valid ObjectId
        if(!ObjectId.isValid(sender)) throw "newMessage: sender must be a valid ObjectId";
        // Check that sender exists in the database
        const usersCollection = await usersCol();
        const senderUser = await usersCollection.findOne({ userId: ObjectId(sender) });
        if(senderUser === null) throw "newMessage: sender must be an existing user";
        // Check that relationship is provided
        if(!relationship) throw "newMessage: relationship must be provided";
        // Check that relationship is a string
        if(typeof relationship !== "string") throw "newMessage: relationship must be a string";
        // Check that relationship is a valid ObjectId
        if(!ObjectId.isValid(relationship)) throw "newMessage: relationship must be a valid ObjectId";
        // Check that relationship can be found in the database
        const relationshipsCollection = await relationshipsCol();
        const messageRelationship = await relationshipsCollection.findOne({ "relationshipId": ObjectId(relationship) });
        if(messageRelationship === null) throw "newMessage: relationship must be an existing relationship";
        // Check that relationship includes the sender
        let found = false;
        if(messageRelationship["mentor"].toString().localeCompare(sender) === 0 || messageRelationship["mentee"].toString().localeCompare(sender) === 0) found = true;
        if(!found) throw "newMessage: relationship must include sender";
        // Check that message is provided
        if(typeof message === "undefined") throw "newMessage: message must be provided";
        // Check that message is a string
        if(typeof message !== "string") throw "newMessage: message must be a string";
        // Check that message isn't empty
        if(message.length === 0) throw "newMessage: message must not be empty";
        // Check that message isn't just spaces
        message = message.trim();
        if(message.length === 0) throw "newMessage: message must not be just spaces";
        // (Maybe) Check that message isn't over a certain length
        if(message.length > MAX_MESSAGE_LENGTH) throw "newMessage: message must not be too long";

        // </ERROR CHECKING>

        // Make the message object
        let createdMessage = {
            "author": sender,
            "message": message,
            "Datetime": new Date()
        };

        const channelId = messageRelationship["chatChannel"];

        // Insert the object into the database and make sure it was inserted correctly
        const chatsCollection = await chatsCol();
        const updatedInfo = await chatsCollection.updateOne({"channelId": channelId}, {"$push": {"messages": createdMessage}});
        if(!updatedInfo.acknowledged){
            throw "newMessage() could not insert the newly created chat message into the database";
        }
        // I brushed up on the return value of updateOne() here:
        // https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/

        return createdMessage;
    },

    // This function is finished but untested
    getChatByChannel: async (channelId) => {
        // <ERROR CHECKING>

        // Check that channelId is provided
        if(!channelId) throw "getChatByChannel: channelId must be provided";
        // Check that channelId is a string
        if(typeof channelId !== "string") throw "getChatByChannel: channelId must be a string";
        // Check that channelId is a valid ObjectId
        if(!ObjectId.isValid(channelId)) throw "getChatByChannel: channelId must be a valid ObjectId";
        // Check that channelId is in the database
        const chatsCollection = await chatsCol();
        const foundChannel = await chatsCollection.findOne({ channelId: ObjectId(channelId) });
        if(foundChannel === null) throw "getChatByChannel: channelId must be the id of an existing channel";

        // </ERROR CHECKING>

        return foundChannel;
    },

    // This function is finished but untested
    updateStatus: async (relationshipId, newStatus) => {
        // <ERROR CHECKING>

        // Check that relationshipId is provided
        if(!relationshipId) throw "updateStatus: relationshipId must be provided";
        // Check that relationshipId is a string
        if(typeof relationshipId !== "string") throw "updateStatus: relationshipId must be a string";
        // Check that relationshipId is a valid ObjectId
        if(!ObjectId.isValid(relationshipId)) throw "updateStatus: relationshipId must be a valid ObjectId";
        // Check that relationshipId is in the database
        const relationshipsCollection = await relationshipsCol();
        let foundRelationship = await relationshipsCollection.findOne({"relationshipId": ObjectId(relationshipId)});
        if(foundRelationship === null) throw "updateStatus: relationshipId must by the id of an existing relationship";
        // Check that newStatus is provided
        if(!newStatus) throw "updateStatus: newStatus must be provided";
        // Check that newStatus is a string
        if(typeof newStatus !== "string") throw "updateStatus: newStatus must be a string";
        // Check that newStatus is a valid status
        let validStatus = false;
        for(let i = 0; i < statusStates.length; i++){
            if(newStatus.localeCompare(statusStates[i]) === 0){
                validStatus = true;
                break;
            }
        }
        if(!validStatus) throw "updateStatus: newStatus must be a valid status";

        // </ERROR CHECKING>

        let updatedInfo = await relationshipsCollection.updateOne({"relationshipId": relationshipId}, {"$set": {"status": newStatus}});
        if(!updatedInfo.acknowledged){
            throw "updateStatus() could not update the status";
        }

        return {updated: true};
    },

    // This function is finished but untested
    newChannel: async () => {
        let channelId = new ObjectId();
        let newChat = {
            "channelId": channelId,
            "messages": []
        }

        const chatsCollection = await chatsCol();
        const insertInfo = await chatsCollection.insertOne(newChat);
        if(!insertInfo.acknowledged || !insertInfo.insertedId){
            throw "newChannel: Could not add a chat channel to the database";
        }

        return channelId;
    }
}
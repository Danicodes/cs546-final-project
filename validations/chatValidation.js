// chatValidation.js
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System.

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

module.exports = {
    description: "These functions validate the inputs for the functions in data/chat.js",

    vNewMessage: async (sender, relationship, message) => {
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

        return 0;
    },

    vGetChatByChannel: async (channelId) => {
        // Check that channelId is provided, it is a string, it is a valid ObjectId, and it is in the database
        if(!channelId) throw "getChatByChannel: channelId must be provided";
        if(typeof channelId !== "string") throw "getChatByChannel: channelId must be a string";
        if(!ObjectId.isValid(channelId)) throw "getChatByChannel: channelId must be a valid ObjectId";
        const chatsCollection = await chatsCol();
        const foundChannel = await chatsCollection.findOne({ "_id": ObjectId(channelId) });
        if(foundChannel === null) throw "getChatByChannel: channelId must be the id of an existing channel";

        return 0;
    },

    vGetChatWithTimestamp: async (channelId, timestamp) => {
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

        return 0;
    },

    vUpdateStatus: async (relationshipId, newStatus) => {
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

        return 0;
    },

    // There is no validation function for newChannel() since it has no parameters

    vGetStatus: async (relationship) => {
        // Check that relationship is provided, it is a string, it is a valid ObjectId, and it corresponds to an existing relationship
        if(!relationship) throw "getStatus: relationship must be provided";
        if(typeof relationship !== "string") throw "getStatus: relationship must be a string";
        if(!ObjectId.isValid(relationship)) throw "getStatus: relationship must be a valid ObjectId";
        const relationshipsCollection = await relationshipsCol();
        const messageRelationship = await relationshipsCollection.findOne({ "_id": ObjectId(relationship) });
        if(messageRelationship === null) throw "getStatus: relationship must be an existing relationship";

        return 0;
    }
}
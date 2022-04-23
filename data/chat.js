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
        const senderUser = usersCollection.findOne({ userId: ObjectId(sender) });
        if(senderUser === null) throw "newMessage: sender must be an existing user";
        // Check that relationship is provided
        if(!relationship) throw "newMessage: relationship must be provided";
        // Check that relationship is a string
        if(typeof relationship !== "string") throw "newMessage: relationship must be a string";
        // Check that relationship is a valid ObjectId
        if(!ObjectId.isValid(relationship)) throw "newMessage: relationship must be a valid ObjectId";
        // Check that relationship can be found in the database
        const relationshipsCollection = await relationshipsCol();
        const messageRelationship = relationshipsCollection.findOne({ relationshipId: ObjectId(relationship) });
        if(messageRelationship === null) throw "newMessage: relationship must be an existing relationship";
        // Check that relationship includes the sender
        let found = false;
        if(messageRelationship[mentor] === sender || messageRelationship[mentee] === sender){
            found = true;
        }
        if(!found) throw "newMessage: relationship must include sender";
        // Check that message is provided
        if(!message) throw "newMessage: message must be provided";
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

        // Insert the object into the database

        // Make sure the object was inserted into the database correctly

        console.log("newMessage: not implemented yet");
        return 0;
    },

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
        const chatChannel = chatsCollection.findOne({ channelId: ObjectId(channelId) });
        if(chatChannel === null) throw "getChatByChannel: channelId must be the id of an existing channel";

        // </ERROR CHECKING>

        // Return the chat channel from the database

        console.log("getChat: not implemented yet");
        return 0;
    },

    updateStatus: async (relationshipId, newStatus) => {
        // <ERROR CHECKING>

        // Check that relationshipId is provided
        if(!relationshipId) throw "updateStatus: relationshipId must be provided";
        // Check that relationshipId is a string
        if(typeof relationshipId !== "string") throw "updateStatus: relationshipId must be a string";
        // Check that relationshipId is a valid ObjectId
        if(!ObjectId.isValid(relationshipId)) throw "updateStatus: relationshipId must be a valid ObjectId";
        // Check that relationshipId is in the database
        // Check that newStatus is provided
        if(!newStatus) throw "updateStatus: newStatus must be provided";
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


        console.log("updateStatus: not implemented yet");
        return 0;
    },

    newChannel: async () => {
        console.log("newChannel: not implemented yet");
        return 0;
    }
}
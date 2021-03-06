// clearDatabase.js
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System.

/*
How to use this file

Execute the following command in the command line: node clearDatabase.js

This will clear all the users, relationships, chats, and posts from the database.
*/


/*
Functions
 - clearUsers
 - clearRelationships (also clears chats)
 - clearPosts
 - clearAll (runs other clear functions)
*/


// Imports
const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require("mongodb");
const usersCol = mongoCollections.users;
const relationshipsCol = mongoCollections.relationships;
const chatsCol = mongoCollections.chats;
const postsCol = mongoCollections.posts;



// Clears users from database
async function clearUsers(){
    const usersCollection = await usersCol();
    let usersList = [];
    try{
        usersList = await usersCollection.find({}).toArray();
    } catch (e) {
        console.log("clearUsers couldn't get the users from the database.");
    }
    for(let i = 0; i < usersList.length; i++){
        const userInfo = await usersCollection.deleteOne({ "_id": usersList[i]["_id"] });
        if(userInfo.deletedCount === 0){
            console.log("clearUsers: Could not delete a user.");
        }
    }
}

// Clears relationships and chats from database
async function clearRelationships(){
    // Clear relationships from database
    let relationshipsArray = [];
    const relationshipsCollection = await relationshipsCol();
    try{
        relationshipsArray = await relationshipsCollection.find({}).toArray();
    } catch (e) {
        console.log("clearRelationships couldn't get the relationships from the database.");
    }
    for(let i = 0; i < relationshipsArray.length; i++){
        let deletionInfo = await relationshipsCollection.deleteOne({"_id": relationshipsArray[i]["_id"]});
        if(deletionInfo.deletedCount === 0){
            console.log("clearRelationships() couldn't delete a relationship.");
        }
    }

    // Clear chats from database
    const chatsCollection = await chatsCol();
    let chatsList = [];
    try{
        chatsList = await chatsCollection.find({}).toArray();
    } catch (e) {
        console.log("clearChats couldn't get the chats from the database.");
    }
    for(let i = 0; i < chatsList.length; i++){
        const chatInfo = await chatsCollection.deleteOne({ "_id": chatsList[i]["_id"] });
        if(chatInfo.deletedCount === 0){
            console.log("clearChats: Could not delete a chat.");
        }
    }
}

// Clears posts from database
async function clearPosts(){
    const postsCollection = await postsCol();
    let postsList = [];
    try{
        postsList = await postsCollection.find({}).toArray();
    } catch (e) {
        console.log("clearPosts couldn't get the posts from the database.");
    }
    for(let i = 0; i < postsList.length; i++){
        const postInfo = await postsCollection.deleteOne({"_id": postsList[i]["_id"]});
        if(postInfo.deletedCount === 0){
            console.log("clearPosts: Could not delete a post.");
        }
    }
}

// Clears all data from database
async function clearAll(){
    try{
        console.log("Clearing users...");
        await clearUsers();
        console.log("Done clearing users.");
    } catch (e) {
        console.log("Something went wrong with clearing users. Error below:");
        console.log(e);
    }
    try{
        console.log("Clearing relationships...");
        await clearRelationships();
        console.log("Done clearing relationships.");
    } catch (e) {
        console.log("Something went wrong with clearing relationships. Error below:");
        console.log(e);
    }
    try{
        console.log("Clearing posts...");
        await clearPosts();
        console.log("Done clearing posts.");
    } catch (e) {
        console.log("Something went wrong with clearing posts. Error below:");
        console.log(e);
    }
}

async function main(){
    try{
        console.log("Clearing data...");
        await clearAll();
        console.log("Done clearing data.");
    } catch (e) {
        console.log("Something went wrong with clearing data. Error below:");
        console.log(e);
    }
}

main();

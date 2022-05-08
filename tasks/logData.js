// logData.js
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System.

/*
Functions:
 - logUsers
 - logRelationships
 - logChats
 - logPosts
 - logData (runs other log functions)
*/

// Imports
const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require("mongodb");
const usersCol = mongoCollections.users;
const relationshipsCol = mongoCollections.relationships;
const chatsCol = mongoCollections.chats;
const postsCol = mongoCollections.posts;



// Logs users in database
async function logUsers(){
    const usersCollection = await usersCol();
    const databaseUsers = await usersCollection.find({}).toArray();
    console.log(databaseUsers);
}

// Logs relationships in database
async function logRelationships(){
    const relationshipsCollection = await relationshipsCol();
    const databaseRelationships = await relationshipsCollection.find({}).toArray();
    console.log(databaseRelationships);
}

// Logs chats in database
async function logChats(){
    const chatsCollection = await chatsCol();
    const databaseChats = await chatsCollection.find({}).toArray();
    console.log(databaseChats);
}

// Logs posts in database
async function logPosts(){
    const postsCollection = await postsCol();
    const databasePosts = await postsCollection.find({}).toArray();
    console.log(databasePosts);
}

// Logs all data in the database
async function logData(){
    /*
    try{
        console.log("Users in database:");
        await logUsers();
        console.log("End of users.");
    } catch (e) {
        console.log("Something went wrong with logging the users. Error below:");
        console.log(e);
    }
    */
    /*
    try{
        console.log("Relationships in database:");
        await logRelationships();
        console.log("End of relationships.");
    } catch (e) {
        console.log("Something went wrong with logging the relationships. Error below:");
        console.log(e);
    }
    */
    /*
    try{
        console.log("Chats in database:");
        await logChats();
        console.log("End of chats.");
    } catch (e) {
        console.log("Something went wrong with logging the chats. Error below:");
        console.log(e);
    }
    */
    
    try{
        console.log("Posts in database:");
        await logPosts();
        console.log("End of posts.");
    } catch (e) {
        console.log("Something went wrong with logging the posts. Error below:");
        console.log(e);
    }
    
}

async function main(){
    try{
        await logData();
    } catch (e) {
        console.log(e);
    }
}

main();

// chatTest.js
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System. Ethan Grzeda

// Imports

const chatData = require("./../data/chat");

const { ObjectId } = require('mongodb');
const mongoCollections = require('./../config/mongoCollections');
const mongoConnection = require('./../config/mongoConnection');

const usersCol = mongoCollections.users;
const relationshipsCol = mongoCollections.relationships;
const chatsCol = mongoCollections.chats;


// Seeds users database
async function seedUsers(){

    console.log("seedUsers() starting");

    let user1 = {
        "userId": new ObjectId(),
        "name": "Sai Harish Kumar Vitta",
        "userName": "svitta",
        "password": "xxxxxxxxxx",
        "bio": "Master's Student of Stevens Institute actively learning Web Development",
        "age": 25,
        "searchTags": ["Computer Science", "Web Development", "Software Tools", "Badminton"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": []
    };
    let user2 = {
        "userId": new ObjectId(),
        "name": "Danielle Williams",
        "userName": "dwillia8",
        "password": "xxxxxxxxxx",
        "bio": "Master's Student of Stevens Institute actively learning Database Design",
        "age": 25,
        "searchTags": ["Computer Science", "Database", "Software Tools", "Jamaican", "lgbt+"],
        "mentorRelationships": [],
        "menteeRelationships": [],
        "myPosts": []
    };
    let user3 = {
        "userId": new ObjectId(),
        "name": "Ethan Grzeda",
        "userName": "egrzeda",
        "password": "xxxxxxxxxxxxxxxxxxxxxxx",
        "bio": "Undergraduate Student of Stevens Institute actively learning about jaguars",
        "age": 22,
        "searchTags": ["Computer Science", "Jaguar Science", "Web Design"],
        "mentorRelationships": [],
        "menteeRelationships": [],
        "myPosts": []
    };
    let user4 = {
        "userId": new ObjectId(),
        "name": "Brendan Murray",
        "userName": "BMurray",
        "password": "xxxxxxxxx",
        "bio": "Undergraduate Student of Stevens Institute of Technology",
        "age": 22,
        "searchTags": ["Web Programming", "Cybersecurity"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": []
    };
    let user5 = {
        "userId": new ObjectId(),
        "name": "Yash Kosambia",
        "userName": "YKosambia",
        "password": "xxxxxxxxxx",
        "bio": "Student",
        "age": 25,
        "searchTags": ["Web Programming"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": []
    };

    const usersCollection = await usersCol();
    let returnArray = [];

    const insertInfo1 = await usersCollection.insertOne(user1);
    if(!insertInfo1.acknowledged || !insertInfo.insertedId){
        throw "Could not insert user 1";
    }
    returnArray.push(insertInfo1.insertedId.toString());

    const insertInfo2 = await usersCollection.insertOne(user2);
    if(!insertInfo2.acknowledged || !insertInfo.insertedId){
        throw "Could not insert user 2";
    }
    returnArray.push(insertInfo2.insertedId.toString());

    const insertInfo3 = await usersCollection.insertOne(user3);
    if(!insertInfo3.acknowledged || !insertInfo.insertedId){
        throw "Could not insert user 3";
    }
    returnArray.push(insertInfo3.insertedId.toString());

    const insertInfo4 = await usersCollection.insertOne(user4);
    if(!insertInfo4.acknowledged || !insertInfo.insertedId){
        throw "Could not insert user 4";
    }
    returnArray.push(insertInfo4.insertedId.toString());

    const insertInfo5 = await usersCollection.insertOne(user5);
    if(!insertInfo5.acknowledged || !insertInfo.insertedId){
        throw "Could not insert user 5";
    }
    returnArray.push(insertInfo5.insertedId.toString());

    return returnArray;
}

// Seeds chats database
async function seedChats(){
    console.log("seedChats() starting");

    const usersCollection = await usersCol();
    let usersArray = [];
    try{
        usersArray = await usersCollection.find({}).toArray();
    } catch (e) {
        throw "seedChats() failed while trying to get the users array";
    }

    // Create the chat objects
    let chat1 = { // 1 -> 2
        "channelId": new ObjectId(),
        "messages": []
    }
    let chat2 = { // 3 -> 4
        "channelId": new ObjectId(),
        "messages": []
    }
    let chat3 = { // 1 -> 5
        "channelId": new ObjectId(),
        "messages": []
    }
    let chat4 = { // 2 -> 3
        "channelId": new ObjectId(),
        "messages": []
    }
    let chat5 = { // 2 -> 5
        "channelId": new ObjectId(),
        "messages": []
    }

    // Put chat messages in chat objects
    let chatObj11 = {
        "author": usersArray[0]["userId"],
        "message": "Chat 1, Message 1, User 1",
        "Datetime": "2022-03-10T11:14:37.337Z"
    };
    let chatObj12 = {
        "author": usersArray[1]["userId"],
        "message": "Chat 1, Message 2, User 2",
        "Datetime": "2022-03-10T11:14:37.537Z"
    };
    let chatObj21 = {
        "author": usersArray[2]["userId"],
        "message": "Chat 2, Message 1, User 3",
        "Datetime": "2022-03-10T11:14:37.337Z"
    };
    let chatObj22 = {
        "author": usersArray[2]["userId"],
        "message": "Chat 2, Message 2, User 3",
        "Datetime": "2022-03-10T11:15:37.337Z"
    };
    let chatObj23 = {
        "author": usersArray[2]["userId"],
        "message": "Chat 2, Message 3, User 3",
        "Datetime": "2022-03-10T11:17:37.337Z"
    };
    let chatObj31 = {
        "author": usersArray[4]["userId"],
        "message": "Chat 3, Message 1, User 5",
        "Datetime": "2022-03-10T11:14:37.347Z"
    };
    let chatObj32 = {
        "author": usersArray[4]["userId"],
        "message": "Chat 3, Message 2, User 5",
        "Datetime": "2022-03-10T11:14:47.347Z"
    };
    let chatObj41 = {
        "author": usersArray[1]["userId"],
        "message": "Chat 4, Message 1, User 2",
        "Datetime": "2022-03-10T11:14:47.347Z"
    };
    let chatObj42 = {
        "author": usersArray[1]["userId"],
        "message": "Chat 4, Message 2, User 2",
        "Datetime": "2022-03-10T11:15:47.347Z"
    };
    let chatObj43 = {
        "author": usersArray[2]["userId"],
        "message": "Chat 4, Message 3, User 3",
        "Datetime": "2022-03-10T11:16:47.347Z"
    };
    let chatObj44 = {
        "author": usersArray[2]["userId"],
        "message": "Chat 4, Message 4, User 3",
        "Datetime": "2022-03-10T11:17:47.347Z"
    };
    let chatObj45 = {
        "author": usersArray[1]["userId"],
        "message": "Chat 4, Message 5, User 2",
        "Datetime": "2022-03-10T11:18:47.347Z"
    };

    chat1["messages"].push(chatObj11);
    chat1["messages"].push(chatObj12);
    chat2["messages"].push(chatObj21);
    chat2["message"].push(chatObj22);
    chat2["message"].push(chatObj23);
    chat3["message"].push(chatObj31);
    chat3["message"].push(chatObj32);
    chat4["message"].push(chatObj41);
    chat4["message"].push(chatObj42);
    chat4["message"].push(chatObj43);
    chat4["message"].push(chatObj44);
    chat4["message"].push(chatObj45);

    // Put data in the database
    let returnArray = [];
    const chatsCollection = await chatsCol();

    const insertInfo1 = await chatsCollection.insertOne(chat1);
    if(!insertInfo1.acknowledged || !insertInfo.insertedId){
        throw "Could not insert chat 1";
    }
    returnArray.push(insertInfo1.insertedId.toString());

    const insertInfo2 = await chatsCollection.insertOne(chat2);
    if(!insertInfo2.acknowledged || !insertInfo.insertedId){
        throw "Could not insert chat 2";
    }
    returnArray.push(insertInfo2.insertedId.toString());

    const insertInfo3 = await chatsCollection.insertOne(chat3);
    if(!insertInfo3.acknowledged || !insertInfo.insertedId){
        throw "Could not insert chat 3";
    }
    returnArray.push(insertInfo3.insertedId.toString());

    const insertInfo4 = await chatsCollection.insertOne(chat4);
    if(!insertInfo4.acknowledged || !insertInfo.insertedId){
        throw "Could not insert chat 4";
    }
    returnArray.push(insertInfo4.insertedId.toString());

    const insertInfo5 = await chatsCollection.insertOne(chat5);
    if(!insertInfo5.acknowledged || !insertInfo.insertedId){
        throw "Could not insert chat 5";
    }
    returnArray.push(insertInfo5.insertedId.toString());

    return returnArray;
}

// Seeds relationships database
async function seedRelationships(){
    console.log("seedRelationships() starting");

    const usersCollection = await usersCol();
    let usersArray = [];
    try{
        usersArray = await usersCollection.find({}).toArray();
    } catch (e) {
        throw "seedRelationships() failed while trying to get the users array";
    }

    const chatsCollection = await usersCol();
    let chatsArray = [];
    try{
        chatsArray = await chatsCollection.find({}).toArray();
    } catch (e) {
        throw "seedRelationships() failed while trying to get the chats array";
    }

    // Create relationship objects
    let relationship1 = {
        "relationshipId": new ObjectId(),
        "relationshipDescription": "Relationship 1",
        "mentor": usersCol[0]["userId"],
        "mentee": usersCol[1]["userID"],
        "workspace": new ObjectId(),
        "status": "ACTIVE",
        "createdOn": "2022-04-03T21:14:37.337Z",
        "updatedOn": "2022-04-03T21:14:37.337Z",
        "chatChannel": chatsArray[1]["channelId"]
    }
    let relationship2 = {
        "relationshipId": new ObjectId(),
        "relationshipDescription": "Relationship 2",
        "mentor": usersCol[2]["userId"],
        "mentee": usersCol[3]["userID"],
        "workspace": new ObjectId(),
        "status": "ACTIVE",
        "createdOn": "2022-04-03T21:14:37.337Z",
        "updatedOn": "2022-04-03T21:14:37.337Z",
        "chatChannel": chatsArray[2]["channelId"]
    }
    let relationship3 = {
        "relationshipId": new ObjectId(),
        "relationshipDescription": "Relationship 3",
        "mentor": usersCol[0]["userId"],
        "mentee": usersCol[4]["userID"],
        "workspace": new ObjectId(),
        "status": "ACTIVE",
        "createdOn": "2022-04-03T21:14:37.337Z",
        "updatedOn": "2022-04-03T21:14:37.337Z",
        "chatChannel": chatsArray[3]["channelId"]
    }
    let relationship4 = {
        "relationshipId": new ObjectId(),
        "relationshipDescription": "Relationship 4",
        "mentor": usersCol[1]["userId"],
        "mentee": usersCol[2]["userID"],
        "workspace": new ObjectId(),
        "status": "ACTIVE",
        "createdOn": "2022-04-03T21:14:37.337Z",
        "updatedOn": "2022-04-03T21:14:37.337Z",
        "chatChannel": chatsArray[4]["channelId"]
    }
    let relationship5 = {
        "relationshipId": new ObjectId(),
        "relationshipDescription": "Relationship 5",
        "mentor": usersCol[1]["userId"],
        "mentee": usersCol[4]["userID"],
        "workspace": new ObjectId(),
        "status": "ACTIVE",
        "createdOn": "2022-04-03T21:14:37.337Z",
        "updatedOn": "2022-04-03T21:14:37.337Z",
        "chatChannel": chatsArray[5]["channelId"]
    }

    // Put data into database
    let returnArray = [];
    let relationshipsCollection = await relationshipsCol();

    const insertInfo1 = await relationshipsCollection.insertOne(relationship1);
    if(!insertInfo1.acknowledged || !insertInfo.insertedId){
        throw "Could not insert relationship 1";
    }
    returnArray.push(insertInfo1.insertedId.toString());

    const insertInfo2 = await relationshipsCollection.insertOne(relationship2);
    if(!insertInfo2.acknowledged || !insertInfo.insertedId){
        throw "Could not insert relationship 2";
    }
    returnArray.push(insertInfo2.insertedId.toString());

    const insertInfo3 = await relationshipsCollection.insertOne(relationship3);
    if(!insertInfo3.acknowledged || !insertInfo.insertedId){
        throw "Could not insert relationship 3";
    }
    returnArray.push(insertInfo3.insertedId.toString());

    const insertInfo4 = await relationshipsCollection.insertOne(relationship4);
    if(!insertInfo4.acknowledged || !insertInfo.insertedId){
        throw "Could not insert relationship 4";
    }
    returnArray.push(insertInfo4.insertedId.toString());

    const insertInfo5 = await relationshipsCollection.insertOne(relationship5);
    if(!insertInfo5.acknowledged || !insertInfo.insertedId){
        throw "Could not insert relationship 5";
    }
    returnArray.push(insertInfo5.insertedId.toString());

    return returnArray;
}

// Clears relationships database
async function clearRelationships(){
    let relationshipsArray = [];
    const relationshipsCollection = await relationshipsCol();
    try{
        relationshipsArray = await relationshipsCollection.find({}).toArray();
    } catch (e) {
        console.log("clearRelationships() failed while trying to get relationships from the database. Error below:");
        console.log(e);
    }

    for(let i = 0; i < relationshipsArray.length; i++){
        let deletionInfo = await relationshipsCollection.deleteOne({relationshipId: relationshipsArray[i]});
        if(deletionInfo.deletedCount === 0){
            console.log("clearRelationships() couldn't delete a relationship");
        }
    }
}

// Clears chats database
async function clearChats(){
    // Implement
}

// Clears users database
async function clearUsers(){
    const usersCollection = await usersCol();
    
    let usersList = [];
    try{
        usersList = await usersCollection.find({}).toArray();
    } catch (e) {
        throw e;
    }

    for(let i = 0; i < usersList.length; i++){
        const userInfo = await usersCollection.deleteOne({ userId: usersList[i]["userId"] });
        if(userInfo.deletedCound === 0){
            throw "clearUsers: Could not delete a user";
        }
    }
}

// Test cases for newMessage()
async function testNewMessage(){
    // Implement
}

// Test cases for getChatByChannel()
async function testGetChatByChannel(){
    // Implement
}

// Test cases for updateStatus()
async function testUpdateStatus(){
    // Implement
}

// Test cases for newChannel()
async function testNewChannel(){
    // Implement
}


async function main(){
    console.log("Starting");

    // Seed data into database
    try{
        await seedUsers();
    } catch (e) {
        console.log("seedUsers failed. Result below:");
        console.log(e);
    }
    console.log("seedUsers() finished");
    try{
        await seedRelationships();
    } catch (e) {
        console.log("seedRelationships failed. Result below:");
        console.log(e);
    }
    console.log("seedRelationships() finished");
    try{
        await seedChats();
    } catch (e) {
        console.log("seedChats failed. Result below:");
        console.log(e);
    }
    console.log("seedChats() finished");

    // Test data functions
    try{
        await testNewMessage();
    } catch (e) {
        console.log("testNewMessage failed. Result below:");
        console.log(e);
    }
    console.log("testNewMessage() finished");
    try{
        await testGetChatByChannel();
    } catch (e) {
        console.log("testGetChatByChannel failed. Result below:");
        console.log(e);
    }
    console.log("testGetChatByChannel() finished");
    try{
        await testUpdateStatus();
    } catch (e) {
        console.log("testUpdateStatus failed. Result below:");
        console.log(e);
    }
    console.log("testUpdateStatus() finished");
    try{
        await testNewChannel();
    } catch (e) {
        console.log("testNewChannel failed. Result below:");
        console.log(e);
    }
    console.log("testNewChannel() finished");

    // Clear data from database
    try{
        await clearUsers();
    } catch (e) {
        console.log("clearUsers failed. Result below:");
        console.log(e);
    }
    console.log("clearUsers() finished");
    try{
        await clearRelationships();
    } catch (e) {
        console.log("clearRelationships failed. Result below:");
        console.log(e);
    }
    console.log("clearRelationships() finished");
    try{
        await clearChats();
    } catch (e) {
        console.log("clearChats failed. Result below:");
        console.log(e);
    }
    console.log("clearChats() finished");
}

main();

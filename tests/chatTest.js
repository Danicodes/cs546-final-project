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

    /*

    let user = {
        "userId": new ObjectId(),
        "name": 
        "userName": 
        "password": 
        "bio": 
        "age": 
        "searchTags": 
        "mentorRelations": 
        "menteeRelations": 
        "myPosts": 
    }

    */

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
    }
    
    console.log("user1 created");

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
    }

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
    }

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
    }

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
    }
    
    console.log("user5 created");

    const usersCollection = await usersCol();
    let returnArray = [];

    console.log("collection created and returnArray initialized");

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

// Seeds relationships database
async function seedRelationships(){
    // Implement
}

// Seeds chats database
async function seedChats(){
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

// Clears relationships database
async function clearRelationships(){
    // Implement
}

// Clears chats database
async function clearChats(){
    // Implement
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

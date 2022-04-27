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

let usersArray = [];
let relationshipsArray = [];
let chatsArray = [];


/*

Seeded Relationships:
1: 1 mentoring 2, both users chat
2: 3 mentoring 4, only user 3 chats
3: 1 mentoring 5, only user 5 chats
4: 2 mentoring 3, both users chat
5: 2 mentoring 5, empty chat

*/

// Seeds users database
async function seedUsers(){

    let uid1 = new ObjectId();
    let user1 = {
        "userId": uid1,
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
    let uid2 = new ObjectId();
    let user2 = {
        "userId": uid2,
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
    let uid3 = new ObjectId();
    let user3 = {
        "userId": uid3,
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
    let uid4 = new ObjectId();
    let user4 = {
        "userId": uid4,
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
    let uid5 = new ObjectId();
    let user5 = {
        "userId": uid5,
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
    if(!insertInfo1.acknowledged || !insertInfo1.insertedId){
        throw "Could not insert user 1";
    }
    returnArray.push(uid1.toString());

    const insertInfo2 = await usersCollection.insertOne(user2);
    if(!insertInfo2.acknowledged || !insertInfo2.insertedId){
        throw "Could not insert user 2";
    }
    returnArray.push(uid2.toString());

    const insertInfo3 = await usersCollection.insertOne(user3);
    if(!insertInfo3.acknowledged || !insertInfo3.insertedId){
        throw "Could not insert user 3";
    }
    returnArray.push(uid3.toString());

    const insertInfo4 = await usersCollection.insertOne(user4);
    if(!insertInfo4.acknowledged || !insertInfo4.insertedId){
        throw "Could not insert user 4";
    }
    returnArray.push(uid4.toString());

    const insertInfo5 = await usersCollection.insertOne(user5);
    if(!insertInfo5.acknowledged || !insertInfo5.insertedId){
        throw "Could not insert user 5";
    }
    returnArray.push(uid5.toString());

    return returnArray;
}

// Seeds chats database
async function seedChats(){

    const usersCollection = await usersCol();
    let usersArray = await usersCollection.find({}).toArray();

    // Create the chat objects
    let cid1 = new ObjectId();
    let chat1 = { // 1 -> 2
        "channelId": cid1,
        "messages": []
    }
    let cid2 = new ObjectId();
    let chat2 = { // 3 -> 4
        "channelId": cid2,
        "messages": []
    }
    let cid3 = new ObjectId();
    let chat3 = { // 1 -> 5
        "channelId": cid3,
        "messages": []
    }
    let cid4 = new ObjectId();
    let chat4 = { // 2 -> 3
        "channelId": cid4,
        "messages": []
    }
    let cid5 = new ObjectId();
    let chat5 = { // 2 -> 5
        "channelId": cid5,
        "messages": []
    }

    // Put chat messages in chat objects
    let chatObj11 = {
        "author": usersArray[0]["userId"],
        "message": "Chat 1, Message 1, User 1",
        "Datetime": new Date()
    };
    let chatObj12 = {
        "author": usersArray[1]["userId"],
        "message": "Chat 1, Message 2, User 2",
        "Datetime": new Date()
    };
    let chatObj21 = {
        "author": usersArray[2]["userId"],
        "message": "Chat 2, Message 1, User 3",
        "Datetime": new Date()
    };
    let chatObj22 = {
        "author": usersArray[2]["userId"],
        "message": "Chat 2, Message 2, User 3",
        "Datetime": new Date()
    };
    let chatObj23 = {
        "author": usersArray[2]["userId"],
        "message": "Chat 2, Message 3, User 3",
        "Datetime": new Date()
    };
    let chatObj31 = {
        "author": usersArray[4]["userId"],
        "message": "Chat 3, Message 1, User 5",
        "Datetime": new Date()
    };
    let chatObj32 = {
        "author": usersArray[4]["userId"],
        "message": "Chat 3, Message 2, User 5",
        "Datetime": new Date()
    };
    let chatObj41 = {
        "author": usersArray[1]["userId"],
        "message": "Chat 4, Message 1, User 2",
        "Datetime": new Date()
    };
    let chatObj42 = {
        "author": usersArray[1]["userId"],
        "message": "Chat 4, Message 2, User 2",
        "Datetime": new Date()
    };
    let chatObj43 = {
        "author": usersArray[2]["userId"],
        "message": "Chat 4, Message 3, User 3",
        "Datetime": new Date()
    };
    let chatObj44 = {
        "author": usersArray[2]["userId"],
        "message": "Chat 4, Message 4, User 3",
        "Datetime": new Date()
    };
    let chatObj45 = {
        "author": usersArray[1]["userId"],
        "message": "Chat 4, Message 5, User 2",
        "Datetime": new Date()
    };

    chat1["messages"].push(chatObj11);
    chat1["messages"].push(chatObj12);
    chat2["messages"].push(chatObj21);
    chat2["messages"].push(chatObj22);
    chat2["messages"].push(chatObj23);
    chat3["messages"].push(chatObj31);
    chat3["messages"].push(chatObj32);
    chat4["messages"].push(chatObj41);
    chat4["messages"].push(chatObj42);
    chat4["messages"].push(chatObj43);
    chat4["messages"].push(chatObj44);
    chat4["messages"].push(chatObj45);

    // Put data in the database
    let returnArray = [];
    const chatsCollection = await chatsCol();

    const insertInfo1 = await chatsCollection.insertOne(chat1);
    if(!insertInfo1.acknowledged || !insertInfo1.insertedId){
        throw "Could not insert chat 1";
    }
    returnArray.push(cid1.toString());

    const insertInfo2 = await chatsCollection.insertOne(chat2);
    if(!insertInfo2.acknowledged || !insertInfo2.insertedId){
        throw "Could not insert chat 2";
    }
    returnArray.push(cid2.toString());

    const insertInfo3 = await chatsCollection.insertOne(chat3);
    if(!insertInfo3.acknowledged || !insertInfo3.insertedId){
        throw "Could not insert chat 3";
    }
    returnArray.push(cid3.toString());

    const insertInfo4 = await chatsCollection.insertOne(chat4);
    if(!insertInfo4.acknowledged || !insertInfo4.insertedId){
        throw "Could not insert chat 4";
    }
    returnArray.push(cid4.toString());

    const insertInfo5 = await chatsCollection.insertOne(chat5);
    if(!insertInfo5.acknowledged || !insertInfo5.insertedId){
        throw "Could not insert chat 5";
    }
    returnArray.push(cid5.toString());

    return returnArray;
}

// Seeds relationships database
async function seedRelationships(){

    const usersCollection = await usersCol();
    let usersArray = [];
    try{
        usersArray = await usersCollection.find({}).toArray();
    } catch (e) {
        throw "seedRelationships() failed while trying to get the users array";
    }

    const chatsCollection = await chatsCol();
    let chatsArray = [];
    try{
        chatsArray = await chatsCollection.find({}).toArray();
    } catch (e) {
        throw "seedRelationships() failed while trying to get the chats array";
    }

    // Create relationship objects
    let relId1 = new ObjectId();
    let relationship1 = {
        "relationshipId": relId1,
        "relationshipDescription": "Relationship 1",
        "mentor": usersArray[0]["userId"],
        "mentee": usersArray[1]["userId"],
        "workspace": new ObjectId(),
        "status": "ACTIVE",
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatsArray[0]["channelId"]
    }
    let relId2 = new ObjectId();
    let relationship2 = {
        "relationshipId": relId2,
        "relationshipDescription": "Relationship 2",
        "mentor": usersArray[2]["userId"],
        "mentee": usersArray[3]["userId"],
        "workspace": new ObjectId(),
        "status": "ACTIVE",
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatsArray[1]["channelId"]
    }
    let relId3 = new ObjectId();
    let relationship3 = {
        "relationshipId": relId3,
        "relationshipDescription": "Relationship 3",
        "mentor": usersArray[0]["userId"],
        "mentee": usersArray[4]["userId"],
        "workspace": new ObjectId(),
        "status": "ACTIVE",
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatsArray[2]["channelId"]
    }
    let relId4 = new ObjectId();
    let relationship4 = {
        "relationshipId": relId4,
        "relationshipDescription": "Relationship 4",
        "mentor": usersArray[1]["userId"],
        "mentee": usersArray[2]["userId"],
        "workspace": new ObjectId(),
        "status": "COMPLETED",
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatsArray[3]["channelId"]
    }
    let relId5 = new ObjectId();
    let relationship5 = {
        "relationshipId": relId5,
        "relationshipDescription": "Relationship 5",
        "mentor": usersArray[1]["userId"],
        "mentee": usersArray[4]["userId"],
        "workspace": new ObjectId(),
        "status": "PENDING",
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatsArray[4]["channelId"]
    }

    // Put data into database
    let returnArray = [];
    let relationshipsCollection = await relationshipsCol();

    const insertInfo1 = await relationshipsCollection.insertOne(relationship1);
    if(!insertInfo1.acknowledged || !insertInfo1.insertedId){
        throw "Could not insert relationship 1";
    }
    returnArray.push(relId1.toString());

    const insertInfo2 = await relationshipsCollection.insertOne(relationship2);
    if(!insertInfo2.acknowledged || !insertInfo2.insertedId){
        throw "Could not insert relationship 2";
    }
    returnArray.push(relId2.toString());

    const insertInfo3 = await relationshipsCollection.insertOne(relationship3);
    if(!insertInfo3.acknowledged || !insertInfo3.insertedId){
        throw "Could not insert relationship 3";
    }
    returnArray.push(relId3.toString());

    const insertInfo4 = await relationshipsCollection.insertOne(relationship4);
    if(!insertInfo4.acknowledged || !insertInfo4.insertedId){
        throw "Could not insert relationship 4";
    }
    returnArray.push(relId4.toString());

    const insertInfo5 = await relationshipsCollection.insertOne(relationship5);
    if(!insertInfo5.acknowledged || !insertInfo5.insertedId){
        throw "Could not insert relationship 5";
    }
    returnArray.push(relId5.toString());

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
        let deletionInfo = await relationshipsCollection.deleteOne({relationshipId: relationshipsArray[i]["relationshipId"]});
        if(deletionInfo.deletedCount === 0){
            console.log("clearRelationships() couldn't delete a relationship");
        }
    }
}

// Clears chats database
async function clearChats(){
    const chatsCollection = await chatsCol();
    
    let chatsList = [];
    try{
        chatsList = await chatsCollection.find({}).toArray();
    } catch (e) {
        console.log("clearChats couldn't get the chats from the database");
    }

    for(let i = 0; i < chatsList.length; i++){
        const chatInfo = await chatsCollection.deleteOne({ channelId: chatsList[i]["channelId"] });
        if(chatInfo.deletedCount === 0){
            console.log("clearChats: Could not delete a chat");
        }
    }
}

// Clears users database
async function clearUsers(){
    const usersCollection = await usersCol();
    
    let usersList = [];
    try{
        usersList = await usersCollection.find({}).toArray();
    } catch (e) {
        console.log("clearUsers couldn't get the users from the database");
    }

    for(let i = 0; i < usersList.length; i++){
        const userInfo = await usersCollection.deleteOne({ userId: usersList[i]["userId"] });
        if(userInfo.deletedCount === 0){
            console.log("clearUsers: Could not delete a user");
        }
    }
}

// Test cases for newMessage(sender, relationship, message)
async function testNewMessage(){
    console.log("--- Test Cases for newMessage(sender, relationship, message) ---");
    
    // base case 1
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[0], relationshipsArray[0], "Base Case 1 Message");
        console.log("GOOD: newMessage passed base case 1. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("BAD: newMessage failed base case 1. Error below:");
        console.log(e);
    }
    // base case 2
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[2], relationshipsArray[3], "Base Case 2 Message");
        console.log("GOOD: newMessage passed base case 2. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("BAD: newMessage failed base case 2. Error below:");
        console.log(e);
    }
    // base case 3
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[3], relationshipsArray[1], "Base Case 3 Message");
        console.log("GOOD: newMessage passed base case 3. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("BAD: newMessage failed base case 3. Error below:");
        console.log(e);
    }
    // no-sender case
    console.log("");
    try{
        let retVal = await chatData.newMessage();
        console.log("BAD: newMessage passed the no-sender case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the no-sender case. Error below:");
        console.log(e);
    }
    // no-relationship case
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[4]);
        console.log("BAD: newMessage passed the no-relationship case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the no-relationship case. Error below:");
        console.log(e);
    }
    // no-message case
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[4], relationshipsArray[4]);
        console.log("BAD: newMessage passed the no-message case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the no-message case. Error below:");
        console.log(e);
    }
    // wrong-type sender case
    console.log("");
    try{
        let retVal = await chatData.newMessage(546, relationshipsArray[0], "Message");
        console.log("BAD: newMessage passed the wrong-type sender case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the wrong-type sender case. Error below:");
        console.log(e);
    }
    // invalid ObjectId sender case
    console.log("");
    try{
        let retVal = await chatData.newMessage("546", relationshipsArray[0], "Message");
        console.log("BAD: newMessage passed the invalid ObjectId sender case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the invalid ObjectId sender case. Error below:");
        console.log(e);
    }
    // nonexistent sender case
    console.log("");
    try{
        let retVal = await chatData.newMessage("76212599bf98e8017007a075", relationshipsArray[0], "Message");
        console.log("BAD: newMessage passed the nonexistent sender case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the nonexistent sender case. Error below:");
        console.log(e);
    }
    // wrong-type relationship case
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[0], 500, "Message");
        console.log("BAD: newMessage passed the wrong-type relationship case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the wrong-type relationship case. Error below:");
        console.log(e);
    }
    // invalid ObjectId relationship case
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[0], "asdfasdf", "Message");
        console.log("BAD: newMessage passed the invalid ObjectId relationship case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the invalid ObjectId relationship case. Error below:");
        console.log(e);
    }
    // nonexistent relationship case
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[0], "76212599bf98e8017007a075", "Message");
        console.log("BAD: newMessage passed the nonexistent relationship case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the nonexistent relationship case. Error below:");
        console.log(e);
    }
    // wrong-type message case
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[0], relationshipsArray[0], 46);
        console.log("BAD: newMessage passed the wrong-type message case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the wrong-type message case. Error below:");
        console.log(e);
    }
    // empty-string message case
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[0], relationshipsArray[0], "");
        console.log("BAD: newMessage passed the empty-string message case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the empty-string message case. Error below:");
        console.log(e);
    }
    // just-spaces message case
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[0], relationshipsArray[0], "      ");
        console.log("BAD: newMessage passed the just-spaces message case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the just-spaces message case. Error below:");
        console.log(e);
    }
    // non-aligning sender and relationship case
    console.log("");
    try{
        let retVal = await chatData.newMessage(usersArray[0], relationshipsArray[1], "Message");
        console.log("BAD: newMessage passed the non-aligning sender and relationship case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: newMessage failed the non-aligning sender and relationship case. Error below:");
        console.log(e);
    }
}

// Test cases for getChatByChannel(channelId)
async function testGetChatByChannel(){
    console.log("--- Test Cases for getChatByChannel(channelId) ---");

    // base case 1
    console.log("");
    try{
        let retVal = await chatData.getChatByChannel(chatsArray[0]);
        console.log("GOOD: getChatByChannel() passed base case 1. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("BAD: getChatByChannel() failed base case 1. Error below:");
        console.log(e);
    }
    // base case 2
    console.log("");
    try{
        let retVal = await chatData.getChatByChannel(chatsArray[2]);
        console.log("GOOD: getChatByChannel() passed base case 2. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("BAD: getChatByChannel() failed base case 2. Error below:");
        console.log(e);
    }
    // base case 3
    console.log("");
    try{
        let retVal = await chatData.getChatByChannel(chatsArray[4]);
        console.log("GOOD: getChatByChannel() passed base case 3. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("BAD: getChatByChannel() failed base case 3. Error below:");
        console.log(e);
    }
    // no-channelId case
    console.log("");
    try{
        let retVal = await chatData.getChatByChannel();
        console.log("BAD: getChatByChannel() passed the no-channelId case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: getChatByChannel() failed the no-channelId case. Error below:");
        console.log(e);
    }
    // wrong-type channelId case
    console.log("");
    try{
        let retVal = await chatData.getChatByChannel(2);
        console.log("BAD: getChatByChannel() passed the wrong-type channelId case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: getChatByChannel() failed the wrong-type channelId case. Error below:");
        console.log(e);
    }
    // invalid ObjectId channelId case
    console.log("");
    try{
        let retVal = await chatData.getChatByChannel("dumb string");
        console.log("BAD: getChatByChannel() passed the invalid ObjectId channelId case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: getChatByChannel() failed the invalid ObjectId channelId case. Error below:");
        console.log(e);
    }
    // nonexistent channel case
    console.log("");
    try{
        let retVal = await chatData.getChatByChannel(usersArray[1]);
        console.log("BAD: getChatByChannel() passed the nonexistent channel case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: getChatByChannel() failed the nonexistent channel case. Error below:");
        console.log(e);
    }
}

// Test cases for updateStatus(relationshipId, newStatus)
async function testUpdateStatus(){
    console.log("--- Test Cases for updateStatus(relationshipId, newStatus) ---");

    // base case 1
    console.log("");
    try{
        let retVal = await chatData.updateStatus(relationshipsArray[0], "COMPLETED");
        console.log("GOOD: updateStatus() passed base case 1. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("BAD: updateStatus() failed base case 1. Error below:");
        console.log(e);
    }
    // base case 2
    console.log("");
    try{
        let retVal = await chatData.updateStatus(relationshipsArray[4], "ACTIVE");
        console.log("GOOD: updateStatus() passed base case 2. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("BAD: updateStatus() failed base case 2. Error below:");
        console.log(e);
    }
    // base case 3
    console.log("");
    try{
        let retVal = await chatData.updateStatus(relationshipsArray[1], "REJECTED");
        console.log("GOOD: updateStatus() passed base case 3. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("BAD: updateStatus() failed base case 3. Error below:");
        console.log(e);
    }
    // no-relationshipId case
    console.log("");
    try{
        let retVal = await chatData.updateStatus();
        console.log("BAD: updateStatus() passed the no-relationshipId case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: updateStatus() failed the no-relationshipId case. Error below:");
        console.log(e);
    }
    // no-newStatus case
    console.log("");
    try{
        let retVal = await chatData.updateStatus(relationshipsArray[0]);
        console.log("BAD: updateStatus() passed the no-newStatus case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: updateStatus() failed the no-newStatus case. Error below:");
        console.log(e);
    }
    // wrong-type relationshipId case
    console.log("");
    try{
        let retVal = await chatData.updateStatus(600, "ACTIVE");
        console.log("BAD: updateStatus() passed the wrong-type relationshipId case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: updateStatus() failed the wrong-type relationshipId case. Error below:");
        console.log(e);
    }
    // invalid ObjectId relationshipId case
    console.log("");
    try{
        let retVal = await chatData.updateStatus("dumb string", "ACTIVE");
        console.log("BAD: updateStatus() passed the invalid ObjectId relationshipId case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: updateStatus() failed the invalid ObjectId relationshipId case. Error below:");
        console.log(e);
    }
    // nonexistent relationship case
    console.log("");
    try{
        let retVal = await chatData.updateStatus(usersArray[0], "ACTIVE");
        console.log("BAD: updateStatus() passed the nonexistent relationship case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: updateStatus() failed the nonexistent relationship case. Error below:");
        console.log(e);
    }
    // wrong-type newStatus case
    console.log("");
    try{
        let retVal = await chatData.updateStatus(relationshipsArray[0], 22);
        console.log("BAD: updateStatus() passed the wrong-type newStatus case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: updateStatus() failed the wrong-type newStatus case. Error below:");
        console.log(e);
    }
    // invalid status newStatus case
    console.log("");
    try{
        let retVal = await chatData.updateStatus(relationshipsArray[0], "bad status");
        console.log("BAD: updateStatus() passed the invalid status newStatus case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("GOOD: updateStatus() failed the invalid status newStatus case. Error below:");
        console.log(e);
    }

    // Implement
}

// Test cases for newChannel()
async function testNewChannel(){
    console.log("--- Test Cases for newChannel() ---");

    // base case
    try{
        let retVal = await chatData.newChannel();
        console.log("GOOD: newChannel() passed the base case. Return value below:");
        console.log(retVal);
    } catch (e) {
        console.log("BAD: newChannel() failed the base case. Error below:");
        console.log(e);
    }
}

async function printSeededData(){
    const relationshipsCollection = await relationshipsCol();
    let seededRelationships = await relationshipsCollection.find({}).toArray();
    console.log("Relationships in Database:");
    console.log(seededRelationships);

    const usersCollection = await usersCol();
    let seededUsers = await usersCollection.find({}).toArray();
    console.log("Users in Database:");
    console.log(seededUsers);

    const chatsCollection = await chatsCol();
    let seededChats = await chatsCollection.find({}).toArray();
    console.log("Chats in Database");
    console.log(seededChats);
}


async function main(){

    // Seed data into database
    try{
        usersArray = await seedUsers();
    } catch (e) {
        console.log("seedUsers failed. Result below:");
        console.log(e);
    }
    try{
        chatsArray = await seedChats();
    } catch (e) {
        console.log("seedChats failed. Result below:");
        console.log(e);
    }
    try{
        relationshipsArray = await seedRelationships();
    } catch (e) {
        console.log("seedRelationships failed. Result below:");
        console.log(e);
    }
    
    //await printSeededData();

    // Test data functions
    try{
        //await testNewMessage();
    } catch (e) {
        console.log("testNewMessage failed. Result below:");
        console.log(e);
    }
    try{
        //await testGetChatByChannel();
    } catch (e) {
        console.log("testGetChatByChannel failed. Result below:");
        console.log(e);
    }
    try{
        //await testUpdateStatus();
    } catch (e) {
        console.log("testUpdateStatus failed. Result below:");
        console.log(e);
    }
    try{
        await testNewChannel();
    } catch (e) {
        console.log("testNewChannel failed. Result below:");
        console.log(e);
    }

    // Clear data from database
    try{
        await clearRelationships();
    } catch (e) {
        console.log("clearRelationships failed. Result below:");
        console.log(e);
    }
    try{
        await clearChats();
    } catch (e) {
        console.log("clearChats failed. Result below:");
        console.log(e);
    }
    try{
        await clearUsers();
    } catch (e) {
        console.log("clearUsers failed. Result below:");
        console.log(e);
    }
}

main();

const mongoCollections = require('../config/mongoCollections');
const getUsersCollection = mongoCollections.users;
const {ObjectId} = require("mongodb");

let newUsers = async function (shouldDrop) {
    
    let userIds = [];
    let usersCollection = await getUsersCollection();

    if(shouldDrop)
        await usersCollection.drop();

    let users = [
        {_id: new ObjectId(), name: "Sai Harish Kumar Vitta", username: "svitta", password: "$2a$06$ZM6n9pBr0Kqi7xTbpEKQh.Bnzg2G6rlJ8iGJy70KGPc5T/OZlNkUS", bio: "Masters Student", age: 25, searchTags: ["Teammate1"], mentorRelationships: [], menteeRelationships: [], myPosts: []},
        {_id: new ObjectId(), name: "Danielle Williams", username: "dwillia8", password: "$2a$06$UYzZcrQqc38Mk6FgDHLe0.IicLxp1Hmdkzj39di/5MVnpP6MycKAW", bio: "Masters Student", age: 25, searchTags: ["Teammate2"], mentorRelationships: [], menteeRelationships: [], myPosts: []},
        {_id: new ObjectId(), name: "Ethan Grzeda", username: "egrzeda", password: "$2a$06$OuGWarBVwTtRnN7Lpw4YOOxh/fhGN5FfiS/41pBbxMvc9WoBnl22q", bio: "Masters Student", age: 25, searchTags: ["Teammate3"], mentorRelationships: [], menteeRelationships: [], myPosts: []},
        {_id: new ObjectId(), name: "Yash Kosambia", username: "ykosambi", password: "$2a$06$XDKMSx7x3VOm6iy63KRaheXWpsB3psgUWYvOnVtfc/PhrTteVr6s.", bio: "Masters Student", age: 25, searchTags: ["Teammate4"], mentorRelationships: [], menteeRelationships: [], myPosts: []},
        {_id: new ObjectId(), name: "Brendan Murray", username: "bmurray", password: "$2a$06$7T0Havx/gLP.y3BpS5al7O11eGL2DxM.sKKFwjS8nEQYiNz8l.iES", bio: "Masters Student", age: 25, searchTags: ["Teammate1"], mentorRelationships: [], menteeRelationships: [], myPosts: []}      
    ];

    for(let user of users) {
        const insertionInfo = await usersCollection.insertOne(user);
        if (!insertionInfo.acknowledged || !insertionInfo.insertedId)
            throw 'Failed to add user';
        else 
            userIds.push(insertionInfo.insertedId);
    }
    return userIds;
}

module.exports = newUsers;
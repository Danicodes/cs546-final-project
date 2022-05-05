const mongoCollections = require('../config/mongoCollections');
const getUsersCollection = mongoCollections.users;
const getPostsCollection = mongoCollections.posts;
const {ObjectId} = require("mongodb");

async function addIndexes(){
    // Add search index to usersCollection
    let usersCollection = await getUsersCollection();
    let indexes = await usersCollection.indexes();
    if (indexes.length === 1) {
        await usersCollection.createIndex( { searchTags: "text", username: "text" }, { name: "userIndex" } );
    }

    let postsCollection = await getPostsCollection();
    // Add search index to postsCollection
    indexes = await postsCollection.indexes();
    if (indexes.length === 1) {
        await postsCollection.createIndex( { searchTags: "text", content: "text" }, { name: "postIndex" } );
    }

    return { success: true }; 
}

module.exports = addIndexes;
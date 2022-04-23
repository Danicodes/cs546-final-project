const mongoCollections = require('../config/mongoCollections');
const getPostsCollection = mongoCollections.posts;
const {ObjectId} = require("mongodb");

let newPosts = async function (userIds, shouldDrop) {
    userIds = userIds
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    let postIds = [];
    let postsCollection = await getPostsCollection();

    if(shouldDrop)
        await postsCollection.drop();
    
    let posts = [
        { _id: ObjectId(), author: userIds[0], visibility: "public", content: "First Post", searchTags: ["First", "Sample", "Test"], createdOn: new Date(1995, 11, 17).toISOString(), comments: [], reportedBy: [], likedBy: []},
        { _id: ObjectId(), author: userIds[1], visibility: "private", content: "Second Post", searchTags: ["Second", "Sample", "Test"], createdOn: new Date(1995, 11, 18).toISOString(), comments: [], reportedBy: [], likedBy: []},
        { _id: ObjectId(), author: userIds[2], visibility: "public", content: "Third Post", searchTags: ["Third", "Sample", "Test"], createdOn: new Date(1995, 11, 19).toISOString(), comments: [], reportedBy: [], likedBy: []},
        { _id: ObjectId(), author: userIds[3], visibility: "public", content: "Fourth Post", searchTags: ["Fourth", "Sample", "Test"], createdOn: new Date(1995, 11, 20).toISOString(), comments: [], reportedBy: [], likedBy: []},
        { _id: ObjectId(), author: userIds[4], visibility: "public", content: "Fifth Post", searchTags: ["Fifth", "Sample", "Test"], createdOn: new Date(1996, 11, 17).toISOString(), comments: [], reportedBy: [], likedBy: []}
    ];

    for(let post of posts) {
        const insertionInfo = await postsCollection.insertOne(post);
        if (!insertionInfo.acknowledged || !insertionInfo.insertedId)
            throw 'Failed to add post';
        else 
            postIds.push(insertionInfo.insertedId);
    }
    return postIds;
}

module.exports = newPosts;
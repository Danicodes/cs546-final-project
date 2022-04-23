const mongoCollections = require('../config/mongoCollections');
const getPostsCollection = mongoCollections.posts;
const validations = require("../validations/validations");
const usersData = require("./users");
const {ObjectId} = require("mongodb");

let addPost = async function(post) {
    validations.validatePost(post);

    // Update myPosts attribute in Users Collection
    let updatedUser = await usersData.addToMyPosts(post.author, post._id);

    let postsCollection = await getPostsCollection();
    let {value : insertedPost} = await postsCollection.findOneAndUpdate(
        { _id:  post._id},
        { $setOnInsert: post},
        { upsert: true, returnNewDocument: true, returnDocument: 'after' }
      );
    return insertedPost;
}

let getPosts = async function(pageNo, limit){
    let postsCollection = await getPostsCollection();
    // Return all posts when there is no option provided
    if(pageNo == null && limit == null)
        return await postsCollection.find().sort({createdOn : -1}).toArray();
    
    // If any one of the parameter is not provided, set it to default value
    if(pageNo == null) pageNo = 0;
    if(limit == null) limit = 2;

    // Validate and parse the query parameter to Number
    pageNo = validations.validateNumber(pageNo, "pageNo");
    limit = validations.validateNumber(limit, "limit");

    // Retrieve and Return the latest posts
    let skip = (pageNo) * limit;
    let posts = await postsCollection.find().sort({createdOn : -1}).skip(skip).limit(limit).toArray();
    return posts;
}

let likeAPost = async function(userId, postId) {
    userId = validations.validateId(userId);
    postId = validations.validateId(postId);

    if(!usersData.isValidUser(userId))
        throw `Invalid User Id - ${userId}`;

    let postsCollection = await getPostsCollection();
    let {value: updatedPost} = await postsCollection.findOneAndUpdate(
        { _id: ObjectId(postId) },
        { $addToSet: { likedBy: userId } },
        {returnDocument: 'after', returnNewDocument: true}
    );
    if(updatedPost == null) 
        throw `Failed to add like to post - ${postId} by the user ${userId}`;
    else 
        return updatedPost.likedBy.length;
    
};

module.exports = {
    addPost     : addPost,
    getPosts    : getPosts,
    likeAPost   : likeAPost
}
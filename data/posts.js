const mongoCollections = require('../config/mongoCollections');
const getPostsCollection = mongoCollections.posts;
const validations = require("../validations/validations");
const usersData = require("./users");
const {ObjectId} = require("mongodb");
const constants = require("../constants/constants");

/**
 * Inserts a new Post into Database
 * @param {string|ObjectId} author - UserID who is creating the post
 * @param {Enum} visibility - Class Visibility representing 'public'/'private'
 * @param {string} content - Main description of the Post
 * @param {[string...]} searchTags - Tags associated with the post (optional)
 * @returns The inserted post
 */
let addPost = async function(author, visibility, content, searchTags) {
    // Validations of the properties
    author = validations.validateId(author, "author");
    visibility = validations.validateString(visibility, "visibility");
    content = validations.validateString(content, "cannot");
    searchTags = validations.validateList(searchTags, "Search Tags", true);
    for(let i in searchTags)
        searchTags[i] = validations.validateString(searchTags[i], "Search Tag");

    let postObject = {
        _id: ObjectId(),
        author: author,             // This needs to be taken from expression Session in future
        visibility: visibility,
        content: content,
        searchTags: searchTags,
        createdOn: new Date(),      // created on is initialized to current Date
        comments: [],               // Comments are be empty initially
        reportedBy: [],             // Reporters are empty initially
        likedBy: []                 // Liked Persons List is empty initially
    };

    // Update myPosts attribute in Users Collection
    await usersData.addToMyPosts(postObject.author, postObject._id);

    // Insert the Object into Database
    let postsCollection = await getPostsCollection();
    let {value : insertedPost} = await postsCollection.findOneAndUpdate(
            { _id:  postObject._id},
            { $setOnInsert: postObject},
            { upsert: true, returnNewDocument: true, returnDocument: 'after' }      // Options to ensure the function to return updated user Object 
        );
    if(postsCollection == null) 
        throw new Error("Couldn't create a new Post");
    insertedPost._id = insertedPost._id.toString();     // Update the _id from ObjectId to string
    return insertedPost;
}

/**
 * Retrieve the posts (along with the pagination)
 * @param {number} pageNo - S.No of the page requesting
 * @param {number} limit - Number of posts considered per page
 * @returns The array of posts sorted REVERSE as per the field - createdOn
 */
let getPosts = async function(pageNo, limit){
    let postsCollection = await getPostsCollection();
    // Return all posts when there are no option provided
    if(pageNo == null && limit == null)
        return await postsCollection.find().sort({createdOn : -1}).toArray();
    
    // Assign the parameters to default values if any one is not provided
    if(pageNo == null) pageNo = constants.DEFAULT_PAGE_NO;
    if(limit == null) limit = constants.DEFAULT_POSTS_PER_PAGE;

    // Validate and parse the query parameter to Number
    pageNo = validations.validateNumber(pageNo, "pageNo");
    limit = validations.validateNumber(limit, "limit");

    // Retrieve and Return the latest posts
    // TODO: Can add indexing with the createdOn for performance Improvise
    let skip = (pageNo) * limit;
    let posts = await postsCollection.find().sort({createdOn : -1}).skip(skip).limit(limit).toArray();
    return posts;
}


/**
 * Get all posts of a user
 * @param {string|ObjectId} userId
 * @returns the Array of Posts created by User
 */
let getPostsByUser = async function(userId) {
    userId = validations.validateId(userId, "User ID");
    let myPosts = await usersData.getMyPosts(userId);
    
    let postsCollection = await getPostsCollection();
    let myPostsInDetail = await postsCollection.find({_id: {$in: myPosts}}).toArray();

    return myPostsInDetail;
};

/**
 * Post with postId's likedBy is updated with the userId provided
 * @param {string|ObjectId} userId - ID of the user liking the post
 * @param {string|ObjectId} postId - ID of the post liked
 * @returns the lengthof the likedBy list of this particular post
 */
let likeAPost = async function(userId, postId) {
    userId = validations.validateId(userId);
    postId = validations.validateId(postId);

    if(!usersData.isValidUser(userId))
        throw new Error(`Invalid User Id - ${userId}`);

    let postsCollection = await getPostsCollection();
    let {value: updatedPost} = await postsCollection.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { likedBy: userId } },     // Makes sure the userId is not duplicated
        {returnDocument: 'after', returnNewDocument: true}         // Options to ensure the function to return updated user Object 
    );
    if(updatedPost == null)     // Only if postId is not found
        throw new Error(`Failed to add like to post - ${postId} by the user ${userId}`);
    else 
        return updatedPost.likedBy.length;
};

/**
 * Inserts a new Comment for the provided Post
 * @param {string|ObjectId} postId - 
 * @param {string|ObjectId} author 
 * @param {string} message 
 * @returns the comment object
 */
let addComment = async function(postId, author, message) {
    // Validations
    author = validations.validateId(author, "Author");
    postId = validations.validateId(postId, "Post Id");
    message = validations.validateString(message, "Message");

    let commentObject = {
        author: author,
        message: message,
        timestamp: new Date()    // timestamp is initialized to current Date
    };

    let postsCollection = await getPostsCollection();
    let {value: updatedPost} = await postsCollection.findOneAndUpdate(
        { _id: postId },
        { $push: { comments : commentObject } },
        {returnDocument: 'after', returnNewDocument: true}  // Options to ensure the function to return updated user Object 
    );
    if(updatedPost == null) 
        throw new Error(`Failed to update user - ${userId} with the new Post ${postId}`);
    else 
        return commentObject;
};


/**
 * Retreive the comments of a post
 * @param {string|ObjectId} postId 
 * @returns The Array of Comments belonging to a post
 */
let getComments = async function(postId) {
    postId = validations.validateId(postId);
    
    let postsCollection = await getPostsCollection();
    let post = await postsCollection.findOne({_id: postId});
    if(post == null)
        throw new Error(`No post is found with Id - ${postId}`);
    else 
        return post.comments;
};

module.exports = {
    addPost         : addPost,
    getPosts        : getPosts,
    getPostsByUser  : getPostsByUser,
    likeAPost       : likeAPost,
    addComment      : addComment,
    getComments     : getComments
}
const express = require("express");
const router = express.Router();
const data = require("../data");
const postsData = data.posts;
const validations = require("../validations/validations");
const {ObjectId} = require("mongodb");
const constants = require("../constants/constants");
const UnprocessibleRequest = require("../errors/UnprocessibleRequest");

/**
 * Creates a new Post in the database under the user logged into session
 * @param {Request} req 
 * @param {Response} res 
 * @returns in case of success (200) - The new post inserted
 *          in case of validation Failure (400)
 *          in case of any other issue 
 */
let addPost = async function(req, res) {
    let {visibility, content, searchTags} = req.body;
    let author = req.session.user.id;
    try {
        // Validations of the properties
        author = validations.validateId(author, "author");
        visibility = validations.validateString(visibility, "visibility");
        content = validations.validateString(content, "cannot");
        searchTags = validations.validateList(searchTags, "Search Tags");
        for(let i in searchTags)
            searchTags[i] = validations.validateString(searchTags[i], "Search Tag");
    } catch(e) {
        return res.status(400).json("Error: " + e);     // Failed in validating atleast one field
    }
    
    try{
        let addedPost = await postsData.addPost(author, visibility, content, searchTags);
        return res.status(200).json(addedPost);
    } catch (e) {
        return res.status(500).json("addPost - Error: " + (e.stack || e));
    }
};


/**
 * Returns the list of all posts (paginated) for the feed page of the user
 * @param {Request} req 
 * @param {Response} res 
 * @returns in case of success (200) - Returns the list of Posts
 *          in case of invalid parameters (400) - pageNo and limit (optional)
 */
let getPostsPage = async function(req, res) {
    return res.status(200).render("frames/feed", {pageTitle: "Feed Page", userSessionId: req.session.user.id}); 
};

let getPosts = async function(req, res) {
    let sessionUserId = req.session.user.id;
    try{
        let posts = await postsData.getPosts(sessionUserId);
        return res.status(200).json(posts);
    } catch(e) {
        return res.status(400).json("getAllPosts - Error: " + e);
    }
};


/**
 * get posts of one particular user
 * @param {Request} req 
 * @param {Response} res 
 * @returns in case of success (200) - The Array of Posts written by the user
 *          in case of validation failure (400)
 *          in case of update failure (500)
 */
let getPostsByUser = async function(req, res) {
    let userId = req.session.user.id;
    try {
        userId = validations.validateId(userId, "User ID");
    } catch (e) {
        return res.status(400).json("Error: " + e);     // Failed in validation
    }

    try {
        let userPosts = await postsData.getPostsByUser(userId);
        return res.status(200).json(userPosts);
    } catch (e) {
        return res.status(500).json("getPostsByUser - Error: " + e);
    }
};


/**
 * Like a post 
 * @param {Request} req 
 * @param {Response} res 
 * @returns in case of success (200) - The number of likes does this post have
 *          in case of validation failure (400)
 *          in case of update failure (500)
 */
let likeAPost = async function(req, res) {
    let userId = req.session.user.id;
    let postId = req.params.id;
    try{
        postId = validations.validateId(postId, "PostId");
    } catch(e) {
        return res.status(400).json(`likeAPost - Error: PostId provided in the URL - ${req.params.id} is not valid - ${e}`);
    }
    
    try{
        let likes = await postsData.likeAPost(userId, postId);
        return res.status(200).json(likes); 
    } catch(e){
        return res.status(500).json(`likeAPost - Error: ${e}`);
    }
};



/**
 * Report a post 
 * @param {Request} req 
 * @param {Response} res 
 * @returns in case of success (200) - The number of reports does this post have
 *          in case of validation failure (400)
 *          in case of update failure (500)
 */
 let reportAPost = async function(req, res) {
    let userId = req.session.user.id;
    let postId = req.params.id;
    try{
        postId = validations.validateId(postId, "PostId");
    } catch(e) {
        return res.status(400).json(`likeAPost - Error: PostId provided in the URL - ${req.params.id} is not valid - ${e}`);
    }
    
    try{
        let reports = await postsData.reportAPost(userId, postId);
        return res.status(200).json(reports); 
    } catch(e){
        return res.status(500).json(`reportAPost - Error: ${e}`);
    }
};


/**
 * Report a post 
 * @param {Request} req 
 * @param {Response} res 
 * @returns in case of success (200) - The number of reports does this post have
 *          in case of validation failure (400)
 *          in case of update failure (500)
 */
 let disLikeAPost = async function(req, res) {
    let userId = req.session.user.id;
    let postId = req.params.id;
    try{
        postId = validations.validateId(postId, "PostId");
    } catch(e) {
        return res.status(400).json(`disLikeAPost - Error: PostId provided in the URL - ${req.params.id} is not valid - ${e}`);
    }
    
    try{
        let disLikes = await postsData.disLikeAPost(userId, postId);
        return res.status(200).json(disLikes); 
    } catch(e){
        if(e instanceof UnprocessibleRequest)
            return res.status(e.status).json({error: e.message});
        return res.status(500).json(`disLikeAPost - Error: ${e}`);
    }
};


/**
 * Adds a comment to the post created
 * @param {Request} req 
 * @param {Response} res 
 * @returns in case of success (200) 
 *          in case of Validation Failure (400)
 *          in case of any other Issue (500)
 */
let addComment = async function(req, res) {
    let author = req.session.user.id;
    let postId = req.params.id;
    let message = req.body.message;
    
    try{
        validations.validateId(author, "Author");
        validations.validateId(postId, "Post ID");
        message = validations.validateString(message, "Message");
    } catch (e) {
        return res.status(400).json("addComment - Error: " + (e.stack || e));
    }
    
    try {
        let insertedComment = await postsData.addComment(postId, author, message);
        return res.status(200).json(insertedComment);
    } catch (e) {
        return res.status(500).json("addComment - Error: " + (e.stack || e));
    }
};


/**
 * Retrives all the comments of a post 
 * @param {Request} req 
 * @param {Response} res 
 * @returns in case of success (200) 
 *          in case of Validation Failure (400)
 *          in case of any other Issue (500)
 */
let getComments = async function(req, res) {
    let postId = req.params.id;
    try {
        postId = validations.validateId(postId);
    } catch (e) {
        return res.status(400).json("getComments - Error: " + (e.stack || e));
    }
    
    try {
        let comments = await postsData.getComments(postId);
        return res.status(200).json(comments);
    } catch(e) {
        return res.status(500).json("getComments - Error: " + (e.stack || e));
    }
};


/**
 * Delete Comments of a particular postId
 * @param {*} req 
 * @param {*} res 
 */
let deleteComments = async function(req, res) {
    // TODO: Need to be implemented!
};

router.route("/html")
    .get(getPostsPage);

router.route("/user")
    .get(getPostsByUser);

router.route("/:id/like")
    .post(likeAPost);

router.route("/:id/report")
    .post(reportAPost);

router.route("/:id/dislike")
    .post(disLikeAPost);
    
router.route("/:id/comments")
    .post(addComment)
    .get(getComments);
    
router.route("/")
    .post(addPost)
    .get(getPosts);
    
module.exports = router;
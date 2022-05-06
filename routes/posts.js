const express = require("express");
const router = express.Router();
const data = require("../data");
const postsData = data.posts;
const validations = require("../validations/validations");
const {ObjectId} = require("mongodb");
const constants = require("../constants/constants");

/**
 * Creates a new Post in the database under the user logged into session
 * @param {Request} req 
 * @param {Response} res 
 * @returns in case of success (200) - The new post inserted
 *          in case of validation Failure (400)
 *          in case of any other issue 
 */
let addPost = async function(req, res) {
    let {author, visibility, content, searchTags} = req.body;
    // TODO: get the author from expression-session instead of body
    // let userId = req.session.user;
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
 * Returns the list of all pages (paginated) for the feed page of the user
 * @param {Request} req 
 * @param {Response} res 
 * @returns in case of success (200) - Returns the list of Posts
 *          in case of invalid parameters (400) - pageNo and limit (optional)
 */
let getPostsPage = async function(req, res) {
    return res.status(200).render("frames/feed", {pageTitle: "Feed Page"});
};

let getPosts = async function(req, res) {
    try{
        let pageNo = req.query.pageNo;
        let limit = req.query.limit;

        // Assign the parameters to default values if not provided 
        if(pageNo == null) pageNo = constants.DEFAULT_PAGE_NO;
        if(limit == null) limit = constants.DEFAULT_POSTS_PER_PAGE;

        // Validate and parse the query parameter to Number
        pageNo = validations.validateNumber(pageNo, "pageNo");
        limit = validations.validateNumber(limit, "limit");

        let posts = await postsData.getPosts(pageNo, limit);
        if(posts.length === 0)
            return res.status(200).json("No Posts available on this page");
        else 
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
    // TODO: get the author from expression-session instead of query param
    // let userId = req.session.user;
    let userId = req.params.id;
    try {
        userId = validations.validateId(userId);
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
    // TODO: get the author from expression-session instead of body
    // let userId = req.session.user;
    let userId = req.query.user;
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
 * Adds a comment to the post created
 * @param {Request} req 
 * @param {Response} res 
 * @returns in case of success (200) 
 *          in case of Validation Failure (400)
 *          in case of any other Issue (500)
 */
let addComment = async function(req, res) {
    // TODO: get the author from expression-session instead of body
    // let userId = req.session.user;
    let author = req.query.user;
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

router.route("/")
.post(addPost)
.get(getPosts);

router.route("/user/:id")
    .get(getPostsByUser);

router.route("/:id/like")
.post(likeAPost);

router.route("/:id/comments")
    .post(addComment)
    .get(getComments);

module.exports = router;
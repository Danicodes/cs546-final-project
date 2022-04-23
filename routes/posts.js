const express = require("express");
const router = express.Router();
const data = require("../data");
const postsData = data.posts;
const validations = require("../validations/validations");
const {ObjectId} = require("mongodb");


let addPost = async function(req, res) {
    // let userId = req.session.user;
    let {userId, visibility, content, searchTags, createdOn} = req.body;
    let post = {
        _id: ObjectId(),
        author: userId,             // This needs to be taken from expression Session in future
        visibility: visibility,
        content: content,
        searchTags: searchTags,
        createdOn: createdOn,
        comments: [],
        reportedBy: [],
        likedBy: []
    };
    try {
        post = validations.validatePost(post);
    } catch(e) {
        return res.status(400).json("Error: " + e);
    }
    
    try{
        let addedPost = await postsData.addPost(post);
        return res.status(200).json(addedPost);
    } catch (e) {
        return res.status(500).json("addPost - Error: " + (e.stack || e));
    }
};

let getPosts = async function(req, res) {
    try{
         let pageNo = req.query.pageNo;
         let limit = req.query.limit;

        let posts = await postsData.getPosts(pageNo, limit);
        return res.status(200).json(posts);
    } catch(e) {
        return res.status(500).json("getAllPosts - Error: " + e);
    }
};

let likeAPost = async function(req, res) {
    let userId = "6257b2085c63aa640c130917";            // Get the userId from the Express Session
    let postId = req.params.id;
    try{
        postId = validations.validateId(postId, "PostId");
    } catch(e) {
        res.status(400).json(`likeAPost - Error: PostId provided in the URL - ${req.params.id} is not valid - ${e}`);
    }
    
    try{
        let likes = await postsData.likeAPost(userId, postId);
        res.status(200).json("New Count - " + likes); 
    } catch(e){
        res.status(500).json(`likeAPost - Error: ${e}`);
    }

};

router.route("/")
    .post(addPost)
    .get(getPosts);

router.route("/:id/like")
    .post(likeAPost);

module.exports = router;
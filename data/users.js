const mongoCollections = require('../config/mongoCollections');
const getUsersCollection = mongoCollections.users;
const validations = require("../validations/validations");
const {ObjectId} = require("mongodb");

/**
 * Update the User - Add a new PostID to field 'myPosts' 
 * When a new post is created by user, his myPosts needs to be updated
 * @param {*} userId - Author of the Post 
 * @param {*} postId - Ne PostID about to be inserted
 * @returns - Updated User 
 *          or throw an error in case if user is not found
 */
let addToMyPosts = async function(userId, postId) {
    userId = validations.validateId(userId);
    postId = validations.validateId(postId);

    let usersCollection = await getUsersCollection();
    let {value: updatedUser} = await usersCollection.findOneAndUpdate(
        { _id: userId },
        { $push: { myPosts: postId } },
        {returnDocument: 'after', returnNewDocument: true}  // Options to ensure the function to return updated user Object 
        );
        if(updatedUser == null) 
            throw `Failed to update user - ${userId} with the new Post ${postId}`;
        else 
            return updatedUser;
    };
    
    
let getMyPosts = async function(userId) {
    userId = validations.validateId(userId, "User ID");
    let usersCollection = await getUsersCollection();
    let user = await usersCollection.findOne({_id: userId}, {_id: 0, myPosts:1});
    if(user == null)
        throw new Error("User with Id userId is not found");
    else 
        return user.myPosts;
};

/**
 * To check if the user is valid
 * @param {*} userId - ID of the user needs to be verified
 * @returns - True in case of valid user
 *          - False in case of invalid user
 */
let isValidUser = async function(userId) {
    userId = validations.validateId(userId);

    let usersCollection = await getUsersCollection();
    let user = usersCollection.findOne({_id: ObjectId(userId)});
    if(user == null)
        return false;
    else 
        return true;
};


module.exports = {
    addToMyPosts: addToMyPosts,
    getMyPosts: getMyPosts,
    isValidUser: isValidUser
}
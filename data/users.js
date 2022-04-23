const mongoCollections = require('../config/mongoCollections');
const getUsersCollection = mongoCollections.users;
const validations = require("../validations/validations");
const {ObjectId} = require("mongodb");

let addToMyPosts = async function(userId, postId) {
    validations.validateId(userId);
    validations.validateId(postId);

    let usersCollection = await getUsersCollection();
    let {value: updatedUser} = await usersCollection.findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $push: { myPosts: postId } },
        {returnDocument: 'after', returnNewDocument: true}
    );
    if(updatedUser == null) 
        throw `Failed to update user - ${userId} with the new Post ${postId}`;
    else 
        return updatedUser;
};

let isValidUser = async function(userId) {
    userId = validations.validateId(userId);

    let usersCollection = await getUsersCollection();
    let user = usersCollection.findOne({_id: ObjectId(userId)});
    if(user == null)
        return false;
    else 
        return true;
}


module.exports = {
    addToMyPosts: addToMyPosts,
    isValidUser: isValidUser
}
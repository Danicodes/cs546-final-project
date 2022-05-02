const { ObjectID } = require('bson');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');

async function getPersonById(id){
    // In this function we need to find the user for a given id and return them.
    const userCollection = await users();
    console.log(id);
    const person = await userCollection.findOne({ _id: ObjectID(id) });
    // Return the whole person
    return person;
}

async function updateUser(id, name, bio, age, searchTags, mentorRelations, menteeRelations, myPosts){
    checks(name, bio, age, searchTags, mentorRelations, menteeRelations, myPosts);
    // In this function we need to update the information for a user corresponding to the given id.
    let person = getPersonById(id);
    let username = person.username;
    let password = person.password;
    // I need to get the password/username for the given id to put in updateduser here
    const updateduser = {
        name : name,
        username : username,
        password : password,
        bio : bio,
        age : age,
        searchTags: searchTags,
        mentorRelations : mentorRelations,
        menteeRelations : menteeRelations,
        myPosts : myPosts
    };
    let userCollection = await users();
    const updated = await userCollection.updateOne(
        { _id : ObjectID(id) },
        {$set : updateduser}
    );
    if (updated.modifiedCount == 0){
        throw "Error: no user to modify for that id."
    }
    const ret = await userCollection.findOne({_id : ObjectID(id)});
    return ret;
}

async function updatePassword(id, password){
    let hashedpassword = await bcrypt.hash(password, 8);
    const userCollection = await users();
    const updated = await userCollection.updateOne(
        { _id : ObjectID(id)},
        {$set: {password : hashedpassword} }
    );
    if (updated.modifiedCount == 0){
        throw "Error: could not update password."
    }
    const ret = await userCollection.findOne({_id : ObjectID(id)});
    return ret;
}


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

const checks = function checks(name, bio, age, searchTags, mentorRelations, menteeRelations, myPosts){
    if (!(typeof name == 'string') || (name == '')){
        throw new Error("name needs to be a non-zero string");
    }
    if (!(typeof bio == 'string')){
        throw new Error("bio needs to be a string");
    }
    if (!(typeof age == 'number') || (age > 100) || (age < 0)){
        throw new Error("age must be a number between 0 and 100");
    }
    if (!Array.isArray(searchTags)){
        throw new Error("searchTags must be an array of strings");
    }
    let flag = false;
    for (let i = 0; i < searchTags.length; i++){
        if (typeof searchTags[i] != 'string'){
            flag = true;
        }
    }
    if (flag){
        throw new Error("searchTags must contain strings");
    }
    if (!Array.isArray(mentorRelations)){
        throw new Error("mentorRelations must be an array");
    }
    if (!Array.isArray(menteeRelations)){
        throw new Error("menteeRelations must be an array");
    }
    if (!Array.isArray(myPosts)){
        throw new Error("myPosts must be an array");
    }
}

module.exports = {
    addToMyPosts: addToMyPosts,
    getMyPosts: getMyPosts,
    isValidUser: isValidUser,
    getPersonById,
    updateUser,
    updatePassword
}
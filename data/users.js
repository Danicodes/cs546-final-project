const { ObjectID } = require('bson');
const { users } = require('.');
const { get } = require('../../../lab6/lab6/routes/bands');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

async function getPersonById(id){
    // In this function we need to find the user for a given id and return them.
    const userCollection = await users();
    // Probably not the right function here
    const person = await userCollection.get(id);
    return person;
}

async function updateUser(id, name, bio, age, searchTags, mentorRelations, menteeRelations, myPosts){
    // In this function we need to update the information for a user corresponding to the given id.
    
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
    const updated = await userCollection.updateOne(
        { _id : ObjectID(id) },
        {$set : updateduser}
    );
    if (updated.modifiedCount == 0){
        throw "Error: no band to modify for that id."
    }
    return await get(id);
}

async function updatePassword(id, password){
    const updated = await userCollection.updateOne(
        { _id : ObjectID(id) },
        {password : password}
    );
    if (updated.modifiedCount == 0){
        throw "Error: could not update password."
    }
    return await get(id);
}

module.exports = {
    getPersonById,
    updateUser,
    updatePassword
}
const mongoCollections = require('../config/mongoCollections');
const getUsersCollection = mongoCollections.users;
const validate = require('../validations/data');
const validations = require("../validations/validations");
const {ObjectId} = require("mongodb");


/**** Functions for testing relationship routes ****/
/**
 * Returns the given user's mentorRelationships list
 * @param {ObjectId|String} userId 
 * @returns 
 */
async function getMentorList(userId){
    validate.checkArgLength(arguments, 1);
    userId = validate.convertID(userId);
    let usersDB = await getUsersCollection();

    let userObj = await usersDB.findOne({_id: userId});
    if (userObj == null) throw `Error: Could not find ${userId}`;

    return userObj.mentorRelationships;
}

/**
 * Returns the given user's menteeRelationships list
 * @param {Object|String} userId 
 * @returns 
 */
async function getMenteeList(userId){
    validate.checkArgLength(arguments, 1);
    userId = validate.convertID(userId);
    let usersDB = await getUsersCollection();

    let userObj = await usersDB.findOne({_id: userId});
    if (userObj == null) throw `Error: Could not find ${userId}`;

    return userObj.menteeRelationships;
}

/**
 * Returns both the given user's mentor and mentee relationships in a single list
 * @param {Object|String} userId 
 * @returns 
 */
async function getUserRelationships(userId){
    validate.checkArgLength(arguments, 1);
    userId = validate.convertID(userId);
    let usersDB = await getUsersCollection();

    let userObj = await usersDB.findOne({_id: userId});

    let relationships = [];
    relationships.push(...userObj.mentorRelationships);
    relationships.push(...userObj.menteeRelationships);

    return relationships;
}   

/**
 * Updates mentor and mentee's relationship lists according to what role they play in the current relationhsip
 * Returns the updated user object corresponding to the given Id
 * @param {Object|String} userId 
 * @param {Object} relationshipObj 
 * @returns 
 */
async function updateUserRelationships(userId, relationshipObj){
    validate.checkArgLength(arguments, 2);
    validate.checkIsEmptyString(userId);

    let mentorId = validate.convertID(relationshipObj.mentor);
    let menteeId = validate.convertID(relationshipObj.mentee);

    if ((userId.toString() !== mentorId.toString()) || (userId.toString() !== menteeId.toString())) throw `Error: Unauthorized user`;

    let usersDB = await getUsersCollection();
    //let userObj = await usersDB.findOne({_id: userId});
    
    let mentor = await usersDB.findOne({_id: mentorId});
    let mentee = await usersDB.findOne({_id: menteeId});
    if (mentor == null || mentee == null) throw `Error: Could not find user ${mentor} or ${mentee}`;
    mentor.menteeRelationships.push(relationshipObj._id);
    mentee.mentorRelationships.push(relationshipObj._id);

    let setMentorObj = {
        $set: {
            menteeRelationships: mentor.menteeRelationships
        }
    };

    let updatedMentor = await usersDB.findOneAndUpdate({_id: mentorId}, setMentorObj);

    let setMenteeObj = {
        $set: {
            mentorRelationships: mentee.mentorRelationships
        }
    };

    let updatedMentee = await usersDB.findOneAndUpdate({_id: menteeId}, setMenteeObj);

    if(updatedMentor == null || updatedMentee == null) throw `Failed to update user relationships mentee: ${updatedMentee} ; mentor: ${updatedMentor}`;
    
    userId = validate.convertID(userId);
    if (userId.toString() === mentorId.toString()){
        return updatedMentor;
    }
    else {
        return updatedMentee;
    }
}


/**** Functions for testing post routes ****/
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
    isValidUser: isValidUser,
    getMentorList: getMentorList,
    getMenteeList: getMenteeList,
    getUserRelationships: getUserRelationships,
    updateUserRelationships: updateUserRelationships
}
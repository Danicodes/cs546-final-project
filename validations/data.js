// Functions for checking data going into the database and checking params passed from routes
// universally common helper functions
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const constants = require('../constants/constants');
const UnauthorizedRequest = require('../errors/UnauthorizedRequest');

/**
 * Check that the correct number of arguments is in a given array
 * @param {array} args: list of arguments
 * @param {number} correctNumberArgs: the correct number of arguments that should be in the list
 */
function checkArgLength(args, correctNumberArgs){
    if (args.length !== correctNumberArgs) throw `Error: Invalid number of arguments passed. Expected ${correctNumberArgs}; received ${args.length}`;
}

// Check that element is a string
function checkIsString(str){
    if (typeof(str) !== 'string') throw `Error: Expected a string; received type ${typeof(str)}`;
}

// Check that element is a non-empty string
function checkIsEmptyString(str, varName){
    checkIsString(str);
    if (str.trim().length === 0) throw `Error: given ${varName} empty string`;
}


/**
 *  Tries to convert the input to an object Id, 
 *  throw an error if not possible, otherwise return the converted object id
*/
function convertID(id){
    try {
        id = ObjectId(id);
    }
    catch(e){
        throw `Error: not a valid object id string`;
    }

    return id;
}

const passCheck = async function passCheck(userId, password1, password2, newpassword){
    if (!(password1 == password2)){
        throw "Error: Passwords do not match!";
    }
    if (newpassword.length < 6){
        throw "Error: Password must be at least 6 characters long.";
    }
    return ({authenticated: true});
}
/*const checks = function checks(name, bio, age){
    if (!(typeof name == 'string') || (name == '')){
        throw "Error: name needs to be a non-zero string";
    }
    if (!(typeof bio == 'string')){
        throw "Error: bio needs to be a string";
    }
    if (!(typeof age == 'number') || (age > 100) || (age < 0)){
        throw "Error: age must be a number between 0 and 100";
    }*/

function parseTimeInterval(timelineInterval){
    if (timelineInterval != null) {
        if (typeof(timelineInterval) === 'string'){
           timelineInterval = parseInt(timelineInterval);
        }
        
        if (timelineInterval < constants.MIN_CHECKIN_INTERVAL || timelineInterval > constants.MAX_CHECKIN_INTERVAL){
           throw `Time interval must be between 2 seconds and 10 days`;
        }
     }
     return timelineInterval;
}

function parseCheckin(lastcheckin){
    if (typeof(lastcheckin) == 'string'){
        checkIsEmptyString(lastcheckin);
        lastcheckin = new Date(Date.parse(lastcheckin));
     }
     else if (typeof(lastcheckin) == 'number'){
        lastcheckin = new Date(lastcheckin);
     }
     else {
        throw `Invalid date type`;
     }
     return lastcheckin;
}

const checks = function checks(name, mentorBio, menteeBio, age, myPreferredFeed, searchTags){
    checkIsEmptyString(name);
    //checkIsEmptyString(mentorBio);
    //checkIsEmptyString(menteeBio);
    //checkIsEmptyString(myPreferredFeed);


    if (!(typeof age == 'number') || (age > 100) || (age < 0)){
        throw "Error: age must be a number between 0 and 100";
    }
    return true;
}

const isUserAuthorizedForPost = async function(userId, relationshipId) {
    convertID(userId);
    convertID(relationshipId);

    let relationship = relationshipsData.getRelationshipById(relationshipId);
    if(userId === relationship.mentor.toString() || userId === relationship.mentee.toString())
        return ;
    else
        throw UnauthorizedRequest(`${userId} Not Authorized to update ${relationshipId}`);
}

module.exports = {
    checkArgLength,
    checkIsString,
    checkIsEmptyString,
    convertID,
    checks,
    passCheck,
    parseTimeInterval,
    parseCheckin,
    passCheck
}
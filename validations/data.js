// Functions for checking data going into the database and checking params passed from routes
// universally common helper functions
const { ObjectId } = require('mongodb');
const constants = require('../constants/constants');
const UnauthorizedRequest = require('../errors/UnauthorizedRequest');
const bcrypt = require('bcrypt');

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

const passCheck = async function passCheck(userPass, password1, password2, newpassword){
    if (!(password1 == password2)){
        throw "Error: Passwords do not match!";
    }
    let same = await bcrypt.compare(newpassword, userPass);
    console.log(same);
    if (same){
        throw "Error: The password is the same as the one in the database."
    }
}

const checks = function checks(name, mentorBio, menteeBio, age, myPreferredFeed, searchTags){
    checkIsEmptyString(name);
    checkIsEmptyString(mentorBio);
    checkIsEmptyString(menteeBio);
    checkIsEmptyString(myPreferredFeed);


    if (!(typeof age == 'number') || (age > 100) || (age < 0)){
        throw "Error: age must be a number between 0 and 100";
    }

    if (!Array.isArray(searchTags)){
        throw "Error:searchTags must be an array of strings";
    }
    for(let searchTag of searchTags) 
        checkIsEmptyString(searchTag, "Search Tags");
}

module.exports = {
    checkArgLength,
    checkIsString,
    checkIsEmptyString,
    convertID,
    checks,
    parseTimeInterval,
    parseCheckin,
    passCheck
}
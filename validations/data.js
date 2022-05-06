// Functions for checking data going into the database and checking params passed from routes
// universally common helper functions
const { ObjectId } = require('mongodb');

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
function checkIsEmptyString(str){
    checkIsString(str);
    if (str.trim().length === 0) throw `Error: given empty string`;
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
    console.log(mentorRelations);
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
    checkArgLength,
    checkIsString,
    checkIsEmptyString,
    convertID,
    checks,
    parseTimeInterval
}
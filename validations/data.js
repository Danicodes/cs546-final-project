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

module.exports = {
    checkArgLength,
    checkIsString,
    checkIsEmptyString,
    convertID
}
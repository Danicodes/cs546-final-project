let {ObjectId} = require("mongodb");

/**
 * Should be either string that can be parsed to ObjectId or ObjectId
 * @param {string/ObjectId} id 
 * @param {string} varName - For valid Error Message
 * @returns the ObjectId regardless of the input format
 */
let validateId = function(id, varName) {
    if(typeof id === "string") {
        return ObjectId(id);
    } else if(!ObjectId.isValid(id))
        throw `${varName} is not a Valid mongodb ObjectId`;
    return id;
}

/**
 * Should be either number or string that can be parsed to number
 * @param {number/string} num 
 * @param {string} varName 
 * @returns the parsed/given number
 */
let validateNumber = function(num, varName) {
    if(num == null)
        throw `${varName} should be a valid number`;
    if(typeof num == "string") {
        try {
            num = parseInt(num);
            if (isNaN(num)) throw "";
        } catch(e) {
            throw `${varName} should be a valid Number`;
        }
    } 
    if (typeof num != "number")
        throw `${varName} should be a valid Number`;
    return num;
}

/**
 * string should not be null or undefined
 * type should be string
 * shouldn't be empty or just spaces
 * @param {string} string 
 * @param {string} varName 
 * @returns string that is trimmed
 */
let validateString = function(string, varName) {
    if(string == null || typeof string != "string") 
        throw `${varName} should be a valid String`;
     if(string.trim().length == 0)
        throw `${varName} cannot be empty or just spaces`;
    return string.trim();
};

/**
 * Should be a valid Array
 * @param {Array} list 
 * @param {string} varName 
 * @param {boolean} isOptional - True represents that a list can be empty
 * @returns the given list
 */
let validateList = function(list, varName, isOptional) {
    if(list == null || !Array.isArray(list))
        throw `${varName} should be a valid List`;
    if(!isOptional && list.length == 0)
        throw `${varName} cannot be Empty`;
        return list;
};

/**
 * @param {Date} date 
 * @param {string} varName 
 * @returns the parsed/given Date 
 */
let validateDate = function(date, varName) {
    if(date == null)
        throw `${varName} should be a valid Date`;
    if(date instanceof Date)
        return date;
    let parsedDate = Date.parse(date);
    if(isNaN(parsedDate))
        throw `${varName} should be a parsable Date`;        
    return parsedDate;
}

module.exports = {
    validateId      : validateId,
    validateString  : validateString,
    validateDate    : validateDate,
    validateList    : validateList,
    validateNumber  : validateNumber
}
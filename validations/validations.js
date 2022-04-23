let {ObjectId} = require("mongodb");

let validateId = function(id, varName) {
    if(!ObjectId.isValid(id))
        throw `${varName} is not a Valid mongodb ObjectId`;
    return id;
}

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

let validateString = function(string, varName) {
    if(string == null || typeof string != "string") 
        throw `${varName} should be a valid String`;
     if(string.trim().length == 0)
        throw `${varName} cannot be empty or just spaces`;
    return string.trim();
};
    
let validateList = function(list, varName, isOptional) {
    if(list == null || !Array.isArray(list))
        throw `${varName} should be a valid List`;
    if(!isOptional && list.length == 0)
        throw `${varName} cannot be Empty`;
        return list;
};
    
let validateDate = function(date, varName) {
    if(date == null)
        throw `${varName} should be a valid Date`;
    let parsedDate = Date.parse(date);
    if(isNaN(parsedDate))
        throw `${varName} should be a parsable Date`;        
    return date;
}

// let post = {
//     postId: ObjectId(),
//     author: userId,
//     visibility: visibility,
//     content: content,
//     searchTags: searchTags,
//     createdOn: createdOn,
//     comments: [], -- Empty During the creation
//     reportedBy: [], -- Empty During the Creation
//     likedBy: [] -- Empty During the creation
// };
let validatePost = function(post) {
    if(post._id != null) validateId(post._id, "_id");
    post.author = validateId(post.author, "author");
    post.visibility = validateString(post.visibility, "visibility");
    post.content = validateString(post.content, "cannot");
    post.searchTags = validateList(post.searchTags, "Search Tags");
    for(let i in post.searchTags)
        post.searchTags[i] = validateString(post.searchTags[i], "Search Tag");
    post.createdOn = validateDate(post.createdOn, "Created On");
    post.comments = validateList(post.comments, "Comments", true);
    post.reportedBy = validateList(post.reportedBy, "Reported By", true);
    for(let i in post.reportedBy)
        post.reportedBy[i] = validateId(post.reportedBy[i], "Reported User");
    post.likedBy = validateList(post.likedBy, "Liked Users", true);
    for(let i in post.likedBy)
        post.likedBy[i] = validateId(post.likedBy[i], "Liked User");
    return post;
};

module.exports = {
    validatePost    : validatePost,
    validateId      : validateId,
    validateString  : validateString,
    validateDate    : validateDate,
    validateList    : validateList,
    validateNumber  : validateNumber
}
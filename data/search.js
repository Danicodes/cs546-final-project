const mongoCollections = require("./../config/mongoCollections");
const validate = require('../validations/data');

const usersCol = mongoCollections.users;
const postsCol = mongoCollections.posts;

async function validateIndex(collection){
    let indexes = await collection.indexes();

    if (indexes.length === 1){
        throw `Error: Missing additional indexes on collection`;
    }
    return;
}

async function searchUsers(searchTerm) {
    validate.checkArgLength(1);
    validate.checkIsEmptyString(searchTerm);
    searchTerm = searchTerm.trim();
    
    let users = await usersCol();
    validateIndex(users);

    let searchObj = {
        $search: searchTerm
    }
    // Added score for sorting by best result later
    let searchResults = await users.find({ $text : searchObj }, { score: { $meta: "textScore" }});
    searchResults = await searchResults.toArray();

    return searchResults;
}

async function searchPosts(searchTerm) {
    validate.checkArgLength(1);
    validate.checkIsEmptyString(searchTerm);
    searchTerm = searchTerm.trim();
    
    let posts = await postsCol();
    validateIndex(posts);

    let searchObj = {
        $search: searchTerm
    }

    // Added score for sorting by best result later
    let searchResults = await posts.find({ $text : searchObj }, { score: { $meta: "textScore" }});
    searchResults = await searchResults.toArray();

    return searchResults;
}



module.exports = {
    searchUsers,
    searchPosts
}
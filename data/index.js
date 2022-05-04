const relationships = require('./relationships');
const postsData = require('./posts');
const users = require('./users');
const chat = require('./chat');
const login_users = require("./loginUsers");

module.exports = {
    users : users,
    relationships: relationships,
    posts: postsData,
    chat: chat,
    login_users: login_users,
};

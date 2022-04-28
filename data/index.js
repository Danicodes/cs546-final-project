const relationships = require('./relationships');
const postsData = require('./posts');
const users = require('./users')

module.exports = {
    users : users,
    relationships: relationships,
    posts: postsData
};

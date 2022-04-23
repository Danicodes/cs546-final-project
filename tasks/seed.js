const relationships = require('./relationships');
const postsSeed = require("./posts");
const usersSeed = require("./users");


relationships();
let main = async function(){
    let userIds = await usersSeed(true);
    console.log(userIds);
    let postIds = await postsSeed(userIds, true);
    console.log(postIds);
};

main();

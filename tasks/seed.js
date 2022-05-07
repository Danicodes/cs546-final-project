const relationships = require('./relationships');
const postsSeed = require("./posts");
const usersSeed = require("./users");

/**
 * True in every call represents - drop the collection before creating
 * False represents - don't drop collection before creating the records
 * If a Collection is not present in the database, 
 *      True cannot be used for that collection
 */
let main = async function(){
    let userIds = await usersSeed(true);
    console.log("Created Users : " + userIds);
    let postIds = await postsSeed(userIds, true);
    console.log(postIds);
    let relationshipsCreated = await relationships(userIds, true);
    console.log(relationshipsCreated);
};

main();

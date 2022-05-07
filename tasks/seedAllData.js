// seedAllData.js
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System.

/*
Database Object Types and target amounts
 - Users: 20
 - Relationships: 10
 - Chats: 10
 - Posts: 25
 - Workspaces: 10

Functions
 - seedUsers
 - seedRelationships (also seeds chats and workspaces)
 - seedPosts
 - seedAllData (runs other seed functions)
*/

// Imports
const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require("mongodb");
const usersCol = mongoCollections.users;
const relationshipsCol = mongoCollections.relationships;
const chatsCol = mongoCollections.chats;
//const workspacesCol = mongoCollections.workspaces;
const postsCol = mongoCollections.posts;



// Seeds users
async function seedUsers(){
    // Create user objects to insert
    let user1 = {
        "name": "General Tso",
        "username": "GeneralTso",
        "password": "xxxxxxxxxx",
        "bio": "Mentor at cooking chicken in the best sauce imaginable.",
    };
    let user2 = {
        "name": "Bob Ross",
        "username": "BobRoss",
        "password": "xxxxxxxxxx",
        "bio": "Let's relax with some painting.",
    };
    let user3 = {
        "name": "Johnny Rocket",
        "username": "JohnnyRocket",
        "password": "xxxxxxxxxx",
        "bio": "As long as the shakes are decent, it doesn't matter if the burgers are mediocre.",
    };
    let user4 = {
        "name": "Chuck Cheese",
        "username": "ChuckECheese",
        "password": "xxxxxxxxxx",
        "bio": "Gambling addiction? No problem! I'll teach you how to win",
    };
    let user5 = {
        "name": "Red Digit",
        "username": "Redigit",
        "password": "xxxxxxxxxx",
        "bio": "Experienced game developer.",
    };
    let user6 = {
        "name": "Lloyd Beige",
        "username": "Lindybeige",
        "password": "xxxxxxxxxx",
        "bio": "Archeologist and generally fun guy.",
    };
    let user7 = {
        "name": "Cooking Noob",
        "username": "CookingNoob",
        "password": "xxxxxxxxxx",
        "bio": "I want to learn about cooking.",
    };
    let user8 = {
        "name": "Painting Newbie",
        "username": "PaintingNewbie",
        "password": "xxxxxxxxxx",
        "bio": "I like painting.",
    };
    let user9 = {
        "name": "Shake Beginner",
        "username": "ShakeBeginner",
        "password": "xxxxxxxxxx",
        "bio": "One time, I tried to shake a cup of milk. It spilled.",
    };
    let user10 = {
        "name": "Slots Addict",
        "username": "SlotsAddict",
        "password": "xxxxxxxxxx",
        "bio": "I'm here to win at gambling.",
    };
    let user11 = {
        "name": "Gaming Enthusiast",
        "username": "GamingEnthusiast",
        "password": "xxxxxxxxxx",
        "bio": "Video games are my passion.",
    };
    let user12 = {
        "name": "Art Fan",
        "username": "ArtFan",
        "password": "xxxxxxxxxx",
        "bio": "Art is great.",
    };
    let user13 = {
        "name": "Sports Fan",
        "username": "SportsFan",
        "password": "xxxxxxxxxx",
        "bio": "Sports are great! I hope someone on here is a mentor in something sports-related.",
    };
    let user14 = {
        "name": "Grandma Basketweaver",
        "username": "GrandmaBasketweaver",
        "password": "xxxxxxxxxx",
        "bio": "My granddaughter told me I should check this site out.",
    };
    let user15 = {
        "name": "Internet Explorer",
        "username": "InternetExporer",
        "password": "xxxxxxxxxx",
        "bio": "#Kony2012",
    };
    let user16 = {
        "name": "Shake Drinker",
        "username": "ShakeDrinker",
        "password": "xxxxxxxxxx",
        "bio": "Glug",
    };
    let user17 = {
        "name": "Magic Paintbrush",
        "username": "MagicPaintbrush",
        "password": "xxxxxxxxxx",
        "bio": "I can't wait to turn rainbow colors and assist on an adventure.",
    };
    let user18 = {
        "name": "Mario Mario",
        "username": "SuperMario",
        "password": "xxxxxxxxxx",
        "bio": "It's a-me.",
    };
    let user19 = {
        "name": "Colonel Sanders",
        "username": "DefinitelyNotKFC",
        "password": "xxxxxxxxxx",
        "bio": "Finger-lickin'-I mean, yum.",
    };
    let user20 = {
        "name": "King Hippo",
        "username": "mkclsarnd",
        "password": "xxxxxxxxxx",
        "bio": ",xclcxlkdsldlkslkdsacxewlkr",
    };
    // Insert user objects
}

// Seeds relationships, chats, and workspaces
async function seedRelationships(){
    // Implement
}

// Seeds posts
async function seedPosts(){
    // Implement
}

// Seeds all data
async function seedAllData(){
    try{
        console.log("Seeding users...");
        await seedUsers();
        console.log("Done seeding users.");
    } catch (e) {
        throw e;
    }
    try{
        console.log("Seeding relationships, chats, and workspaces...");
        await seedRelationships();
        console.log("Done seeding relationships, chats, and workspaces...");
    } catch (e) {
        throw e;
    }
    try{
        console.log("Seeding posts...");
        await seedPosts();
        console.log("Done seeding posts.");
    } catch (e) {
        throw e;
    }
}

async function main(){
    console.log("Seeding data...");
    try{
        await seedAllData();
    } catch (e) {
        console.log("Something went wrong with seeding data. Error below:");
        console.log(e);
    }
    console.log("Done seeding data.");
}

await main();

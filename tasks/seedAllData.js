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
        "age": 67,
        "searchTags": ["Chicken", "Sauce", "Cooking"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user2 = {
        "name": "Bob Ross",
        "username": "BobRoss",
        "password": "xxxxxxxxxx",
        "bio": "Let's relax with some painting.",
        "age": 50,
        "searchTags": ["Painting"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user3 = {
        "name": "Johnny Rocket",
        "username": "JohnnyRocket",
        "password": "xxxxxxxxxx",
        "bio": "As long as the shakes are decent, it doesn't matter if the burgers are mediocre.",
        "age": 80,
        "searchTags": ["Milkshakes", "Shakes", "Restaurant", "Fun"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user4 = {
        "name": "Chuck Cheese",
        "username": "ChuckECheese",
        "password": "xxxxxxxxxx",
        "bio": "Gambling addiction? No problem! I'll teach you how to win",
        "age": 68,
        "searchTags": ["Entertainment", "Gambling", "Mouse", "Fun", "Enjoyment", "Birthday", "Party"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user5 = {
        "name": "Red Digit",
        "username": "Redigit",
        "password": "xxxxxxxxxx",
        "bio": "Experienced game developer.",
        "age": 42,
        "searchTags": ["Fun", "Enjoyment", "Development"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user6 = {
        "name": "Lloyd Beige",
        "username": "Lindybeige",
        "password": "xxxxxxxxxx",
        "bio": "Archeologist and generally fun guy.",
        "age": 35,
        "searchTags": ["Archeology", "Basketweaving"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user7 = {
        "name": "Cooking Noob",
        "username": "CookingNoob",
        "password": "xxxxxxxxxx",
        "bio": "I want to learn about cooking.",
        "age": 18,
        "searchTags": ["Chicken", "Cooking"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user8 = {
        "name": "Painting Newbie",
        "username": "PaintingNewbie",
        "password": "xxxxxxxxxx",
        "bio": "I like painting.",
        "age": 26,
        "searchTags": ["Painting", "Newbie"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user9 = {
        "name": "Shake Beginner",
        "username": "ShakeBeginner",
        "password": "xxxxxxxxxx",
        "bio": "One time, I tried to shake a cup of milk. It spilled.",
        "age": 5,
        "searchTags": ["Milkshakes"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user10 = {
        "name": "Slots Addict",
        "username": "SlotsAddict",
        "password": "xxxxxxxxxx",
        "bio": "I'm here to win at gambling.",
        "age": 51,
        "searchTags": ["Gambling"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user11 = {
        "name": "Gaming Enthusiast",
        "username": "GamingEnthusiast",
        "password": "xxxxxxxxxx",
        "bio": "Video games are my passion.",
        "age": 14,
        "searchTags": ["Gaming", "Fun"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user12 = {
        "name": "Art Fan",
        "username": "ArtFan",
        "password": "xxxxxxxxxx",
        "bio": "Art is great.",
        "age": 34,
        "searchTags": ["Art"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user13 = {
        "name": "Sports Fan",
        "username": "SportsFan",
        "password": "xxxxxxxxxx",
        "bio": "Sports are great! I hope someone on here is a mentor in something sports-related.",
        "age": 37,
        "searchTags": ["Sports", "Football", "Soccer", "Curling"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user14 = {
        "name": "Grandma Basketweaver",
        "username": "GrandmaBasketweaver",
        "password": "xxxxxxxxxx",
        "bio": "My granddaughter told me I should check this site out.",
        "age": 83,
        "searchTags": ["Basketweaving"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user15 = {
        "name": "Internet Explorer",
        "username": "InternetExporer",
        "password": "xxxxxxxxxx",
        "bio": "#Kony2012",
        "age": 21,
        "searchTags": ["Fast", "Internet", "Explorer", "Enjoyment"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user16 = {
        "name": "Shake Drinker",
        "username": "ShakeDrinker",
        "password": "xxxxxxxxxx",
        "bio": "Glug",
        "age": 22,
        "searchTags": ["Shakes"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user17 = {
        "name": "Magic Paintbrush",
        "username": "MagicPaintbrush",
        "password": "xxxxxxxxxx",
        "bio": "I can't wait to turn rainbow colors and assist on an adventure.",
        "age": 15,
        "searchTags": ["Painting"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user18 = {
        "name": "Mario Mario",
        "username": "SuperMario",
        "password": "xxxxxxxxxx",
        "bio": "It's a-me.",
        "age": 36,
        "searchTags": ["Mario", "SuperMario"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user19 = {
        "name": "Colonel Sanders",
        "username": "DefinitelyNotKFC",
        "password": "xxxxxxxxxx",
        "bio": "Yum yum chicken.",
        "age": 55,
        "searchTags": ["Chicken"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };
    let user20 = {
        "name": "King Hippo",
        "username": "mkclsarnd",
        "password": "xxxxxxxxxx",
        "bio": ",xclcxlkdsldlkslkdsacxewlkr",
        "age": 32,
        "searchTags": [],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [] // Updated later in the posts seeding function
    };

    // Insert user objects
    const usersCollection = await usersCol();

    const insertInfo1 = await usersCollection.insertOne(user1);
    if(!insertInfo1.acknowledged || !insertInfo1.insertedId) throw "Could not insert user 1";
    const insertInfo2 = await usersCollection.insertOne(user2);
    if(!insertInfo2.acknowledged || !insertInfo2.insertedId) throw "Could not insert user 2";
    const insertInfo3 = await usersCollection.insertOne(user3);
    if(!insertInfo3.acknowledged || !insertInfo3.insertedId) throw "Could not insert user 3";
    const insertInfo4 = await usersCollection.insertOne(user4);
    if(!insertInfo4.acknowledged || !insertInfo4.insertedId) throw "Could not insert user 4";
    const insertInfo5 = await usersCollection.insertOne(user5);
    if(!insertInfo5.acknowledged || !insertInfo5.insertedId) throw "Could not insert user 5";
    const insertInfo6 = await usersCollection.insertOne(user6);
    if(!insertInfo6.acknowledged || !insertInfo6.insertedId) throw "Could not insert user 6";
    const insertInfo7 = await usersCollection.insertOne(user7);
    if(!insertInfo7.acknowledged || !insertInfo7.insertedId) throw "Could not insert user 7";
    const insertInfo8 = await usersCollection.insertOne(user8);
    if(!insertInfo8.acknowledged || !insertInfo8.insertedId) throw "Could not insert user 8";
    const insertInfo9 = await usersCollection.insertOne(user9);
    if(!insertInfo9.acknowledged || !insertInfo9.insertedId) throw "Could not insert user 9";
    const insertInfo10 = await usersCollection.insertOne(user10);
    if(!insertInfo10.acknowledged || !insertInfo10.insertedId) throw "Could not insert user 10";
    const insertInfo11 = await usersCollection.insertOne(user11);
    if(!insertInfo11.acknowledged || !insertInfo11.insertedId) throw "Could not insert user 11";
    const insertInfo12 = await usersCollection.insertOne(user12);
    if(!insertInfo12.acknowledged || !insertInfo12.insertedId) throw "Could not insert user 12";
    const insertInfo13 = await usersCollection.insertOne(user13);
    if(!insertInfo13.acknowledged || !insertInfo13.insertedId) throw "Could not insert user 13";
    const insertInfo14 = await usersCollection.insertOne(user14);
    if(!insertInfo14.acknowledged || !insertInfo14.insertedId) throw "Could not insert user 14";
    const insertInfo15 = await usersCollection.insertOne(user15);
    if(!insertInfo15.acknowledged || !insertInfo15.insertedId) throw "Could not insert user 15";
    const insertInfo16 = await usersCollection.insertOne(user16);
    if(!insertInfo16.acknowledged || !insertInfo16.insertedId) throw "Could not insert user 16";
    const insertInfo17 = await usersCollection.insertOne(user17);
    if(!insertInfo17.acknowledged || !insertInfo17.insertedId) throw "Could not insert user 17";
    const insertInfo18 = await usersCollection.insertOne(user18);
    if(!insertInfo18.acknowledged || !insertInfo18.insertedId) throw "Could not insert user 18";
    const insertInfo19 = await usersCollection.insertOne(user19);
    if(!insertInfo19.acknowledged || !insertInfo19.insertedId) throw "Could not insert user 19";
    const insertInfo20 = await usersCollection.insertOne(user20);
    if(!insertInfo20.acknowledged || !insertInfo20.insertedId) throw "Could not insert user 20";
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

main();

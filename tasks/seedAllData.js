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
    const usersCollection = await usersCol();
    const relationshipsCollection = await relationshipsCol();
    //const workspacesCollection = await workspacesCol();
    const chatsCollection = await chatsCol();

    // Get users
    const user1 = await usersCollection.findOne({"name": "General Tso"});
    if(!user1) throw "Could not get user 1 when seeding relationships.";
    let user1id = user1["_id"];
    const user2 = await usersCollection.findOne({"name": "Bob Ross"});
    if(!user2) throw "Could not get user 2 when seeding relationships.";
    let user2id = user2["_id"];
    const user3 = await usersCollection.findOne({"name": "Johnny Rocket"});
    if(!user3) throw "Could not get user 3 when seeding relationships.";
    let user3id = user3["_id"];
    const user4 = await usersCollection.findOne({"name": "Chuck Cheese"});
    if(!user4) throw "Could not get user 4 when seeding relationships.";
    let user4id = user4["_id"];
    const user5 = await usersCollection.findOne({"name": "Red Digit"});
    if(!user5) throw "Could not get user 5 when seeding relationships.";
    let user5id = user5["_id"];
    //const user6 = await usersCollection.findOne({"name": "Lloyd Beige"});
    //if(!user6) throw "Could not get user 6 when seeding relationships.";
    //let user6id = user6["_id"];
    const user7 = await usersCollection.findOne({"name": "Cooking Noob"});
    if(!user7) throw "Could not get user 7 when seeding relationships.";
    let user7id = user7["_id"];
    const user8 = await usersCollection.findOne({"name": "Painting Newbie"});
    if(!user8) throw "Could not get user 8 when seeding relationships.";
    let user8id = user8["_id"];
    const user9 = await usersCollection.findOne({"name": "Shake Beginner"});
    if(!user9) throw "Could not get user 9 when seeding relationships.";
    let user9id = user9["_id"];
    const user10 = await usersCollection.findOne({"name": "Slots Addict"});
    if(!user10) throw "Could not get user 10 when seeding relationships.";
    let user10id = user10["_id"];
    const user11 = await usersCollection.findOne({"name": "Gaming Enthusiast"});
    if(!user11) throw "Could not get user 11 when seeding relationships.";
    let user11id = user11["_id"];
    const user12 = await usersCollection.findOne({"name": "Art Fan"});
    if(!user12) throw "Could not get user 12 when seeding relationships.";
    let user12id = user12["_id"];
    //const user13 = await usersCollection.findOne({"name": "Sports Fan"});
    //if(!user13) throw "Could not get user 13 when seeding relationships.";
    //let user13id = user13["_id"];
    //const user14 = await usersCollection.findOne({"name": "Grandma Basketweaver"});
    //if(!user14) throw "Could not get user 14 when seeding relationships.";
    //let user14id = user14["_id"];
    //const user15 = await usersCollection.findOne({"name": "Internet Explorer"});
    //if(!user15) throw "Could not get user 15 when seeding relationships.";
    //let user15id = user15["_id"];
    const user16 = await usersCollection.findOne({"name": "Shake Drinker"});
    if(!user16) throw "Could not get user 16 when seeding relationships.";
    let user16id = user16["_id"];
    const user17 = await usersCollection.findOne({"name": "Magic Paintbrush"});
    if(!user17) throw "Could not get user 17 when seeding relationships.";
    let user17id = user17["_id"];
    const user18 = await usersCollection.findOne({"name": "Mario Mario"});
    if(!user18) throw "Could not get user 18 when seeding relationships.";
    let user18id = user18["_id"];
    const user19 = await usersCollection.findOne({"name": "Colonel Sanders"});
    if(!user19) throw "Could not get user 19 when seeding relationships.";
    let user19id = user19["_id"];
    //const user20 = await usersCollection.findOne({"name": "King Hippo"});
    //if(!user20) throw "Could not get user 20 when seeding relationships.";
    //let user20id = user20["_id"];


    // Relationship 1: 1->7 PENDING
    let chat1 = {
        "messages": [
            {
                "author": user7id,
                "message": "I would like to learn your ways of cooking chicken with your special sauce.",
                "Datetime": new Date()
            },
            {
                "author": user7id,
                "message": "Please?",
                "Datetime": new Date()
            }
        ]
    }
    let relationship1 = {
        "relationshipDescription": "Cooking Noob wants to learn the ways of cooking chicken from General Tso.",
        "mentor": user1id,
        "mentor": user7id,
        "workspace": new ObjectId(), // PLACEHOLDER
        "status": "PENDING",
        "createdOn": new Date(),
        "updatedOn": new Date(),
    }
    // Relationship 2: 2->8 ACTIVE
    let chat2 = {
        "messages": []
    }
    let relationship2 = {
        "relationshipDescription": "A newbie at painting is learning from Bob Ross.",
        "mentor": user2id,
        "mentor": user8id,
        "workspace": new ObjectId(), // PLACEHOLDER
        "status": "ACTIVE",
        "createdOn": new Date(),
        "updatedOn": new Date(),
    }
    // Relationship 3: 3->9 REJECTED
    let chat3 = {
        "messages": []
    }
    let relationship3 = {
        "relationshipDescription": "Some kid wants to learn how to make better shakes from Johnny Rocket.",
        "mentor": user3id,
        "mentor": user9id,
        "workspace": new ObjectId(), // PLACEHOLDER
        "status": "REJECTED",
        "createdOn": new Date(),
        "updatedOn": new Date(),
    }
    // Relationship 4: 4->10 COMPLETED
    let chat4 = {
        "messages": []
    }
    let relationship4 = {
        "relationshipDescription": "A slots addict became more addicted to gambling after Chuck E Cheese apparently taught him how to win.",
        "mentor": user4id,
        "mentor": user10id,
        "workspace": new ObjectId(), // PLACEHOLDER
        "status": "COMPLETED",
        "createdOn": new Date(),
        "updatedOn": new Date(),
    }
    // Relationship 5: 5->11 PENDING
    let chat5 = {
        "messages": []
    }
    let relationship5 = {
        "relationshipDescription": "A gaming enthusiast wants to learn how to make their own game from an experienced developer.",
        "mentor": user5id,
        "mentor": user11id,
        "workspace": new ObjectId(), // PLACEHOLDER
        "status": "PENDING",
        "createdOn": new Date(),
        "updatedOn": new Date(),
    }
    // Relationship 6: 2->12 ACTIVE
    let chat6 = {
        "messages": []
    }
    let relationship6 = {
        "relationshipDescription": "An art fan is learning how to paint from Bob Ross",
        "mentor": user2id,
        "mentor": user12id,
        "workspace": new ObjectId(), // PLACEHOLDER
        "status": "ACTIVE",
        "createdOn": new Date(),
        "updatedOn": new Date(),
    }
    // Relationship 7: 3->16 ACTIVE
    let chat7 = {
        "messages": []
    }
    let relationship7 = {
        "relationshipDescription": "A shake drinker is learning how to make better shakes from Johnny Rocket.",
        "mentor": user3id,
        "mentor": user16id,
        "workspace": new ObjectId(), // PLACEHOLDER
        "status": "ACTIVE",
        "createdOn": new Date(),
        "updatedOn": new Date(),
    }
    // Relationship 8: 2->17 REJECTED
    let chat8 = {
        "messages": []
    }
    let relationship8 = {
        "relationshipDescription": "Bob Ross couldn't bear to teach a literal paintbrush how to paint better.",
        "mentor": user2id,
        "mentor": user17id,
        "workspace": new ObjectId(), // PLACEHOLDER
        "status": "REJECTED",
        "createdOn": new Date(),
        "updatedOn": new Date(),
    }
    // Relationship 9: 2->18 COMPLETED
    let chat9 = {
        "messages": []
    }
    let relationship9 = {
        "relationshipDescription": "Super Mario learned how to paint from Bob Ross, then starred in Mario Artist.",
        "mentor": user2id,
        "mentor": user18id,
        "workspace": new ObjectId(), // PLACEHOLDER
        "status": "COMPLETED",
        "createdOn": new Date(),
        "updatedOn": new Date(),
    }
    // Relationship 10: 1->19 ACTIVE
    let chat10 = {
        "messages": []
    }
    let relationship10 = {
        "relationshipDescription": "Colonel Sanders is learning new techniques in chicken cooking from General Tso.",
        "mentor": user1id,
        "mentor": user19id,
        "workspace": new ObjectId(), // PLACEHOLDER
        "status": "ACTIVE",
        "createdOn": new Date(),
        "updatedOn": new Date(),
    }
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

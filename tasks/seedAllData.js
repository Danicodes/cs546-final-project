// seedAllData.js
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System.


/*
How to use this file

Execute the following command in the command line: node seedAllData.js

This will seed 20 users, 10 relationships (and their corresponding chat channels), 25 posts, and necessary indexes
*/


// Parts of this file were copied from Yash's code in other seeding files


/*
Functions in this file
 - seedUsers
 - seedRelationships (also seeds chats)
 - seedPosts
 - dropIndexes (coped from another file)
 - addIndexes (copied from another file)
 - seedAllData (runs other seed functions)
*/


// Imports
const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require("mongodb");
const usersCol = mongoCollections.users;
const relationshipsCol = mongoCollections.relationships;
const chatsCol = mongoCollections.chats;
const postsCol = mongoCollections.posts;
const getUsersCollection = mongoCollections.users;
const getPostsCollection = mongoCollections.posts;
const Category = require('../enums/categories');
const status = require('../enums/status');
const data = require('../data');
const { fs } = require('file-system');
const bcrypt = require('bcrypt');

let relationshipsData = data.relationships;
let placeholderfile = "/uploads/placeholder.txt";
let password = "password";


// Seeds users
async function seedUsers(){
    let passwordHash = await bcrypt.hash(password, 8); // Update from constants file when Brendans changes are integrated
    // Create user objects to insert
    let user1 = {
        "name": "General Tso",
        "username": "GeneralTso".toLowerCase(),
        "password": passwordHash,
        "age": 67,
        "searchTags": ["Chicken", "Sauce", "Cooking"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "Not a mentee, but I used to be.",
        "mentorBio": "Mentor at cooking chicken in the best sauce imaginable.",
        "myPreferredFeed": "Chicken"
    };
    let user2 = {
        "name": "Bob Ross",
        "username": "BobRoss".toLowerCase(),
        "password": passwordHash,
        "age": 50,
        "searchTags": ["Painting"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "Not a mentee for anything now, but I may take up something later.",
        "mentorBio": "Let's relax with some painting.",
        "myPreferredFeed": "Painting"
    };
    let user3 = {
        "name": "Johnny Rocket",
        "username": "JohnnyRocket".toLowerCase(),
        "password": passwordHash,
        "age": 80,
        "searchTags": ["Milkshakes", "Shakes", "Restaurant", "Fun"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "Haven't been a mentee for a long time.",
        "mentorBio": "As long as the shakes are decent, it doesn't matter if the burgers are mediocre.",
        "myPreferredFeed": "Milkshakes"
    };
    let user4 = {
        "name": "Chuck Cheese",
        "username": "ChuckECheese".toLowerCase(),
        "password": passwordHash,
        "age": 68,
        "searchTags": ["Entertainment", "Gambling", "Mouse", "Fun", "Enjoyment", "Birthday", "Party"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "No need to be a mentee when I can help others get more addicted to gambling.",
        "mentorBio": "Gambling addiction? No problem! I'll teach you how to win",
        "myPreferredFeed": "Fun"
    };
    let user5 = {
        "name": "Red Digit",
        "username": "Redigit".toLowerCase(),
        "password": passwordHash,
        "age": 42,
        "searchTags": ["Fun", "Enjoyment", "Development"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "Not a mentee myself, but a mentee in spirit",
        "mentorBio": "Experienced game developer.",
        "myPreferredFeed": "Gaming"
    };
    let user6 = {
        "name": "Lloyd Beige",
        "username": "Lindybeige".toLowerCase(),
        "password": passwordHash,
        "age": 35,
        "searchTags": ["Archeology", "Basketweaving"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "Probably going to be a mentee in the future, but not at the moment.",
        "mentorBio": "Archeologist and generally fun guy.",
        "myPreferredFeed": "Hobbies"
    };
    let user7 = {
        "name": "Cooking Noob",
        "username": "CookingNoob".toLowerCase(),
        "password": passwordHash,
        "age": 18,
        "searchTags": ["Chicken", "Cooking"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "I want to learn about cooking",
        "mentorBio": "Not a mentor yet, but once I learn enough about cooking, I may teach others.",
        "myPreferredFeed": "Cooking"
    };
    let user8 = {
        "name": "Painting Newbie",
        "username": "PaintingNewbie".toLowerCase(),
        "password": passwordHash,
        "age": 26,
        "searchTags": ["Painting", "Newbie"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "I like painting.",
        "mentorBio": "Not a mentor. I don't have skills",
        "myPreferredFeed": "Painting"
    };
    let user9 = {
        "name": "Shake Beginner",
        "username": "ShakeBeginner".toLowerCase(),
        "password": passwordHash,
        "age": 5,
        "searchTags": ["Milkshakes"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "One time, I tried to shake a cup of milk. It spilled.",
        "mentorBio": "I can totally do everything",
        "myPreferredFeed": "Milkshakes"
    };
    let user10 = {
        "name": "Slots Addict",
        "username": "SlotsAddict".toLowerCase(),
        "password": passwordHash,
        "age": 51,
        "searchTags": ["Gambling"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "I'm here to win at gambling.",
        "mentorBio": "Some day I'll teach you all how to get rich.",
        "myPreferredFeed": "Gambling"
    };
    let user11 = {
        "name": "Gaming Enthusiast",
        "username": "GamingEnthusiast".toLowerCase(),
        "password": passwordHash,
        "age": 14,
        "searchTags": ["Gaming", "Fun"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "Video games are my passion.",
        "mentorBio": "I'll get really good at games, but I'm not mentoring that",
        "myPreferredFeed": "Gaming"
    };
    let user12 = {
        "name": "Art Fan",
        "username": "ArtFan".toLowerCase(),
        "password": passwordHash,
        "age": 34,
        "searchTags": ["Art"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "Art is great.",
        "mentorBio": "I could teach others how to be better art fans, but I wouldn't recommend that.",
        "myPreferredFeed": "Art"
    };
    let user13 = {
        "name": "Sports Fan",
        "username": "SportsFan".toLowerCase(),
        "password": passwordHash,
        "age": 37,
        "searchTags": ["Sports", "Football", "Soccer", "Curling"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "Sports are great! I hope someone on here is a mentor in something sports-related.",
        "mentorBio": "Is there anyone on here that wants to learn about curling?",
        "myPreferredFeed": "Sports"
    };
    let user14 = {
        "name": "Grandma Basketweaver",
        "username": "GrandmaBasketweaver".toLowerCase(),
        "password": passwordHash,
        "age": 83,
        "searchTags": ["Basketweaving"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "My granddaughter told me I should check this site out.",
        "mentorBio": "No mentoring for me yet",
        "myPreferredFeed": "Hobbies"
    };
    let user15 = {
        "name": "Internet Explorer",
        "username": "InternetExporer".toLowerCase(),
        "password": passwordHash,
        "age": 21,
        "searchTags": ["Fast", "Internet", "Explorer", "Enjoyment"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "#Kony2012",
        "mentorBio": "#Kony2012",
        "myPreferredFeed": "SoftwareDevelopment"
    };
    let user16 = {
        "name": "Shake Drinker",
        "username": "ShakeDrinker".toLowerCase(),
        "password": passwordHash,
        "age": 22,
        "searchTags": ["Shakes"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "Glug",
        "mentorBio": "I can teach you to chug drinks faster.",
        "myPreferredFeed": "Milkshakes"
    };
    let user17 = {
        "name": "Magic Paintbrush",
        "username": "MagicPaintbrush".toLowerCase(),
        "password": passwordHash,
        "age": 15,
        "searchTags": ["Painting"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "I can't wait to turn rainbow colors and assist on an adventure.",
        "mentorBio": "Who wants to turn into a literal paintbrush?",
        "myPreferredFeed": "Painting"
    };
    let user18 = {
        "name": "Mario Mario",
        "username": "SuperMario".toLowerCase(),
        "password": passwordHash,
        "age": 36,
        "searchTags": ["Mario", "SuperMario"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "It's a-me.",
        "mentorBio": "Thank you so much for playing my games!",
        "myPreferredFeed": "Gaming"
    };
    let user19 = {
        "name": "Colonel Sanders",
        "username": "DefinitelyNotKFC".toLowerCase(),
        "password": passwordHash,
        "age": 55,
        "searchTags": ["Chicken"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": "Yum yum chicken.",
        "mentorBio": "Eat at KFC",
        "myPreferredFeed": "Chicken"
    };
    let user20 = {
        "name": "King Hippo",
        "username": "mkclsarnd".toLowerCase(),
        "password": passwordHash,
        "age": 32,
        "searchTags": [],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [],
        "menteeBio": ",xclcxlkdsldlkslkdsacxewlkr",
        "mentorBio": "kjcsaxlkxaelknx",
        "myPreferredFeed": "Help"
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

// Seeds relationships and chats
// Run this function AFTER the seedUsers function
async function seedRelationships(){
    const usersCollection = await usersCol();
    const relationshipsCollection = await relationshipsCol();
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
    const chatInfo1 = await chatsCollection.insertOne(chat1);
    if(!chatInfo1.acknowledged || !chatInfo1.insertedId) throw "Could not insert chat 1 when seeding chats and relationships.";
    let relationship1 = {
        "relationshipDescription": "Cooking Noob wants to learn the ways of cooking chicken from General Tso.",
        "mentor": user1id,
        "mentor": user7id,
        "status": status.PENDING,
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "relationshipCategory": Category.get("Cooking"),
        "chatChannel": chatInfo1.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }
    const relInfo1 = await relationshipsCollection.insertOne(relationship1);
    if(!relInfo1.acknowledged || !relInfo1.insertedId) throw "Could not insert relationship 1 when seeding relationships";
    const userInfo1_7 = await usersCollection.updateOne({"_id": user1id}, {"$push": {"mentorRelations": relInfo1.insertedId}});
    if(!userInfo1_7.acknowledged) throw "Could not update user 1 when seeding relationships";
    const userInfo7_1 = await usersCollection.updateOne({"_id": user7id}, {"$push": {"menteeRelations": relInfo1.insertedId}});
    if(!userInfo7_1.acknowledged) throw "Could not update user 7 when seeding relationships";

    // Relationship 2: 2->8 APPROVED
    let chat2 = {
        "messages": [
            {
                "author": user8id,
                "message": "I really want to learn how to paint better.",
                "Datetime": new Date()
            },
            {
                "author": user2id,
                "message": "Let's get to painting, then!",
                "Datetime": new Date()
            },
            {
                "author": user8id,
                "message": "You're my hero",
                "Datetime": new Date()
            }
        ]
    }
    const chatInfo2 = await chatsCollection.insertOne(chat2);
    if(!chatInfo2.acknowledged || !chatInfo2.insertedId) throw "Could not insert chat 2 when seeding chats and relationships.";
    let relationship2 = {
        "relationshipDescription": "A newbie at painting is learning from Bob Ross.",
        "mentor": user2id,
        "mentor": user8id,
        "status": status.APPROVED,
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "relationshipCategory": Category.get("Painting"),
        "chatChannel": chatInfo2.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }
    const relInfo2 = await relationshipsCollection.insertOne(relationship2);
    if(!relInfo2.acknowledged || !relInfo2.insertedId) throw "Could not insert relationship 2 when seeding relationships";
    const userInfo2_8 = await usersCollection.updateOne({"_id": user2id}, {"$push": {"mentorRelations": relInfo2.insertedId}});
    if(!userInfo2_8.acknowledged) throw "Could not update user 2 when seeding relationships";
    const userInfo8_2 = await usersCollection.updateOne({"_id": user8id}, {"$push": {"menteeRelations": relInfo2.insertedId}});
    if(!userInfo8_2.acknowledged) throw "Could not update user 8 when seeding relationships";

    // Relationship 3: 3->9 REJECTED
    let chat3 = {
        "messages": [
            {
                "author": user9id,
                "message": "Can you mentor me so that I don't spill shakes when I try to make them?",
                "Datetime": new Date()
            },
            {
                "author": user9id,
                "message": "Please?",
                "Datetime": new Date()
            },
            {
                "author": user9id,
                "message": "Please?",
                "Datetime": new Date()
            },
            {
                "author": user9id,
                "message": "Please?",
                "Datetime": new Date()
            },
            {
                "author": user9id,
                "message": "Please?",
                "Datetime": new Date()
            },
            {
                "author": user9id,
                "message": "Please?",
                "Datetime": new Date()
            }
        ]
    }
    const chatInfo3 = await chatsCollection.insertOne(chat3);
    if(!chatInfo3.acknowledged || !chatInfo3.insertedId) throw "Could not insert chat 3 when seeding chats and relationships.";
    let relationship3 = {
        "relationshipDescription": "Some kid wants to learn how to make better shakes from Johnny Rocket.",
        "mentor": user3id,
        "mentor": user9id,
        "status": status.REJECTED,
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "relationshipCategory": Category.get("Cooking"),
        "chatChannel": chatInfo3.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }
    const relInfo3 = await relationshipsCollection.insertOne(relationship3);
    if(!relInfo3.acknowledged || !relInfo3.insertedId) throw "Could not insert relationship 3 when seeding relationships";
    const userInfo3_9 = await usersCollection.updateOne({"_id": user3id}, {"$push": {"mentorRelations": relInfo3.insertedId}});
    if(!userInfo3_9.acknowledged) throw "Could not update user 3 when seeding relationships";
    const userInfo9_3 = await usersCollection.updateOne({"_id": user9id}, {"$push": {"menteeRelations": relInfo3.insertedId}});
    if(!userInfo9_3.acknowledged) throw "Could not update user 9 when seeding relationships";

    // Relationship 4: 4->10 COMPLETED
    let chat4 = {
        "messages": [
            {
                "author": user10id,
                "message": "I want to get better at gambling so I win money from it instead of losing every paycheck.",
                "Datetime": new Date()
            },
            {
                "author": user4id,
                "message": "Perfect! We can get to work on that!",
                "Datetime": new Date()
            },
            {
                "author": user10id,
                "message": "So what do I do to win?",
                "Datetime": new Date()
            },
            {
                "author": user4id,
                "message": "Play more. That way, you'll have a higher chance of winning.",
                "Datetime": new Date()
            },
            {
                "author": user10id,
                "message": "That's awesome! I'll gamble more so I can win more! That sounds great!",
                "Datetime": new Date()
            },
            {
                "author": user10id,
                "message": "Thanks, Mr. Cheese! You're the best influence ever.",
                "Datetime": new Date()
            },
            {
                "author": user4id,
                "message": "No problem! Hehe",
                "Datetime": new Date()
            }
        ]
    }
    const chatInfo4 = await chatsCollection.insertOne(chat4);
    if(!chatInfo4.acknowledged || !chatInfo4.insertedId) throw "Could not insert chat 4 when seeding chats and relationships.";
    let relationship4 = {
        "relationshipDescription": "A slots addict became more addicted to gambling after Chuck E Cheese apparently taught him how to win.",
        "mentor": user4id,
        "mentor": user10id,
        "status": status.COMPLETED,
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "relationshipCategory": Category.get("Gambling"),
        "chatChannel": chatInfo4.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }
    const relInfo4 = await relationshipsCollection.insertOne(relationship4);
    if(!relInfo4.acknowledged || !relInfo4.insertedId) throw "Could not insert relationship 4 when seeding relationships";
    const userInfo4_10 = await usersCollection.updateOne({"_id": user4id}, {"$push": {"mentorRelations": relInfo4.insertedId}});
    if(!userInfo4_10.acknowledged) throw "Could not update user 4 when seeding relationships";
    const userInfo10_4 = await usersCollection.updateOne({"_id": user10id}, {"$push": {"menteeRelations": relInfo4.insertedId}});
    if(!userInfo10_4.acknowledged) throw "Could not update user 10 when seeding relationships";

    // Relationship 5: 5->11 PENDING
    let chat5 = {
        "messages": [
            {
                "author": user11id,
                "message": "I want to learn how to make my own game since I love video games so much.",
                "Datetime": new Date()
            }
        ]
    }
    const chatInfo5 = await chatsCollection.insertOne(chat5);
    if(!chatInfo5.acknowledged || !chatInfo5.insertedId) throw "Could not insert chat 5 when seeding chats and relationships.";
    let relationship5 = {
        "relationshipDescription": "A gaming enthusiast wants to learn how to make their own game from an experienced developer.",
        "mentor": user5id,
        "mentor": user11id,
        "status": status.PENDING,
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "relationshipCategory": Category.get("Game Design"),
        "chatChannel": chatInfo5.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }
    const relInfo5 = await relationshipsCollection.insertOne(relationship5);
    if(!relInfo5.acknowledged || !relInfo5.insertedId) throw "Could not insert relationship 5 when seeding relationships";
    const userInfo5_11 = await usersCollection.updateOne({"_id": user5id}, {"$push": {"mentorRelations": relInfo5.insertedId}});
    if(!userInfo5_11.acknowledged) throw "Could not update user 5 when seeding relationships";
    const userInfo11_5 = await usersCollection.updateOne({"_id": user11id}, {"$push": {"menteeRelations": relInfo5.insertedId}});
    if(!userInfo11_5.acknowledged) throw "Could not update user 11 when seeding relationships";

    // Relationship 6: 2->12 APPROVED
    let chat6 = {
        "messages": [
            {
                "author": user12id,
                "message": "I can't believe I'm learning how to paint! It's great!",
                "Datetime": new Date()
            },
            {
                "author": user2id,
                "message": "Painting is awesome.",
                "Datetime": new Date()
            },
            {
                "author": user12id,
                "message": "So, how can I paint better?",
                "Datetime": new Date()
            },
            {
                "author": user2id,
                "message": "Paint more often, and the experience you gain will help you improve.",
                "Datetime": new Date()
            },
            {
                "author": user12id,
                "message": "Oh, ok! That's inspirational. I'll keep trying.",
                "Datetime": new Date()
            },
            {
                "author": user2id,
                "message": "Let me know when you've gotten better at painting.",
                "Datetime": new Date()
            }
        ]
    }
    const chatInfo6 = await chatsCollection.insertOne(chat6);
    if(!chatInfo6.acknowledged || !chatInfo6.insertedId) throw "Could not insert chat 6 when seeding chats and relationships.";
    let relationship6 = {
        "relationshipDescription": "An art fan is learning how to paint from Bob Ross",
        "mentor": user2id,
        "mentor": user12id,
        "status": status.APPROVED,
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "relationshipCategory": Category.get("Painting"),
        "chatChannel": chatInfo6.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }
    const relInfo6 = await relationshipsCollection.insertOne(relationship6);
    if(!relInfo6.acknowledged || !relInfo6.insertedId) throw "Could not insert relationship 6 when seeding relationships";
    const userInfo2_12 = await usersCollection.updateOne({"_id": user2id}, {"$push": {"mentorRelations": relInfo6.insertedId}});
    if(!userInfo2_12.acknowledged) throw "Could not update user 2 when seeding relationships";
    const userInfo12_2 = await usersCollection.updateOne({"_id": user12id}, {"$push": {"menteeRelations": relInfo6.insertedId}});
    if(!userInfo12_2.acknowledged) throw "Could not update user 12 when seeding relationships";

    // Relationship 7: 3->16 APPROVED
    let chat7 = {
        "messages": [
            {
                "author": user16id,
                "message": "I love shakes! Can you mentor me so I can work on making better ones?",
                "Datetime": new Date()
            },
            {
                "author": user3id,
                "message": "Sure!",
                "Datetime": new Date()
            }
        ]
    }
    const chatInfo7 = await chatsCollection.insertOne(chat7);
    if(!chatInfo7.acknowledged || !chatInfo7.insertedId) throw "Could not insert chat 7 when seeding chats and relationships.";
    let relationship7 = {
        "relationshipDescription": "A shake drinker is learning how to make better shakes from Johnny Rocket.",
        "mentor": user3id,
        "mentor": user16id,
        "status": status.APPROVED,
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "relationshipCategory": Category.get("Cooking"),
        "chatChannel": chatInfo7.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }
    const relInfo7 = await relationshipsCollection.insertOne(relationship7);
    if(!relInfo7.acknowledged || !relInfo7.insertedId) throw "Could not insert relationship 7 when seeding relationships";
    const userInfo3_16 = await usersCollection.updateOne({"_id": user3id}, {"$push": {"mentorRelations": relInfo7.insertedId}});
    if(!userInfo3_16.acknowledged) throw "Could not update user 3 when seeding relationships";
    const userInfo16_3 = await usersCollection.updateOne({"_id": user16id}, {"$push": {"menteeRelations": relInfo7.insertedId}});
    if(!userInfo16_3.acknowledged) throw "Could not update user 16 when seeding relationships";


    /// ADD FILES FOR RELATIONSHIP


   async function copyFileToRelationship(relationshipID){
        if (fs.existsSync(placeholderfile)){
            await relationshipsData.uploadfile(relationshipID, placeholderfile);
        }
   }
   await copyFileToRelationship(relInfo7.insertedId);
   await copyFileToRelationship(relInfo6.insertedId);

    // Relationship 8: 2->17 REJECTED
    let chat8 = {
        "messages": []
    }
    const chatInfo8 = await chatsCollection.insertOne(chat8);
    if(!chatInfo8.acknowledged || !chatInfo8.insertedId) throw "Could not insert chat 8 when seeding chats and relationships.";
    let relationship8 = {
        "relationshipDescription": "Bob Ross couldn't bear to teach a literal paintbrush how to paint better.",
        "mentor": user2id,
        "mentor": user17id,
        "status": status.REJECTED,
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "relationshipCategory": Category.get("Painting"),
        "chatChannel": chatInfo8.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }
    const relInfo8 = await relationshipsCollection.insertOne(relationship8);
    if(!relInfo8.acknowledged || !relInfo8.insertedId) throw "Could not insert relationship 8 when seeding relationships";
    const userInfo2_17 = await usersCollection.updateOne({"_id": user2id}, {"$push": {"mentorRelations": relInfo8.insertedId}});
    if(!userInfo2_17.acknowledged) throw "Could not update user 2 when seeding relationships";
    const userInfo17_2 = await usersCollection.updateOne({"_id": user17id}, {"$push": {"menteeRelations": relInfo8.insertedId}});
    if(!userInfo17_2.acknowledged) throw "Could not update user 17 when seeding relationships";

    // Relationship 9: 2->18 COMPLETED
    let chat9 = {
        "messages": [
            {
                "author": user18id,
                "message": "Pizza pizza pasta pasta!",
                "Datetime": new Date()
            },
            {
                "author": user18id,
                "message": "It's a-me, and I want to learn painting!",
                "Datetime": new Date()
            },
            {
                "author": user2id,
                "message": "You can paint however you like!",
                "Datetime": new Date()
            },
            {
                "author": user18id,
                "message": "That's a-great! I'll try it in games!",
                "Datetime": new Date()
            },
            {
                "author": user2id,
                "message": "Good idea, Mario. Keep on doing things your way.",
                "Datetime": new Date()
            },
            {
                "author": user18id,
                "message": "Wahoo!",
                "Datetime": new Date()
            }
        ]
    }
    const chatInfo9 = await chatsCollection.insertOne(chat9);
    if(!chatInfo9.acknowledged || !chatInfo9.insertedId) throw "Could not insert chat 9 when seeding chats and relationships.";
    let relationship9 = {
        "relationshipDescription": "Super Mario learned how to paint from Bob Ross, then starred in Mario Artist.",
        "mentor": user2id,
        "mentor": user18id,
        "status": status.COMPLETED,
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "relationshipCategory": Category.get("Painting"),
        "chatChannel": chatInfo9.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }
    const relInfo9 = await relationshipsCollection.insertOne(relationship9);
    if(!relInfo9.acknowledged || !relInfo9.insertedId) throw "Could not insert relationship 9 when seeding relationships";
    const userInfo2_18 = await usersCollection.updateOne({"_id": user2id}, {"$push": {"mentorRelations": relInfo9.insertedId}});
    if(!userInfo2_18.acknowledged) throw "Could not update user 2 when seeding relationships";
    const userInfo18_2 = await usersCollection.updateOne({"_id": user18id}, {"$push": {"menteeRelations": relInfo9.insertedId}});
    if(!userInfo18_2.acknowledged) throw "Could not update user 18 when seeding relationships";

    // Relationship 10: 1->19 APPROVED
    let chat10 = {
        "messages": [
            {
                "author": user19id,
                "message": "I want to improve my chicken recipe.",
                "Datetime": new Date()
            },
            {
                "author": user1id,
                "message": "This sounds like a worthy cause. I'll help you.",
                "Datetime": new Date()
            },
            {
                "author": user19id,
                "message": "Teach me your ways, legendary general.",
                "Datetime": new Date()
            }
        ]
    }
    const chatInfo10 = await chatsCollection.insertOne(chat10);
    if(!chatInfo10.acknowledged || !chatInfo10.insertedId) throw "Could not insert chat 10 when seeding chats and relationships.";
    let relationship10 = {
        "relationshipDescription": "Colonel Sanders is learning new techniques in chicken cooking from General Tso.",
        "mentor": user1id,
        "mentor": user19id,
        "status": status.APPROVED,
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "relationshipCategory": Category.get("Cooking"),
        "chatChannel": chatInfo10.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }
    const relInfo10 = await relationshipsCollection.insertOne(relationship10);
    if(!relInfo10.acknowledged || !relInfo10.insertedId) throw "Could not insert relationship 10 when seeding relationships";
    const userInfo1_19 = await usersCollection.updateOne({"_id": user1id}, {"$push": {"mentorRelations": relInfo10.insertedId}});
    if(!userInfo1_19.acknowledged) throw "Could not update user 1 when seeding relationships";
    const userInfo19_1 = await usersCollection.updateOne({"_id": user19id}, {"$push": {"menteeRelations": relInfo10.insertedId}});
    if(!userInfo19_1.acknowledged) throw "Could not update user 19 when seeding relationships";
}

// Seeds posts
// Run this function AFTER the seedUsers function
async function seedPosts(){

    const usersCollection = await usersCol();
    const postsCollection = await postsCol();

    // Get users from users collection
    const user1 = await usersCollection.findOne({"name": "General Tso"});
    if(!user1) throw "Could not get user 1 when seeding posts.";
    let user1id = user1["_id"];
    const user2 = await usersCollection.findOne({"name": "Bob Ross"});
    if(!user2) throw "Could not get user 2 when seeding posts.";
    let user2id = user2["_id"];
    const user3 = await usersCollection.findOne({"name": "Johnny Rocket"});
    if(!user3) throw "Could not get user 3 when seeding posts.";
    let user3id = user3["_id"];
    const user4 = await usersCollection.findOne({"name": "Chuck Cheese"});
    if(!user4) throw "Could not get user 4 when seeding posts";
    let user4id = user4["_id"];
    const user5 = await usersCollection.findOne({"name": "Red Digit"});
    if(!user5) throw "Could not get user 5 when seeding posts.";
    let user5id = user5["_id"];
    const user6 = await usersCollection.findOne({"name": "Lloyd Beige"});
    if(!user6) throw "Could not get user 6 when seeding posts.";
    let user6id = user6["_id"];
    const user7 = await usersCollection.findOne({"name": "Cooking Noob"});
    if(!user7) throw "Could not get user 7 when seeding posts.";
    let user7id = user7["_id"];
    const user8 = await usersCollection.findOne({"name": "Painting Newbie"});
    if(!user8) throw "Could not get user 8 when seeding posts.";
    let user8id = user8["_id"];
    const user9 = await usersCollection.findOne({"name": "Shake Beginner"});
    if(!user9) throw "Could not get user 9 when seeding posts.";
    let user9id = user9["_id"];
    const user10 = await usersCollection.findOne({"name": "Slots Addict"});
    if(!user10) throw "Could not get user 10 when seeding posts.";
    let user10id = user10["_id"];
    const user11 = await usersCollection.findOne({"name": "Gaming Enthusiast"});
    if(!user11) throw "Could not get user 11 when seeding posts.";
    let user11id = user11["_id"];
    const user12 = await usersCollection.findOne({"name": "Art Fan"});
    if(!user12) throw "Could not get user 12 when seeding posts.";
    let user12id = user12["_id"];
    const user13 = await usersCollection.findOne({"name": "Sports Fan"});
    if(!user13) throw "Could not get user 13 when seeding posts.";
    let user13id = user13["_id"];
    const user14 = await usersCollection.findOne({"name": "Grandma Basketweaver"});
    if(!user14) throw "Could not get user 14 when seeding posts.";
    let user14id = user14["_id"];
    const user15 = await usersCollection.findOne({"name": "Internet Explorer"});
    if(!user15) throw "Could not get user 15 when seeding posts.";
    let user15id = user15["_id"];
    const user16 = await usersCollection.findOne({"name": "Shake Drinker"});
    if(!user16) throw "Could not get user 16 when seeding posts.";
    let user16id = user16["_id"];
    const user17 = await usersCollection.findOne({"name": "Magic Paintbrush"});
    if(!user17) throw "Could not get user 17 when seeding posts.";
    let user17id = user17["_id"];
    const user18 = await usersCollection.findOne({"name": "Mario Mario"});
    if(!user18) throw "Could not get user 18 when seeding posts.";
    let user18id = user18["_id"];
    const user19 = await usersCollection.findOne({"name": "Colonel Sanders"});
    if(!user19) throw "Could not get user 19 when seeding posts.";
    let user19id = user19["_id"];
    const user20 = await usersCollection.findOne({"name": "King Hippo"});
    if(!user20) throw "Could not get user 20 when seeding posts.";
    let user20id = user20["_id"];

    // Create post objects
    let post1 = {
        "author": user1id,
        "comments": [
            {
                "author": user4id,
                "message": "You said it! It's great to be prideful in one's trade. Keep it up!",
                "timestamp": new Date()
            },
            {
                "author": user16id,
                "message": "Dude, you're gloating.",
                "timestamp": new Date()
            }
        ],
        "content": "My chicken is the best. So many people these days don't make it as well. Seriously, why can't people make chicken like me?",
        "createdOn": new Date(),
        "searchTags": ["Cooking", "Chicken"],
        "visibility": "public",
        "likedBy": [user4id, user13id, user19id],
        "dislikedBy": [user16id],
        "reportedBy": []
    };
    let post2 = {
        "author": user2id,
        "comments": [
            {
                "author": user8id,
                "message": "You're famous for a reason. You would make a great mentor.",
                "timestamp": new Date()
            },
            {
                "author": user17id,
                "message": "Spoken like a true artist!",
                "timestamp": new Date()
            },
            {
                "author": user18id,
                "message": "It's a-super that you want to help with painting.",
                "timestamp": new Date()
            }
        ],
        "content": "I welcome anybody who would like to learn how to paint better. It is a wonderful experience to paint.",
        "createdOn": new Date(),
        "searchTags": ["Painting", "Art"],
        "visibility": "public",
        "likedBy": [user6id, user8id, user12id, user17id, user18id],
        "dislikedBy": [user20id],
        "reportedBy": []
    };
    let post3 = {
        "author": user3id,
        "comments": [
            {
                "author": user4id,
                "message": "Everybody should come to Chuck E Cheese's instead!!",
                "timestamp": new Date()
            }
        ],
        "content": "Come to my restaurants, which have the best shakes around! Burgers are secondary.",
        "createdOn": new Date(),
        "searchTags": ["Cooking", "Milkshakes", "Restaurants"],
        "visibility": "public",
        "likedBy": [user9id, user16id],
        "dislikedBy": [user4id],
        "reportedBy": [user14id]
    };
    let post4 = {
        "author": user4id,
        "comments": [
            {
                "author": user20id,
                "message": "caces;nkxzfzskj",
                "timestamp": new Date()
            },
            {
                "author": user11id,
                "message": "Maybe I'll check this place out sometime",
                "timestamp": new Date()
            }
        ],
        "content": "Come on down to Chuck E Cheese's to have a lot of fun! It's the #1 party spot!",
        "createdOn": new Date(),
        "searchTags": ["Party", "Fun", "Enjoyment", "Birthday"],
        "visibility": "public",
        "likedBy": [user4id, user11id, user20id],
        "dislikedBy": [user18id],
        "reportedBy": [user3id]
    };
    let post5 = {
        "author": user5id,
        "comments": [
            {
                "author": user10id,
                "message": "If I designed a game, I would make the player win a lot more.",
                "timestamp": new Date()
            },
            {
                "author": user14id,
                "message": "What would be the point in that? You youngsters have it so easy these days",
                "timestamp": new Date()
            },
            {
                "author": user10id,
                "message": "People like winning, and besides, it's much more accessible that way.",
                "timestamp": new Date()
            },
            {
                "author": user14id,
                "message": "Lazy! That's what you are!",
                "timestamp": new Date()
            }
        ],
        "content": "If anybody would like to learn about game development, let me know! I'm mentoring in that right now.",
        "createdOn": new Date(),
        "searchTags": ["GameDevelopment"],
        "visibility": "public",
        "likedBy": [user10id, user11id, user15id, user18id],
        "dislikedBy": [],
        "reportedBy": []
    };
    let post6 = {
        "author": user6id,
        "comments": [
            {
                "author": user20id,
                "message": "4aw98pmixleszdflkjdsaaaaa",
                "timestamp": new Date()
            }
        ],
        "content": "I'll be at the medieval swords convention this Saturday, if anybody is interested in meeting me there.",
        "createdOn": new Date(),
        "searchTags": ["Events", "Medieval", "Hobbies"],
        "visibility": "private",
        "likedBy": [],
        "dislikedBy": [],
        "reportedBy": []
    };
    let post7 = {
        "author": user7id,
        "comments": [
            {
                "author": user13id,
                "message": "Lame",
                "timestamp": new Date()
            }
        ],
        "content": "Just joined this site. I think I'll get into cooking. Cooking is a really fun hobby, I've been told.",
        "createdOn": new Date(),
        "searchTags": ["Cooking", "Hobbies"],
        "visibility": "public",
        "likedBy": [user1id, user19id, user14id],
        "dislikedBy": [user16id],
        "reportedBy": []
    };
    let post8 = {
        "author": user8id,
        "comments": [
            {
                "author": user2id,
                "message": "It takes time, but you'll get better",
                "timestamp": new Date()
            },
            {
                "author": user13id,
                "message": "Lame!",
                "timestamp": new Date()
            }
        ],
        "content": "Learning to paint is really hard, but I guess I'll keep working at this until I get better. I have a long road ahead of me, but I have tons of free time to walk that road.",
        "createdOn": new Date(),
        "searchTags": [],
        "visibility": "public",
        "likedBy": [user2id, user12id, user18id],
        "dislikedBy": [user13id],
        "reportedBy": []
    };
    let post9 = {
        "author": user9id,
        "comments": [
            {
                "author": user1id,
                "message": "You must have more patience if you're going to gain wisdom.",
                "timestamp": new Date()
            }
        ],
        "content": "Trying to find a mentor is soooo annoying!!! I tried to get someone  to help me, but they rejected! How can I stop that??",
        "createdOn": new Date(),
        "searchTags": ["Help", "Rejected"],
        "visibility": "public",
        "likedBy": [user9id],
        "dislikedBy": [user1id, user5id],
        "reportedBy": [user3id]
    };
    let post10 = {
        "author": user10id,
        "comments": [
            {
                "author": user4id,
                "message": "You'll be winning in no time! Don't worry!",
                "timestamp": new Date()
            }
        ],
        "content": "I came to this site trying to win at slots, and I got some great advice, but I'm not seeing any results. What should I do? I feel hopeless",
        "createdOn": new Date(),
        "searchTags": [],
        "visibility": "private",
        "likedBy": [],
        "dislikedBy": [],
        "reportedBy": []
    };
    let post11 = {
        "author": user11id,
        "comments": [
            {
                "author": user18id,
                "message": "How about a-some of my games?",
                "timestamp": new Date()
            },
            {
                "author": user13id,
                "message": "Of course you would recommend your own games, Mario.",
                "timestamp": new Date()
            },
            {
                "author": user4id,
                "message": "How about some slot machine games? We can collaborate on this effort.",
                "timestamp": new Date()
            }
        ],
        "content": "I might start mentoring video game skills soon. Who would be interested in learning gaming skills, and which games would you like to learn to get better at?",
        "createdOn": new Date(),
        "searchTags": ["Gaming", "Hobbies"],
        "visibility": "public",
        "likedBy": [user18id, user20id, user4id],
        "dislikedBy": [user13id],
        "reportedBy": []
    };
    let post12 = {
        "author": user13id,
        "comments": [
            {
                "author": user5id,
                "message": "We can have different tastes, but blatantly disrespecting everybody isn't nice.",
                "timestamp": new Date()
            },
            {
                "author": user13id,
                "message": "Whatever, dude",
                "timestamp": new Date()
            },
            {
                "author": user10id,
                "message": "We all have different pastimes, and that's okay. Mine is losing money to slot machines",
                "timestamp": new Date()
            }
        ],
        "content": "Does anyone on this site have any sense of taste?! Nobody is into curling! You're all idiots who don't have lives! This site sucks. Video game players are dumb, and they all need to be banned from this site.",
        "createdOn": new Date(),
        "searchTags": ["Sports", "Hobbies", "Curling", "Gaming"],
        "visibility": "public",
        "likedBy": [user14id],
        "dislikedBy": [user4id, user5id, user10id, user18id],
        "reportedBy": [user5id, user18id]
    };
    let post13 = {
        "author": user14id,
        "comments": [],
        "content": "Hello! This is my first post on any social media website. Can someone tell me where to ask for a request?",
        "createdOn": new Date(),
        "searchTags": ["Hello", "Post"],
        "visibility": "public",
        "likedBy": [user6id],
        "dislikedBy": [],
        "reportedBy": []
    };
    let post14 = {
        "author": user15id,
        "comments": [
            {
                "author": user17id,
                "message": "Keep on telling yourself that, buddy",
                "timestamp": new Date()
            }
        ],
        "content": "I currently accept mentorship requests for learning how to make highly-optimized software.",
        "createdOn": new Date(),
        "searchTags": ["Request", "SoftwareDevelopment"],
        "visibility": "public",
        "likedBy": [user20id],
        "dislikedBy": [user17id, user4id],
        "reportedBy": []
    };
    let post15 = {
        "author": user17id,
        "comments": [
            {
                "author": user11id,
                "message": "Some kid's pocket",
                "timestamp": new Date()
            },
            {
                "author": user18id,
                "message": "I would love to have fun with you in my artist side-games",
                "timestamp": new Date()
            }
        ],
        "content": "Once I learn to paint better, where should I go to improve other people's lives? I can't just stay where I am; I need to go on an adventure. I have a higher purpose!",
        "createdOn": new Date(),
        "searchTags": ["Adventure", "Hobbies", "Art"],
        "visibility": "public",
        "likedBy": [user2id, user14id, user18id],
        "dislikedBy": [user11id],
        "reportedBy": []
    };
    let post16 = {
        "author": user18id,
        "comments": [
            {
                "author": user11id,
                "message": "Thank you for the games to play!",
                "timestamp": new Date()
            }
        ],
        "content": "I just a-wanted to say thank you all for playing my games and enjoying them a-so much! Please buy my upcoming games. They're a lot of fun!",
        "createdOn": new Date(),
        "searchTags": ["Gaming", "Fun", "Hobbies"],
        "visibility": "public",
        "likedBy": [user11id, user5id],
        "dislikedBy": [user4id],
        "reportedBy": []
    };
    let post17 = {
        "author": user19id,
        "comments": [],
        "content": "I'm excited to make more different kinds of chicken recipes! Fried chicken is great, but variety is the spice of life.",
        "createdOn": new Date(),
        "searchTags": ["Cooking", "Chicken"],
        "visibility": "public",
        "likedBy": [user13id, user16id],
        "dislikedBy": [],
        "reportedBy": []
    };
    let post18 = {
        "author": user20id,
        "comments": [
            {
                "author": user5id,
                "message": "Are you okay there?",
                "timestamp": new Date()
            },
            {
                "author": user19id,
                "message": "This is total nonsense.",
                "timestamp": new Date()
            }
        ],
        "content": "dsklskjwqmnadsffdsds;ldsfa;lkjfdsafdqrewrewew2eedf98cs98cxivojscoyresoimkesrp98rtypevdcfaimh3xwa harrddlk;jfdsa",
        "createdOn": new Date(),
        "searchTags": [],
        "visibility": "public",
        "likedBy": [user18id],
        "dislikedBy": [user11id, user5id, user12id, user19id],
        "reportedBy": [user5id, user12id, user13id]
    };
    let post19 = {
        "author": user20id,
        "comments": [
            {
                "author": user12id,
                "message": "Looks like someone messed with this guy's computer",
                "timestamp": new Date()
            }
        ],
        "content": ";lkjdsaca4awo7svdiusadliumvachhasahellpppppplkjfsafxem",
        "createdOn": new Date(),
        "searchTags": ["Help"],
        "visibility": "public",
        "likedBy": [user20id],
        "dislikedBy": [user11id, user5id, user12id, user19id],
        "reportedBy": [user5id, user12id]
    };
    let post20 = {
        "author": user20id,
        "comments": [
            {
                "author": user11id,
                "message": "Dude, are you wearing boxing gloves while typing this or something?",
                "timestamp": new Date()
            },
            {
                "author": user5id,
                "message": "Judging by the name, he might be.",
                "timestamp": new Date()
            },
            {
                "author": user20id,
                "message": "Oh! That's a good idea",
                "timestamp": new Date()
            }
        ],
        "content": "dslkjsoheeeelpasdclkasadscwanjal",
        "createdOn": new Date(),
        "searchTags": ["Help"],
        "visibility": "public",
        "likedBy": [],
        "dislikedBy": [user11id, user5id, user12id],
        "reportedBy": [user5id, user12id, user13id]
    };
    let post21 = {
        "author": user9id,
        "comments": [
            {
                "author": user13id,
                "message": "lol",
                "timestamp": new Date()
            }
        ],
        "content": "Just spilled another shake. Why does this keep happening?",
        "createdOn": new Date(),
        "searchTags": ["Milkshakes"],
        "visibility": "public",
        "likedBy": [user13id, user16id],
        "dislikedBy": [],
        "reportedBy": []
    };
    let post22 = {
        "author": user4id,
        "comments": [
            {
                "author": user4id,
                "message": "Eloquently said",
                "timestamp": new Date()
            },
            {
                "author": user7id,
                "message": "You need help",
                "timestamp": new Date()
            },
            {
                "author": user15id,
                "message": "Great tradition",
                "timestamp": new Date()
            },
            {
                "author": user17id,
                "message": "Disappointing",
                "timestamp": new Date()
            }
        ],
        "content": "Some people say that gambling is a crippling addiction. I say that it's an amazing pastime that can make you money!",
        "createdOn": new Date(),
        "searchTags": ["Gambling", "Hobbies"],
        "visibility": "public",
        "likedBy": [user10id, user15id, user13id, user4id],
        "dislikedBy": [user1id, user7id, user17id, user19id, user18id, user3id],
        "reportedBy": []
    };
    let post23 = {
        "author": user8id,
        "comments": [
            {
                "author": user2id,
                "message": "That's good progress.",
                "timestamp": new Date()
            }
        ],
        "content": "Just finished my 17th painting of the same shrub. I think I'm getting slightly better over time! It's amazing how practice makes perfect.",
        "createdOn": new Date(),
        "searchTags": ["Hobbies", "Painting"],
        "visibility": "private",
        "likedBy": [user2id],
        "dislikedBy": [],
        "reportedBy": []
    };
    let post24 = {
        "author": user11id,
        "comments": [
            {
                "author": user13id,
                "message": "LAMEEEEEE",
                "timestamp": new Date()
            }
        ],
        "content": "Just downloaded the newest fad game. I'm going to go live on my livestream if anybody wants to see me wreck some noobs!",
        "createdOn": new Date(),
        "searchTags": ["Gaming"],
        "visibility": "public",
        "likedBy": [user13id, user18id],
        "dislikedBy": [],
        "reportedBy": []
    };
    let post25 = {
        "author": user20id,
        "comments": [
            {
                "author": user1id,
                "message": "Finally, we can watch posts in peace.",
                "timestamp": new Date()
            },
            {
                "author": user7id,
                "message": "It looks like you're learning how to use websites! Lots of learning.",
                "timestamp": new Date()
            },
            {
                "author": user16id,
                "message": "Cool. Glug.",
                "timestamp": new Date()
            },
            {
                "author": user18id,
                "message": "Wahoo!",
                "timestamp": new Date()
            }
        ],
        "content": "Finally took boxing gloves off. Much better now",
        "createdOn": new Date(),
        "searchTags": ["Hobbies"],
        "visibility": "public",
        "likedBy": [user1id, user2id, user3id, user4id, user5id, user6id, user7id, user8id, user9id, user10id, user11id, user12id, user13id, user14id, user15id, user16id, user17id, user18id, user19id],
        "dislikedBy": [],
        "reportedBy": []
    };

    // Insert post objects into database
    const postInfo1 = await postsCollection.insertOne(post1);
    if(!postInfo1.acknowledged || !postInfo1.insertedId) throw "Could not insert post 1 when seeding posts.";
    const postInfo2 = await postsCollection.insertOne(post2);
    if(!postInfo2.acknowledged || !postInfo2.insertedId) throw "Could not insert post 2 when seeding posts.";
    const postInfo3 = await postsCollection.insertOne(post3);
    if(!postInfo3.acknowledged || !postInfo3.insertedId) throw "Could not insert post 3 when seeding posts.";
    const postInfo4 = await postsCollection.insertOne(post4);
    if(!postInfo4.acknowledged || !postInfo4.insertedId) throw "Could not insert post 4 when seeding posts.";
    const postInfo5 = await postsCollection.insertOne(post5);
    if(!postInfo5.acknowledged || !postInfo5.insertedId) throw "Could not insert post 5 when seeding posts.";
    const postInfo6 = await postsCollection.insertOne(post6);
    if(!postInfo6.acknowledged || !postInfo6.insertedId) throw "Could not insert post 6 when seeding posts.";
    const postInfo7 = await postsCollection.insertOne(post7);
    if(!postInfo7.acknowledged || !postInfo7.insertedId) throw "Could not insert post 7 when seeding posts.";
    const postInfo8 = await postsCollection.insertOne(post8);
    if(!postInfo8.acknowledged || !postInfo8.insertedId) throw "Could not insert post 8 when seeding posts.";
    const postInfo9 = await postsCollection.insertOne(post9);
    if(!postInfo9.acknowledged || !postInfo9.insertedId) throw "Could not insert post 9 when seeding posts.";
    const postInfo10 = await postsCollection.insertOne(post10);
    if(!postInfo10.acknowledged || !postInfo10.insertedId) throw "Could not insert post 10 when seeding posts.";
    const postInfo11 = await postsCollection.insertOne(post11);
    if(!postInfo11.acknowledged || !postInfo11.insertedId) throw "Could not insert post 11 when seeding posts.";
    const postInfo12 = await postsCollection.insertOne(post12);
    if(!postInfo12.acknowledged || !postInfo12.insertedId) throw "Could not insert post 12 when seeding posts.";
    const postInfo13 = await postsCollection.insertOne(post13);
    if(!postInfo13.acknowledged || !postInfo13.insertedId) throw "Could not insert post 13 when seeding posts.";
    const postInfo14 = await postsCollection.insertOne(post14);
    if(!postInfo14.acknowledged || !postInfo14.insertedId) throw "Could not insert post 14 when seeding posts.";
    const postInfo15 = await postsCollection.insertOne(post15);
    if(!postInfo15.acknowledged || !postInfo15.insertedId) throw "Could not insert post 15 when seeding posts.";
    const postInfo16 = await postsCollection.insertOne(post16);
    if(!postInfo16.acknowledged || !postInfo16.insertedId) throw "Could not insert post 16 when seeding posts.";
    const postInfo17 = await postsCollection.insertOne(post17);
    if(!postInfo17.acknowledged || !postInfo17.insertedId) throw "Could not insert post 17 when seeding posts.";
    const postInfo18 = await postsCollection.insertOne(post18);
    if(!postInfo18.acknowledged || !postInfo18.insertedId) throw "Could not insert post 18 when seeding posts.";
    const postInfo19 = await postsCollection.insertOne(post19);
    if(!postInfo19.acknowledged || !postInfo19.insertedId) throw "Could not insert post 19 when seeding posts.";
    const postInfo20 = await postsCollection.insertOne(post20);
    if(!postInfo20.acknowledged || !postInfo20.insertedId) throw "Could not insert post 20 when seeding posts.";
    const postInfo21 = await postsCollection.insertOne(post21);
    if(!postInfo21.acknowledged || !postInfo21.insertedId) throw "Could not insert post 21 when seeding posts.";
    const postInfo22 = await postsCollection.insertOne(post22);
    if(!postInfo22.acknowledged || !postInfo22.insertedId) throw "Could not insert post 22 when seeding posts.";
    const postInfo23 = await postsCollection.insertOne(post23);
    if(!postInfo23.acknowledged || !postInfo23.insertedId) throw "Could not insert post 23 when seeding posts.";
    const postInfo24 = await postsCollection.insertOne(post24);
    if(!postInfo24.acknowledged || !postInfo24.insertedId) throw "Could not insert post 24 when seeding posts.";
    const postInfo25 = await postsCollection.insertOne(post25);
    if(!postInfo25.acknowledged || !postInfo25.insertedId) throw "Could not insert post 25 when seeding posts.";

    // Update users' myPosts arrays with post ids
    const userInfo1 = await usersCollection.updateOne({"_id": user1id}, {"$push": {"myPosts": postInfo1.insertedId}});
    if(!userInfo1.acknowledged) throw "Could not update user 1 when seeding posts";
    const userInfo2 = await usersCollection.updateOne({"_id": user2id}, {"$push": {"myPosts": postInfo2.insertedId}});
    if(!userInfo2.acknowledged) throw "Could not update user 2 when seeding posts";
    const userInfo3 = await usersCollection.updateOne({"_id": user3id}, {"$push": {"myPosts": postInfo3.insertedId}});
    if(!userInfo3.acknowledged) throw "Could not update user 3 when seeding posts";
    const userInfo4 = await usersCollection.updateOne({"_id": user4id}, {"$push": {"myPosts": postInfo4.insertedId}});
    if(!userInfo4.acknowledged) throw "Could not update user 4 when seeding posts";
    const userInfo5 = await usersCollection.updateOne({"_id": user5id}, {"$push": {"myPosts": postInfo5.insertedId}});
    if(!userInfo5.acknowledged) throw "Could not update user 5 when seeding posts";
    const userInfo6 = await usersCollection.updateOne({"_id": user6id}, {"$push": {"myPosts": postInfo6.insertedId}});
    if(!userInfo6.acknowledged) throw "Could not update user 6 when seeding posts";
    const userInfo7 = await usersCollection.updateOne({"_id": user7id}, {"$push": {"myPosts": postInfo7.insertedId}});
    if(!userInfo7.acknowledged) throw "Could not update user 7 when seeding posts";
    const userInfo8 = await usersCollection.updateOne({"_id": user8id}, {"$push": {"myPosts": postInfo8.insertedId}});
    if(!userInfo8.acknowledged) throw "Could not update user 8 when seeding posts";
    const userInfo9 = await usersCollection.updateOne({"_id": user9id}, {"$push": {"myPosts": postInfo9.insertedId}});
    if(!userInfo9.acknowledged) throw "Could not update user 9 when seeding posts";
    const userInfo10 = await usersCollection.updateOne({"_id": user10id}, {"$push": {"myPosts": postInfo10.insertedId}});
    if(!userInfo10.acknowledged) throw "Could not update user 10 when seeding posts";
    const userInfo11 = await usersCollection.updateOne({"_id": user11id}, {"$push": {"myPosts": postInfo11.insertedId}});
    if(!userInfo11.acknowledged) throw "Could not update user 11 when seeding posts";
    const userInfo12 = await usersCollection.updateOne({"_id": user13id}, {"$push": {"myPosts": postInfo12.insertedId}});
    if(!userInfo12.acknowledged) throw "Could not update user 13 when seeding posts";
    const userInfo13 = await usersCollection.updateOne({"_id": user14id}, {"$push": {"myPosts": postInfo13.insertedId}});
    if(!userInfo13.acknowledged) throw "Could not update user 14 when seeding posts";
    const userInfo14 = await usersCollection.updateOne({"_id": user15id}, {"$push": {"myPosts": postInfo14.insertedId}});
    if(!userInfo14.acknowledged) throw "Could not update user 15 when seeding posts";
    const userInfo15 = await usersCollection.updateOne({"_id": user17id}, {"$push": {"myPosts": postInfo15.insertedId}});
    if(!userInfo15.acknowledged) throw "Could not update user 17 when seeding posts";
    const userInfo16 = await usersCollection.updateOne({"_id": user18id}, {"$push": {"myPosts": postInfo16.insertedId}});
    if(!userInfo16.acknowledged) throw "Could not update user 18 when seeding posts";
    const userInfo17 = await usersCollection.updateOne({"_id": user19id}, {"$push": {"myPosts": postInfo17.insertedId}});
    if(!userInfo17.acknowledged) throw "Could not update user 19 when seeding posts";
    const userInfo18 = await usersCollection.updateOne({"_id": user20id}, {"$push": {"myPosts": postInfo18.insertedId}});
    if(!userInfo18.acknowledged) throw "Could not update user 20 when seeding posts";
    const userInfo19 = await usersCollection.updateOne({"_id": user20id}, {"$push": {"myPosts": postInfo19.insertedId}});
    if(!userInfo19.acknowledged) throw "Could not update user 20 when seeding posts";
    const userInfo20 = await usersCollection.updateOne({"_id": user20id}, {"$push": {"myPosts": postInfo20.insertedId}});
    if(!userInfo20.acknowledged) throw "Could not update user 20 when seeding posts";
    const userInfo21 = await usersCollection.updateOne({"_id": user9id}, {"$push": {"myPosts": postInfo21.insertedId}});
    if(!userInfo21.acknowledged) throw "Could not update user 9 when seeding posts";
    const userInfo22 = await usersCollection.updateOne({"_id": user5id}, {"$push": {"myPosts": postInfo22.insertedId}});
    if(!userInfo22.acknowledged) throw "Could not update user 5 when seeding posts";
    const userInfo23 = await usersCollection.updateOne({"_id": user8id}, {"$push": {"myPosts": postInfo23.insertedId}});
    if(!userInfo23.acknowledged) throw "Could not update user 8 when seeding posts";
    const userInfo24 = await usersCollection.updateOne({"_id": user11id}, {"$push": {"myPosts": postInfo24.insertedId}});
    if(!userInfo24.acknowledged) throw "Could not update user 11 when seeding posts";
    const userInfo25 = await usersCollection.updateOne({"_id": user20id}, {"$push": {"myPosts": postInfo25.insertedId}});
    if(!userInfo25.acknowledged) throw "Could not update user 20 when seeding posts";
}

// Copied from indexes.js
async function dropIndexes(){
    let usersCollection = await getUsersCollection();
    await usersCollection.dropIndexes();

    let postsCollection = await getPostsCollection();
    await postsCollection.dropIndexes();

    return { success: true };
}

// Copied from indexes.js
async function addIndexes(){
    // Add search index to usersCollection
    let usersCollection = await getUsersCollection();
    let indexes = await usersCollection.indexes();
    if (indexes.length === 1) {
        await usersCollection.createIndex( { searchTags: "text", username: "text", name: "text", mentorBio: "text", menteeBio: "text" }, { name: "userIndex" } );
    }

    let postsCollection = await getPostsCollection();
    // Add search index to postsCollection
    indexes = await postsCollection.indexes();
    if (indexes.length === 1) {
        await postsCollection.createIndex( { searchTags: "text", content: "text" }, { name: "postIndex" } );
    }

    return { success: true }; 
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
        console.log("Seeding relationships and chats...");
        await seedRelationships(); // If you run this function, make sure you also run the seedUsers function
        console.log("Done seeding relationships and chats...");
    } catch (e) {
        throw e;
    }
    try{
        console.log("Seeding posts...");
        await seedPosts(); // If you run this function, make sure you also run the seedUsers function
        console.log("Done seeding posts.");
    } catch (e) {
        throw e;
    }
    // The following 4 lines were copied from seed.js
    let dropped = await dropIndexes();
    console.log("Dropped index: " + dropped.success);
    let indexes_added = await addIndexes();
    console.log("Added index: " + indexes_added.success);

    console.log("Done seeding data.");
}


async function main(){
    if (process.argv.length > 2 && process.argv[2] == '-d') { // clear command
        // then drop the database before reseeding
        console.log("Dropping database collections");
        let dropRelationships = mongoCollections.dropRelationships;
        let dropUsers = mongoCollections.dropUsers;
        let dropPosts = mongoCollections.dropPosts;
        let dropChats = mongoCollections.dropChats;

        dropChats();
        dropPosts();
        dropUsers();
        dropRelationships();
    }
    

    console.log("Seeding data...");
    try{
        await seedAllData();
    } catch (e) {
        console.log("Something went wrong with seeding data. Error below:");
        console.log(e);
    }
    console.log("Completed task, exiting");
    process.exit(0);
}

main();

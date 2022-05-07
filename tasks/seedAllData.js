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
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 67,
        "searchTags": ["Chicken", "Sauce", "Cooking"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [],
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "Not a mentee, but I used to be.",
        "mentorBio": "Mentor at cooking chicken in the best sauce imaginable.",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user2 = {
        "name": "Bob Ross",
        "username": "BobRoss",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 50,
        "searchTags": ["Painting"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [],
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "Not a mentee for anything now, but I may take up something later.",
        "mentorBio": "Let's relax with some painting.",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user3 = {
        "name": "Johnny Rocket",
        "username": "JohnnyRocket",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 80,
        "searchTags": ["Milkshakes", "Shakes", "Restaurant", "Fun"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [],
        "myPosts": [], // Updated later in the posts seeding function,
        "menteeBio": "Haven't been a mentee for a long time.",
        "mentorBio": "As long as the shakes are decent, it doesn't matter if the burgers are mediocre.",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user4 = {
        "name": "Chuck Cheese",
        "username": "ChuckECheese",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 68,
        "searchTags": ["Entertainment", "Gambling", "Mouse", "Fun", "Enjoyment", "Birthday", "Party"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [],
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "No need to be a mentee when I can help others get more addicted to gambling.",
        "mentorBio": "Gambling addiction? No problem! I'll teach you how to win",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user5 = {
        "name": "Red Digit",
        "username": "Redigit",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 42,
        "searchTags": ["Fun", "Enjoyment", "Development"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [],
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "Not a mentee myself, but a mentee in spirit",
        "mentorBio": "Experienced game developer.",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user6 = {
        "name": "Lloyd Beige",
        "username": "Lindybeige",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 35,
        "searchTags": ["Archeology", "Basketweaving"],
        "mentorRelations": [], // Updated later in the relationships seeding function
        "menteeRelations": [],
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "Probably going to be a mentee in the future, but not at the moment.",
        "mentorBio": "Archeologist and generally fun guy.",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user7 = {
        "name": "Cooking Noob",
        "username": "CookingNoob",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 18,
        "searchTags": ["Chicken", "Cooking"],
        "mentorRelations": [],
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "I want to learn about cooking",
        "mentorBio": "Not a mentor yet, but once I learn enough about cooking, I may teach others.",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user8 = {
        "name": "Painting Newbie",
        "username": "PaintingNewbie",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 26,
        "searchTags": ["Painting", "Newbie"],
        "mentorRelations": [],
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "I like painting.",
        "mentorBio": "Not a mentor. I don't have skills",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user9 = {
        "name": "Shake Beginner",
        "username": "ShakeBeginner",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 5,
        "searchTags": ["Milkshakes"],
        "mentorRelations": [],
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "One time, I tried to shake a cup of milk. It spilled.",
        "mentorBio": "I can totally do everything",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user10 = {
        "name": "Slots Addict",
        "username": "SlotsAddict",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 51,
        "searchTags": ["Gambling"],
        "mentorRelations": [],
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "I'm here to win at gambling.",
        "mentorBio": "Some day I'll teach you all how to get rich.",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user11 = {
        "name": "Gaming Enthusiast",
        "username": "GamingEnthusiast",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 14,
        "searchTags": ["Gaming", "Fun"],
        "mentorRelations": [],
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "Video games are my passion.",
        "mentorBio": "I'll get really good at games, but I'm not mentoring that",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user12 = {
        "name": "Art Fan",
        "username": "ArtFan",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 34,
        "searchTags": ["Art"],
        "mentorRelations": [],
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "Art is great.",
        "mentorBio": "I could teach others how to be better art fans, but I wouldn't recommend that.",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user13 = {
        "name": "Sports Fan",
        "username": "SportsFan",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 37,
        "searchTags": ["Sports", "Football", "Soccer", "Curling"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "Sports are great! I hope someone on here is a mentor in something sports-related.",
        "mentorBio": "Is there anyone on here that wants to learn about curling?",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user14 = {
        "name": "Grandma Basketweaver",
        "username": "GrandmaBasketweaver",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 83,
        "searchTags": ["Basketweaving"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "My granddaughter told me I should check this site out.",
        "mentorBio": "No mentoring for me yet",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user15 = {
        "name": "Internet Explorer",
        "username": "InternetExporer",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 21,
        "searchTags": ["Fast", "Internet", "Explorer", "Enjoyment"],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "#Kony2012",
        "mentorBio": "#Kony2012",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user16 = {
        "name": "Shake Drinker",
        "username": "ShakeDrinker",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 22,
        "searchTags": ["Shakes"],
        "mentorRelations": [],
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "Glug",
        "mentorBio": "I can teach you to chug drinks faster.",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user17 = {
        "name": "Magic Paintbrush",
        "username": "MagicPaintbrush",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 15,
        "searchTags": ["Painting"],
        "mentorRelations": [],
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "I can't wait to turn rainbow colors and assist on an adventure.",
        "mentorBio": "Who wants to turn into a literal paintbrush?",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user18 = {
        "name": "Mario Mario",
        "username": "SuperMario",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 36,
        "searchTags": ["Mario", "SuperMario"],
        "mentorRelations": [],
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "It's a-me.",
        "mentorBio": "Thank you so much for playing my games!",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user19 = {
        "name": "Colonel Sanders",
        "username": "DefinitelyNotKFC",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 55,
        "searchTags": ["Chicken"],
        "mentorRelations": [],
        "menteeRelations": [], // Updated later in the relationships seeding function
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": "Yum yum chicken.",
        "mentorBio": "Eat at KFC",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
    };
    let user20 = {
        "name": "King Hippo",
        "username": "mkclsarnd",
        "password": "xxxxxxxxxx", // MAYBE A PLACEHOLDER
        "age": 32,
        "searchTags": [],
        "mentorRelations": [],
        "menteeRelations": [],
        "myPosts": [], // Updated later in the posts seeding function
        "menteeBio": ",xclcxlkdsldlkslkdsacxewlkr",
        "mentorBio": "kjcsaxlkxaelknx",
        "myPreferredFeed": "PLACEHOLDER" // PLACEHOLDER STRING
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
    const chatInfo1 = await chatsCollection.insertOne(chat1);
    if(!chatInfo1 || chatInfo1.insertedId) throw "Could not insert chat 1 when seeding chats and relationships.";
    let relationship1 = {
        "relationshipDescription": "Cooking Noob wants to learn the ways of cooking chicken from General Tso.",
        "mentor": user1id,
        "mentor": user7id,
        "status": "PENDING",
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatInfo1.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }

    // Relationship 2: 2->8 ACTIVE
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
    if(!chatInfo2 || chatInfo2.insertedId) throw "Could not insert chat 2 when seeding chats and relationships.";
    let relationship2 = {
        "relationshipDescription": "A newbie at painting is learning from Bob Ross.",
        "mentor": user2id,
        "mentor": user8id,
        "status": "ACTIVE",
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatInfo2.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }

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
    if(!chatInfo3 || chatInfo3.insertedId) throw "Could not insert chat 3 when seeding chats and relationships.";
    let relationship3 = {
        "relationshipDescription": "Some kid wants to learn how to make better shakes from Johnny Rocket.",
        "mentor": user3id,
        "mentor": user9id,
        "status": "REJECTED",
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatInfo3.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }

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
    if(!chatInfo4 || chatInfo4.insertedId) throw "Could not insert chat 4 when seeding chats and relationships.";
    let relationship4 = {
        "relationshipDescription": "A slots addict became more addicted to gambling after Chuck E Cheese apparently taught him how to win.",
        "mentor": user4id,
        "mentor": user10id,
        "status": "COMPLETED",
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatInfo4.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }

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
    if(!chatInfo5 || chatInfo5.insertedId) throw "Could not insert chat 5 when seeding chats and relationships.";
    let relationship5 = {
        "relationshipDescription": "A gaming enthusiast wants to learn how to make their own game from an experienced developer.",
        "mentor": user5id,
        "mentor": user11id,
        "status": "PENDING",
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatInfo5.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }

    // Relationship 6: 2->12 ACTIVE
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
    if(!chatInfo6 || chatInfo6.insertedId) throw "Could not insert chat 6 when seeding chats and relationships.";
    let relationship6 = {
        "relationshipDescription": "An art fan is learning how to paint from Bob Ross",
        "mentor": user2id,
        "mentor": user12id,
        "status": "ACTIVE",
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatInfo6.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }

    // Relationship 7: 3->16 ACTIVE
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
    if(!chatInfo7 || chatInfo7.insertedId) throw "Could not insert chat 7 when seeding chats and relationships.";
    let relationship7 = {
        "relationshipDescription": "A shake drinker is learning how to make better shakes from Johnny Rocket.",
        "mentor": user3id,
        "mentor": user16id,
        "status": "ACTIVE",
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatInfo7.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }

    // Relationship 8: 2->17 REJECTED
    let chat8 = {
        "messages": []
    }
    const chatInfo8 = await chatsCollection.insertOne(chat8);
    if(!chatInfo8 || chatInfo8.insertedId) throw "Could not insert chat 8 when seeding chats and relationships.";
    let relationship8 = {
        "relationshipDescription": "Bob Ross couldn't bear to teach a literal paintbrush how to paint better.",
        "mentor": user2id,
        "mentor": user17id,
        "status": "REJECTED",
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatInfo8.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }

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
    if(!chatInfo9 || chatInfo9.insertedId) throw "Could not insert chat 9 when seeding chats and relationships.";
    let relationship9 = {
        "relationshipDescription": "Super Mario learned how to paint from Bob Ross, then starred in Mario Artist.",
        "mentor": user2id,
        "mentor": user18id,
        "status": "COMPLETED",
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatInfo9.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
    }

    // Relationship 10: 1->19 ACTIVE
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
    if(!chatInfo10 || chatInfo10.insertedId) throw "Could not insert chat 10 when seeding chats and relationships.";
    let relationship10 = {
        "relationshipDescription": "Colonel Sanders is learning new techniques in chicken cooking from General Tso.",
        "mentor": user1id,
        "mentor": user19id,
        "status": "ACTIVE",
        "files": [],
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "chatChannel": chatInfo10.insertedId,
        "timelineInterval": 43200000, // 12 hours
        "lastCheckInTime": new Date()
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

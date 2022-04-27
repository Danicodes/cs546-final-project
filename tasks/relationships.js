const getRelationshipsCollection = require('../config/mongoCollections').relationships;
const relationshipsData = require('../data/relationships');
const { ObjectId } = require('mongodb');
const Category = require('../enums/categories');

let addNewRelationships = async function(userIds, shouldDrop){

    if(shouldDrop) {
        let relationsCollection = await getRelationshipsCollection();
        relationsCollection.drop();
    }

    mentorUserIds = userIds
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    menteeUserIds = userIds
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    
    // Create 5 relationship objects, tied to users created
    let relationshipDescs = [
        "I've been coding for 3 years, how do I get to the next stage of my career",
        "How to communicate more effectively with my students",
        "How to I make the shift from Data Analyst to Software Engineer",
        "I've been writing at the New York Times for 10 years, thinking of starting my own publication",
        "I just started working in HR, how do I ensure I'm doing good work?"
    ];

    let relationshipsCreated = {};
    for(let i = 0; i < 5; i++) {
        let relationship = await relationshipsData.createRelationship(relationshipDescs[i], mentorUserIds[i], menteeUserIds[i], Category.SoftwareEng);
        relationshipsCreated[relationship._id] = [mentorUserIds[i], menteeUserIds[i]];
    }

    return relationshipsCreated;
};

module.exports = addNewRelationships;

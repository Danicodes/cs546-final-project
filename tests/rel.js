const data = require('../data/relationships');
const status = require('../data/status');
const { ObjectId } = require('mongodb');
const Category = require('../enums/categories');

let test = 
async function(){
    let relationship1 = await data.getRelationshipById('625b029d6081b3b2bf2dc8d0');
    console.log(relationship1);

    let updatedObj = await data.updateRelationshipStatus(relationship1._id, status.APPROVED); 
    console.log(updatedObj);

    let retrievedUpdatedObj = await data.getRelationshipById(updatedObj._id);
    console.log(retrievedUpdatedObj);
};

test();
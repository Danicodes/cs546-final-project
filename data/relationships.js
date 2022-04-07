const mongoCollections = require('../config/mongoCollections');
const status = require('./status');
const relationshipCollection = mongoCollections.relationships;
const { ObjectId } = require('mongodb');

/**
 * Insert a new relationship into the relationships collection
 * All new relationships will be created with a status of PENDING
 * Workspace and chatChannel will initially be null
 * createdOn and updatedOn will be time.now()
 * @param {string} relationshipDescription string short description of the mentorship topic
 * @param {ObjectId} mentor userId of the mentor that was requested
 * @param {ObjectId} mentee userId of the mentor that was requested
 * @returns relationshipId of the newly created relationship
 */
 async function createRelationship(relationshipDescription, mentor, mentee, relationshipCategory){
    //TODO: Validate inputs
    let relationshipDB = await relationshipCollection();

    let workspaceId = null;
    let chatChannel = null;

    let createdOn = Date.now(); // a number representing the milliseconds elapsed since epoch
    let updatedOn = Date.now();

    const relationshipObject = {
        _id: null,
        relationshipDescription: relationshipDescription,
        mentor: mentor,
        mentee: mentee,
        status: status.PENDING,
        workspaceId: workspaceId,
        createdOn: createdOn,
        updatedOn: updatedOn,
        relationshipCategory: relationshipCategory,
        chatChannel: chatChannel
    }

    let insertedRelationship = await relationshipDB.insertOne(relationshipObject);
    let relationshipId = await get(insertedRelationship.insertedId.toString());

    return relationshipId
 }

 /**
  * Retrieve a relationship object given an object ID
  * @param {string} relationshipId An objectId associated with a relationship
  * @returns {object} relationshipObject corresponding to the given id
  */
 async function getRelationshipById(relationshipId){
    // TODO: convert string relationshipId to objectId 
    let relationshipDB = await relationshipCollection();
    let foundRelationships = await relationshipDB.find({'_id': id}).toArray();
    
    if (foundRelationships.length === 0) throw `Error: no relationship with id '${id}' in the database`;
    foundRelationships[0]._id = foundRelationships[0]._id.toString();

    return foundRelationships[0]; // There should only be one relationship in the db with the given id
 }


/**
 * Update the relationship status of a relationshipObject, after creation, the only thing about a relationship 
 * that should be able to be changed is the status. That will be done on the user end by accepting a mentorship request,
 * rejecting it, terminating it etc. 
 * @param {string} relationshipId: An objectId associated with the relationship that needs to be changed
 *  @param {status} newStatus: The changed status of the relationship
 */
 async function updateRelationshipStatus(relationshipId, newStatus){
    let relationshipDB = await relationshipCollection();

    let foundRelationships = await relatiionshipDB.find({'_id': id}).toArray();
    if (foundRelationships.length === 0) throw `Error: no relationship with id '${id}' to update`;
    
    let updateRelationshipObj = foundRelationships[0]; // Should have the id in string format for updating?

    delete updateRelationshipObj._id // remove _id property from updateObject

    updateRelationshipObj.status = newStatus;
    updateRelationshipObj.updatedOn = Date.now();

    let updatedObj = await relationshipDB.replaceOne({ '_id': relationshipId }, updateRelationshipObj);

    return updatedObj;
 }  
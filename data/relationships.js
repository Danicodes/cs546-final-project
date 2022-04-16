const mongoCollections = require('../config/mongoCollections');
const relationshipCollection = mongoCollections.relationships;
const { ObjectId } = require('mongodb');

const status = require('./status');
const validate = require('../validations/data');
const Category = require('./categories');


/**
 * Insert a new relationship into the relationships collection
 * All new relationships will be created with a status of PENDING
 * Workspace and chatChannel will initially be null
 * createdOn and updatedOn will be time.now()
 * @param {string} relationshipDescription string short description of the mentorship topic
 * @param {ObjectId} mentor userId of the mentor that was requested
 * @param {ObjectId} mentee userId of the mentor that was requested
 * @param {Category} relationshipCategory the profession under which this relationship belongs
 * @returns relationshipId of the newly created relationship
 */
 async function createRelationship(relationshipDescription, mentor, mentee, relationshipCategory){
    //TODO: Validate inputs
    validate.checkArgLength(arguments, 4);
    validate.checkIsEmptyString(relationshipDescription); // Cannot be empty
    mentor = validate.convertID(mentor); // TODO: decide if this should be a string or object id
    mentee = validate.convertID(mentee);

    // validate array content relationshipCategory

    let relationshipDB = await relationshipCollection();

    let workspaceId = null;
    let chatChannel = null;

    let createdOn = new Date(); // a number representing the milliseconds elapsed since epoch
    let updatedOn = createdOn; // Initially will be the same as createdOn

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
    let relationshipId = await getRelationshipById(insertedRelationship.insertedId.toString());

    return relationshipId
 }

 /**
  * Retrieve a relationship object given an object ID
  * @param {string} relationshipId An objectId associated with a relationship
  * @returns {object} relationshipObject corresponding to the given id
  */
 async function getRelationshipById(relationshipId){
    //Validating arguments
    validate.checkArgLength(arguments, 1);
    relationshipId = validate.convertID(relationshipId);

    let relationshipDB = await relationshipCollection();
    let foundRelationships = await relationshipDB.find({'_id': relationshipId}).toArray();
    
    if (foundRelationships.length === 0) throw `Error: no relationship with id '${relationshipId}' in the database`;
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
    // Validate arguments
    validate.checkArgLength(arguments, 2);
    relationshipId = validate.convertID(relationshipId);
    if (!(newStatus instanceof status)) throw `Error: newStatus must be a status enum`;

    let relationshipDB = await relationshipCollection();

    let foundRelationships = await relationshipDB.find({'_id': relationshipId}).toArray();
    if (foundRelationships.length === 0) throw `Error: no relationship with id '${relationshipId}' to update`;
    
    let updateRelationshipObj = foundRelationships[0]; // Should have the id in string format for updating?

    delete updateRelationshipObj._id // remove _id property from updateObject

    updateRelationshipObj.status = newStatus;
    updateRelationshipObj.updatedOn = new Date(); // new date object

    let updatedObj = await relationshipDB.replaceOne({ '_id': relationshipId }, updateRelationshipObj);
    if (updatedObj.modifiedCount == 0) throw `Error: could not update object`;

    updatedObj = await relationshipDB.find({'_id': relationshipId}).toArray();
    updatedObj[0]._id = updatedObj[0]._id.toString();
    return updatedObj[0];
 }  

 module.exports = {
    createRelationship,
    getRelationshipById,
    updateRelationshipStatus
 }
const mongoCollections = require('../config/mongoCollections');
const relationshipCollection = mongoCollections.relationships;
const { ObjectId } = require('mongodb');

const enums = require('../enums');
const status = enums.status;
const Category = enums.categories;
const validate = require('../validations/data');
const chat = require('./chat');



/**
 * Insert a new relationship into the relationships collection
 * All new relationships will be created with a status of PENDING
 * Workspace and chatChannel will initially be null
 * createdOn and updatedOn will be time.now()
 * @param {string} relationshipDescription string short description of the mentorship topic
 * @param {ObjectId|string} mentor userId of the mentor that was requested
 * @param {ObjectId|string} mentee userId of the mentor that was requested
 * @param {Category|string} relationshipCategory the profession under which this relationship belongs
 * @returns relationship object of the newly created relationship
 */
 async function createRelationship(relationshipDescription, mentor, mentee, relationshipCategory){
    validate.checkArgLength(arguments, 4);
    validate.checkIsEmptyString(relationshipDescription); // Cannot be empty
    mentor = validate.convertID(mentor);
    mentee = validate.convertID(mentee);
    if (typeof(relationshipCategory) === 'string'){
       relationshipCategory = new Category(relationshipCategory.trim()); //convert to Category object
    }

    // validate array content relationshipCategory

    let relationshipDB = await relationshipCollection();

    let workspaceId = null;
    let chatChannel = null;

    let createdOn = new Date(); // a new Date object
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
    let relationship = await getRelationshipById(insertedRelationship.insertedId.toString());

    return relationship; // returns the relationship object
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
    if (foundRelationships.length > 1) throw `Error: Database returned multiple relationships`;
    foundRelationships[0]._id = foundRelationships[0]._id.toString();

    return foundRelationships[0]; // There should only be one relationship in the db with the given id
 }


/**
 * Update the relationship status of a relationshipObject, after creation, the only thing about a relationship 
 * that should be able to be changed is the status. That will be done on the user end by accepting a mentorship request,
 * rejecting it, terminating it etc. 
 * @param {string} relationshipId: An objectId associated with the relationship that needs to be changed
 *  @param {status|string} newStatus: The changed status of the relationship
 */
 async function updateRelationshipStatus(relationshipId, newStatus){
    // Validate arguments
    validate.checkArgLength(arguments, 2);
    relationshipId = validate.convertID(relationshipId);
    if (!(newStatus instanceof status)){
      validate.checkIsEmptyString(newStatus);
      newStatus = status.get(newStatus); // throws an error if the string is not one of our predefined statuses
    };

    let relationshipDB = await relationshipCollection();

    let foundRelationships = await relationshipDB.find({'_id': relationshipId}).toArray();
    if (foundRelationships.length === 0) throw `Error: no relationship with id '${relationshipId}' to update`;
    if (foundRelationships.length > 1) throw `Error: Database returned multiple relationships`;
    
    let updateRelationshipObj = foundRelationships[0]; // Should have the id in string format for updating?

    delete updateRelationshipObj._id // remove _id property from updateObject

    updateRelationshipObj.status = newStatus;
    if (newStatus === status.APPROVED){
      // Generate a chat channel and a workspace id
      let chatChannel = await chat.newChannel();
      let workspaceId = new ObjectId(); // TODO: update with the actual create workspace function

      updateRelationshipObj.chatChannel = validate.convertID(chatChannel); // convert back to object Id for storage
      updateRelationshipObj.workspaceId = workspaceId; // where to get files
    } 

    updateRelationshipObj.updatedOn = new Date(); // new date object

    let updatedObj = await relationshipDB.replaceOne({ '_id': relationshipId }, updateRelationshipObj);
    if (updatedObj.modifiedCount == 0) throw `Error: could not update object`;

    updatedObj = await relationshipDB.find({'_id': relationshipId}).toArray();
    updatedObj[0]._id = updatedObj[0]._id.toString();
    return updatedObj[0];
 }  

/**
 * Filter the relationships in a given list by a given status
 * @param {array} relationshipList list of relationshipIds to filter
 * @param {status} statusFilter status of relationship to filter by
 * @returns {array} list of relationshipIds with that status
 */
 async function filterRelationshipsByStatus(relationshipList, statusFilter){
    validate.checkArgLength(arguments, 2);
    relationshipList.map((relationshipId) => {
         relationshipId = validate.convertID(relationshipId);
    });

    statusFilter = status.get(statusFilter);

    let filteredRelationshipList = [];
    for(let relationshipId of relationshipList) {
        let relationshipObj = await getRelationshipById(relationshipId);
       if (relationshipObj.status.name === statusFilter.name) filteredRelationshipList.push(relationshipObj._id);
    }
   return filteredRelationshipList;
 }

 module.exports = {
    createRelationship,
    getRelationshipById,
    updateRelationshipStatus,
    filterRelationshipsByStatus
 }
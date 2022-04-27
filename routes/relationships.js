const express = require('express');
const router = express.Router();

const validate = require('../validations/data');
const enums = require('../enums/');
const data = require('../data');

const relationships = data.relationships;
const users = data.users;


// TODO: I thought if this worked it would be convenient to have, will test when we have a session object to work with
// Function that uses session object to validate that the user is logged in.
// Only an authenticated user can access the following routes
// async function validateCurrentSession(req, res) {
// }

// // Checks all requests for the session object
// router.route('*').get(async(req,res) => {
//     try {
//         await validateCurrentSession(req, res);
//         next();
//     }
//     catch(e) {
//         res.status(400).render('frames/error', {error: e});
//     }
// });

/**
 * Retrieve all relationships
 * @param {Object} req - request object 
 * @param {Object} res - response object
 */
async function getAllRelationships(req, res){
    // No arguments from req params or body
    // Will updated to get userID from session
    let returnList = [];
    let userId;
    try {
        userId = validate.convertID(req.params.userId); 
    }
    catch(e){
        res.status(400).json({error:e});
        return;
    }

    try {
        let menteeList = await users.getMenteeList(userId);
        returnList.push(...menteeList);
        
        let mentorList = await users.getMentorList(userId);
        returnList.push(...mentorList);
        
        let returnObjects = []
        for (let relationshipId of returnList){
            returnObjects.push(await relationships.getRelationshipById(relationshipId));
        };

        let jsonObj = {
            return: returnObjects,
            success: true
        };

        // TODO: Not set on any of these layouts/frames being rendered since we're not yet sure exactly where these routes will be used
       // res.render('frames/relationships', {layout: 'profile', relationships: returnList}); 
       res.status(200).json(jsonObj);
    }
    catch(e) {
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
    }
};

/**
 * Post a new relationship object 
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
async function postNewRelationship(req, res){
    let menteeId, mentorId, userId;
    try {
        userId = validate.convertID(req.params.userId);
       // validate.checkArgLength(req.body, 4);
        validate.checkIsEmptyString(req.body.relationshipDescription);
        mentorId = validate.convertID(req.body.mentorId); 
        menteeId = validate.convertID(req.body.menteeId);
        validate.checkIsEmptyString(req.body.relationshipCategory);
        enums.categories.get(req.body.relationshipCategory); // will throw an error if the category is not in the list
    }
    catch(e) {
        //res.status(400).render('frames/error', {layout: 'profile', error: e});
        res.status(400).json({error:e});
        return;
    }

    let relationshipObj;
    try {
        // Need to add to the userObject
        relationshipObj = await relationships.createRelationship(req.body.relationshipDescription, mentorId, menteeId, req.body.relationshipCategory);
        let added = await users.updateUserRelationships(userId, relationshipObj);
       
        //res.render('frame/request', {layout: 'profile', relationship: relationshipObj, created: true});
        res.status(200).json({success: true, relationship: relationshipObj, added: added}); // used for testing
    }
    catch(e){
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
    }
};

/**
 * Get relationshipObjects filtered by status
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
async function getRelationshipByStatus(req, res){
    // Show only the relationships in requested status
    let returnList;
    let userId;

    try {
        userId = validate.convertID(req.params.userId);
        if (!(req.params.status instanceof data.status)) throw `Error: Must provide a status enum`;
        // TODO: if in mentor view, show all your mentees
        let menteeList = await users.getMenteeList(userId);
        returnList = await relationships.filterRelationshipsByStatus(menteeList, req.params.status);
       
        // TODO:if in mentee view, show all your mentors
        let mentorList = await users.getMentorList(userId);
        returnList.concat(await relationships.filterRelationshipsByStatus(mentorList, req.params.status));
        
        let relationshipObjects = []
        for (let relationshipId of returnList){
            relationshipObjects.push(await relationships.getRelationshipById(relationshipId));
        };
        //return relationship objects
        //res.render('frames/relationships', {layout: 'profile', relationships: relationshipObjects});

        res.status(200).json({success: true, relationships: returnObjects});
    }
    catch(e) {
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
    }
}

/**
 * Get all relationships where current user is the mentee
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
async function getMentors(req, res){
    let returnList;
    let userId;

    try {
        userId = validate.convertID(req.params.userId);
        let mentorRelationships = await users.getMentorList(userId);
        
        let relationshipObjects = []
        for (let relationshipId of mentorRelationships){
            relationshipObjects.push(await relationships.getRelationshipById(relationshipId));
        };
        //return relationship objects
        //res.render('frames/relationships', {layout: 'profile', relationships: relationshipObjects});
        res.status(200).json({success: true, relationships: relationshipObjects});
    }
    catch(e) {
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
    }
};

/**
 * Get all relationship objects where current user is mentor
 * @param {Object} req 
 * @param {Object} res 
 */
async function getMentees(req, res){
    let returnList;
    let userId;

    try {
        userId = validate.convertID(req.params.userId);
        let menteeRelationships = await users.getMenteeList(userId);
        let relationshipObjects = []
        for (let relationshipId of menteeRelationships){
            relationshipObjects.push(await relationships.getRelationshipById(relationshipId));
        };
        //return relationship objects
        //res.render('frames/relationships', {layout: 'profile', relationships: relationshipObjects});

        res.status(200).json({success: true, relationships: relationshipObjects});
        
    }
    catch(e) {
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
    }
};

/**
 * TODO: Define a route for this function
 * Update relationship object 
 * Needs the relationshipID, and new status
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
 async function postRelationshipUpdate(req, res){
    let relationshipID;
    let userId;

    try {
        userId = validate.convertID(req.params.userId);
        relationshipID = validate.convertID(req.body.relationshipID); // Changed to get value from body
        enums.status.get(req.body.status); // will throw an error if status is invalid
    }    
    catch(e) {
        //res.status(400).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
        return;
    }

    try {
        let updatedRelationship = await relationships.updateRelationshipStatus(relationshipID, req.params.status);
        //return relationship objects
        //res.render('frames/relationships', {layout: 'profile', relationship: updatedRelationship});
        res.status(200).json({success: true, updatedRelationship: updatedRelationship});
    }
    catch(e) {
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
    }
};


// Routes
router.route('/:userId')
.get(getAllRelationships)
.post(postNewRelationship);

router.route('/:status')
.get(getRelationshipByStatus);

router.route('/mentors')
.get(getMentors);

router.route('/mentees')
.get(getMentees);

module.exports = router;
const express = require('express');
const router = express.Router();

const validate = require('../validations/data');
const data = require('../data');

const relationships = data.relationships;
const users = data.users;


// TODO: Function that uses session object to validate that the user is logged in.
// Only an authenticated user can access the following routes
async function validateCurrentSession(req, res) {
}

// Checks all requests for the session object
router.route('*').get(async(req,res) => {
    try {
        await validateCurrentSession(req, res);
        next();
    }
    catch(e) {
        res.status(400).render('frames/error', {error: e});
    }
});

/**
 * Retrieve all relationships
 * @param {Object} req - request object 
 * @param {Object} res - response object
 */
async function getAllRelationships(req, res){
    // No arguments from req params or body
    let returnList = [];
    try {
        let menteeList = await users.getMenteeList(); // Assuming these will be part of the user functions
        returnList.push(...menteeList);
       
        let mentorList = await users.getMentorList();
        returnList.push(...mentorList);

        returnList = returnList.map((relationshipId) => {
            return await relationships.getRelationshipById(relationshipId);
        });
        // TODO: Not set on any of these layouts/frames being rendered since we're not yet sure exactly where these routes will be used
        res.render('frames/relationships', {layout: 'profile', relationships: returnList}); 
    }
    catch(e) {
        res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
    }
};

/**
 * Post a new relationship object 
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
async function postNewRelationship(req, res){
    let menteeId, mentorId;
    try {
        validate.checkArgLength(req.body, 4);
        validate.checkIsEmptyString(req.body.relationshipDescription);
        mentorId = validate.convertID(req.body.mentorId); 
        menteeId = validate.convertID(req.body.menteeId);
        if (!(req.body.relationshipCategory instanceof data.categories)) throw `Error`;
    }
    catch(e) {
        res.status(400).render('frames/error', {layout: 'profile', error: e});
        return;
    }

    let relationshipObj;
    try {
        relationshipObj = await relationships.createRelationship(req.body.relationshipDescription, mentorId, menteeId, req.body.relationshipCategory);
        res.render('frame/request', {layout: 'profile', relationship: relationshipObj, created: true});
    }
    catch(e){
        res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
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
    try {
        if (!(req.params.status instanceof data.status)) throw `Error: Must provide a status enum`;
        // TODO: if in mentor view, show all your mentees
        let menteeList = await users.getMenteeList();
        returnList = await relationships.filterRelationshipsByStatus(menteeList, req.params.status);
       
        // TODO:if in mentee view, show all your mentors
        let mentorList = await users.getMentorList();
        returnList = await relationships.filterRelationshipsByStatus(mentorList, req.params.status);
        
        let returnObjects = returnList.map(async(returnId) => {
            return await relationships.getRelationshipById(returnId);
        });
    
        //return relationship objects
        res.render('frames/relationships', {layout: 'profile', relationships: returnObjects});
    }
    catch(e) {
        res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
    }
}

/**
 * Get all relationships where current user is the mentee
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
async function getMentors(req, res){
    let returnList;
    try {
        let mentorRelationships = await users.getMentorList();
        let relationshipObjects = mentorRelationships.map(async(mentorRelationshipId) => {
            return await relationships.getRelationshipById(mentorRelationshipId);
        });
        //return relationship objects
        res.render('frames/relationships', {layout: 'profile', relationships: relationshipObjects});
    }
    catch(e) {
        res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
    }
};

/**
 * Get all relationship objects where current user is mentor
 * @param {Object} req 
 * @param {Object} res 
 */
async function getMentees(req, res){
    let returnList;
    try {
        let menteeRelationships = await users.getMenteeList();
        let relationshipObjects = menteeRelationships.map(async(menteeRelationshipId) => {
            return await relationships.getRelationshipById(menteeRelationshipId);
        });
        //return relationship objects
        res.render('frames/relationships', {layout: 'profile', relationships: relationshipObjects});
    }
    catch(e) {
        res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
    }
};

/**
 * Update relationship object
 * Needs the relationshipID, and new status
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
 async function postRelationshipUpdate(req, res){
    let relationshipID;
    try {
        validate.checkArgLength(req.params, 2);
        relationshipID = validate.convertID(req.params.relationshipID);
        if (!(req.params.status instanceof data.status)) throw `Error: Must provide a status enum`;
        }    
    catch(e) {
            res.status(404).render('frames/error', {layout: 'profile', error: "Internal server error"});
            return;
        }

    try {
        let updatedRelationship = await relationships.updateRelationshipStatus(relationshipID, req.params.status);
        //return relationship objects
        res.render('frames/relationships', {layout: 'profile', relationship: updatedRelationship});
    }
    catch(e) {
        res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
    }
};


// Routes
router.route('/')
.get(getAllRelationships)
.post(postNewRelationship);

router.route('/:status')
.get(getRelationshipByStatus);

router.route('/mentors')
.get(getMentors);

router.route('/mentees')
.get(getMentees);

module.exports = router;
const express = require('express');
const router = express.Router();
const validations = require('../validations/data');
const data = require('../data');
const relationships = data.relationships;
const users = data.users;

// require users

async function validateCurrentSession(req, res) {
    //TODO: check that user is logged in here, none of these routes is accessible without being logged in
}
// Returns list of relations object
// Sort by alphabetical order
router.route('*').get(async(req,res) => {
    try {
        await validateCurrentSession(req, res);
        next();
    }
    catch(e) {
        res.status(400).render('frames/error', {error: e});
    }
});


router.route('/')
.get(async(req, res) =>{
    // Show all the relationships in the database
    let returnList = [];
    try {
        if (!(req.params.status instanceof data.status)) throw `Error: Must provide a status enum`;
        // TODO:if in mentor view, show all your mentees
        let menteeList = await users.getMenteeList();
        returnList.push(...menteeList);
       
        // TODO:if in mentee view, show all your mentors
        let mentorList = await users.getMentorList();
        returnList.push(...mentorList);

        res.render('frames/relationships', {layout: 'profile', relationships: returnList});
    }
    catch(e) {
        res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
    }
})
.post(async(req, res) => {
    // Create a new relationship
    let menteeId, mentorId;
    try {
        validate.checkArgLength(req.body, 4);
        validate.checkIsEmptyString(req.body.relationshipDescription);
        mentorId = validate.convertID(req.body.mentorId); // TODO: decide if this should be a string or object id
        menteeId = validate.convertID(req.body.menteeId);
        if (!(req.body.relationshipCategory instanceof data.categories)) throw `Error`;
    }
    catch(e) {
        res.status(400).render('frames/error', {layout: 'profile', error: "Internal server error"});
        return;
    }

    let relationshipObj;
    try {
        relationshipObj = await relationships.createRelationship(req.body.relationshipDescription, mentorId, menteeId, req.body.relationshipCategory);
        res.render('frame/request', {relationship: relationshipObj, created: true});
    }
    catch(e){
        res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
    }
});


router.route('/:status')
.get(async(req, res) => {
    // Show only the relationships in requested status
    // TODO: need to pass in some session information about which view is currently selected
    //       Must be logged in to see these pages
    let returnList;
    try {
        if (!(req.params.status instanceof data.status)) throw `Error: Must provide a status enum`;
        // TODO:if in mentor view, show all your mentees
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
});

router.route('/mentors')
.get(async(req, res) => {
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
    
});

router.route('/mentees')
.get(async(req, res) => {
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
    
});

module.exports = router;
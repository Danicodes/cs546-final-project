const express = require('express');
const router = express.Router();
const xss = require('xss');
const { ObjectId } = require("mongodb");
const mongoCollections = require("./../config/mongoCollections");

const statusStates = ["PENDING", "ACTIVE", "REJECTED", "COMPLETED"];

const usersCol = mongoCollections.users;
const relationshipsCol = mongoCollections.relationships;
const chatsCol = mongoCollections.chats;

const validate = require('../validations/data');
const enums = require('../enums/');
const data = require('../data');

const relationships = data.relationships;
const users = data.users;
const chatData = data.chat;


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

    try {
        if ((userId.toString() !== mentorId.toString()) && (userId.toString() !== menteeId.toString())) throw `Error: Unauthorized user`;
    }
    catch(e){
        res.status(403).json({error: e});
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
        enums.status.get(req.params.status);
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

        res.status(200).json({success: true, relationships: relationshipObjects});
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
 * Update relationship status for a given relationship ID
 * Needs the relationshipID, and new status
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
 async function postRelationshipStatusUpdate(req, res){
    let relationshipID;
    let userId;

    try {
        userId = validate.convertID(req.params.userId);
        relationshipID = validate.convertID(req.params.relationshipID); // Changed to get value from body
        validate.checkIsEmptyString(req.params.status);
        enums.status.get(req.params.status); // will throw an error if status is invalid
    }    
    catch(e) {
        //res.status(400).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
        return;
    }

    let updatedRelationship;
    try {
        updatedRelationship = await relationships.updateRelationshipStatus(relationshipID, req.params.status);
    }
    catch(e) {
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
    }

    try {
        //return relationship objects
        //res.render('frames/relationships', {layout: 'profile', relationship: updatedRelationship});
        let updatedUser = await users.updateUserRelationships(userId, updatedRelationship); 
        res.status(200).json({success: true, updatedRelationship: updatedRelationship, updatedUser: updatedUser});
    }
    catch(e){
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(403).json({error:e});
    }
};


// Routes

router
    .route("/:id/status")
    // Optional
    // When the status of a relationship needs to be retrieved periodically
    // Response: Latest status of relationship
    .get(async (req, res) => {
        try{
            //console.log("GET /relationships/:id/status"); // debug

            // <ERROR CHECKING> --> CHANGE THESE TO ERROR PAGES ONCE THOSE ARE DONE

            let id = xss(req.params.id);

            let errorFlag = false;

            // Check that id is provided, it is a valid ObjectId, and that it corresponds to an existing relationship
            if(!errorFlag && !id){
                errorFlag = true;
                res.status(400).json("GET /relationships/:id/status: id must be provided");
            }
            if(!errorFlag && !ObjectId.isValid(id)){
                errorFlag = true;
                res.status(400).json("GET /relationships/:id/status: id must be a valid ObjectId");
            }
            if(!errorFlag){
                const relationshipsCollection = await relationshipsCol();
                const foundRelationship = await relationshipsCollection.findOne({"_id": ObjectId(id)});
                if(foundRelationship === null){
                    errorFlag = true;
                    res.status(404).json("GET /relationships/:id/status: could not find a relationship with the given id");
                }
            }

            // </ERROR CHECKING>

            if(!errorFlag){
                res.json(await chatData.getStatus(id));
            }
        } catch (e) {
            //console.log("Error in GET /relationships/:id/status route:"); // 500
            //console.log(e); // debug
            res.status(500).json(e);
        }
    })
    // When a user performs an action for a relationship and status needs to be updated
    // ReqBody: newStatus
    // Response: Updated status of relationship
    .post(async (req, res) => {
        try{
            //console.log("POST /relationships/:id/status"); // debug

            // <ERROR CHECKING> --> CHANGE THESE TO ERROR PAGES ONCE THOSE ARE DONE

            let id = xss(req.params.id);
            let newStatus = xss(req.body.newStatus);

            let errorFlag = false;

            // Check that id is provided, it is a valid ObjectId, and it corresponds to an existing relationship
            if(!errorFlag && !id){
                errorFlag = true;
                res.status(400).json("POST /relationships/:id/status: id must be provided");
            }
            if(!errorFlag && !ObjectId.isValid(id)){
                errorFlag = true;
                res.status(400).json("POST /relationships/:id/status: id must be a valid ObjectId");
            }
            if(!errorFlag){
                const relationshipsCollection = await relationshipsCol();
                const foundRelationship = await relationshipsCollection.findOne({"_id": ObjectId(id)});
                if(foundRelationship === null){
                    errorFlag = true;
                    res.status(404).json("POST /chats/:id/status: could not find a relationship with the given id");
                }
            }
            // Check that newStatus is provided, and that it is a valid status string
            if(!errorFlag && !newStatus){
                errorFlag = true;
                res.status(400).json("POST /relationships/:id/status: newStatus must be provided");
            }
            if(!errorFlag){
                let validStatus = false;
                for(let i = 0; i < statusStates.length; i++){
                    if(statusStates[i].localeCompare(newStatus) === 0){
                        validStatus = true;
                        break;
                    }
                }
                if(!validStatus){
                    errorFlag = true;
                    res.status(400).json("POST /relationships/:id/status: newStatus must be a valid status string");
                }
            }

            // </ERROR CHECKING>

            if(!errorFlag){
                await chatData.updateStatus(id, newStatus);
                res.json(await chatData.getStatus(id));
            }
        } catch (e) {
            //console.log("Error in POST /relationships/:id/status route:"); // 500
            //console.log(e); // debug
            res.status(500).json(e);
        }
    })

router.route('/:userId/:relationshipID/:status')
.post(postRelationshipStatusUpdate);

router.route('/:userId$') // this works!
.get(getAllRelationships)
.post(postNewRelationship);

router.route('/:userId/:status')
.get(getRelationshipByStatus);

router.route('/mentors')
.get(getMentors);

router.route('/mentees')
.get(getMentees);



module.exports = router;
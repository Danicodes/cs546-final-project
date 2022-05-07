const express = require('express');
const router = express.Router();
const xss = require('xss');
const { ObjectId } = require("mongodb");
const mongoCollections = require("./../config/mongoCollections");

const statusStates = ["PENDING", "ACTIVE", "REJECTED", "COMPLETED"];

const relationshipsCol = mongoCollections.relationships;
const chatsCol = mongoCollections.chats;

const validate = require('../validations/data');
const enums = require('../enums/');
const data = require('../data');
const path = require("path");
const constants = require("../constants/constants");
const UnprocessibleRequest = require('../errors/UnprocessibleRequest');
const UnauthorizedRequest = require('../errors/UnauthorizedRequest');

const relationships = data.relationships;
const users = data.users;
const chatData = data.chat;

/**
 * Retrieve all relationships
 * @param {Object} req - request object 
 * @param {Object} res - response object
 */
async function getAllRelationships(req, res){
    // No arguments from req params or body
    let user = req.session.user;
    let returnList = [];
    let userId = user.id;
    try {
        userId = validate.convertID(userId); 
    }
    catch(e){
        res.status(400).json({error:e});
        return;
    }

    // TODO: get current 'view'
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
       res.render('partials/relationships', {layout: 'workspaces', relationships: returnList}); 
       //res.status(200).json(jsonObj);
    }
    catch(e) {
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
    }
};

/**
 * Post a new relationship object from mentee to mentor always
 * A mentee 
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
async function postNewRelationship(req, res){
    let menteeId, mentorId, userId, timeline;
    try {
        userId = validate.convertID(req.session.user.id);
       // validate.checkArgLength(req.body, 4);
        validate.checkIsEmptyString(req.body.relationshipDescription);
        mentorId = validate.convertID(req.body.mentorId); 
        menteeId = validate.convertID(req.body.menteeId); //
        validate.checkIsEmptyString(req.body.relationshipCategory);
        timeline = validate.parseTimeInterval(req.body.timeline); // allowed to be null

        enums.categories.get(req.body.relationshipCategory); // will throw an error if the category is not in the list
    }
    catch(e) {
        //res.status(400).render('frames/error', {layout: 'profile', error: e});
        res.status(400).json({error:e});
        return;
    }

    try {
        if ((userId.toString() !== menteeId.toString())) throw `Error: Unauthorized user`;
    }
    catch(e){
        res.status(403).json({error: e});
        return;
    }

    let relationshipObj;
    try {
        // Need to add to the userObject
        relationshipObj = await relationships.createRelationship(req.body.relationshipDescription, mentorId, menteeId, req.body.relationshipCategory, timeline);
        let added = await users.updateUserRelationships(userId, relationshipObj);
       
        // TODO : SUCCESSFUL CREATION BUT ERRRORED , PLS DEBUG
        //res.render('frame/request', {layout: 'profile', relationship: relationshipObj, created: true});
        res.status(200).json({success: true, relationship: relationshipObj, added: added}); // used for testing
    }
    catch(e){
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
    }
};


async function postUpdateTimeline(req, res){
    let timeline, relationshipId, userid;

    try {
        timeline = validate.parseTimeInterval(req.body.timeline);
        relationshipId = validate.convertID(req.params.relationshipId);
        if (timeline == null){
            throw `timeline cannot be null`;
        }
    }
    catch(e){
        res.status(400).json({error:e});
        return;
    }

    try{
        //TODO: Ensure that user is the MENTOR of the relationship
        let response = await relationships.updateRelationshipTimeline(relationshipId, timeline);
        res.status(200).json({ success: true, relationship: response });
    }
    catch(e){
        res.status(500).json({error:e});
    }
}

async function postLastCheckin(req, res){
    let checkin, relationshipId, userId;

    try {
        checkin = new Date(req.body.lastCheckIn);
        //checkin = validate.parseCheckin(req.body.lastCheckIn);
        relationshipId = validate.convertID(req.body.relationshipId);
        userId = validate.convertID(req.body.userId);

        if (checkin == null){
            throw `checkin cannot be null`;
        }
    }
    catch(e){
        res.status(400).json({error:e});
        return;
    }

    try{
        //TODO: Ensure that user is the MENTOR of the relationship
        let response = await relationships.updateLastCheckin(relationshipId, checkin);
        res.status(200).json({ success: true, relationship: response });
    }
    catch(e){
        res.status(500).json({error:e});
    }
}



// /**
//  * Get the timeline for a single relationship object
//  * @param {Object} req 
//  * @param {Object} res 
// async function getRelationshipTimeline(req, res){
//     let relationshipId, userId;
    
//     try {
//         relationshipId = validate.convertID(req.params.relationshipId);
//         userId = validate.convertID(req.params.userId); //TODO update to Session user 
//     }
//     catch(e){
//         res.status(400).json({error: e});
//     }

//     try{
//         let res = await relationships.getRelationshipById(relationshipId);
//         res.status(200)
//     }


// }

/**
 * Get relationshipObjects filtered by status
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
async function getRelationshipByStatus(req, res){
    // Show only the relationships in requested status
    let returnList;
    let userId;
    // if req.session.view == mentor/mentee
    try {
        userId = validate.convertID(req.session.user.id);
        enums.status.get(req.params.status);
        // TODO: if in mentor view, show all your mentees
        let menteeList = await users.getMenteeList(userId);
        returnList = await relationships.filterRelationshipsByStatus(menteeList, req.params.status);
       
        // TODO:if in mentee view, show all your mentors
        let mentorList = await users.getMentorList(userId);
        let filteredMentorList = await relationships.filterRelationshipsByStatus(mentorList, req.params.status);
        returnList = returnList.concat(filteredMentorList);
        
        let relationshipObjects = [];
        for (let relationshipId of returnList){
            let relationshipObject = await relationships.getRelationshipById(relationshipId);
            
            let mentorObject = await users.getPersonById(relationshipObject.mentor);
            let menteeObject = await users.getPersonById(relationshipObject.mentee);
            
            relationshipObject.mentor = mentorObject;
            relationshipObject.mentee = menteeObject;

            relationshipObjects.push(relationshipObject);
        };
        //return relationship objects
        //res.render('frames/relationships', {layout: 'profile', relationships: relationshipObjects});
        console.log("success");
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
        userId = validate.convertID(req.session.user.id);
        let mentorRelationships = await users.getMentorList(userId);
        
        let relationshipObjects = []
        for (let relationshipId of mentorRelationships){
            relationshipObjects.push(await relationships.getRelationshipById(relationshipId));
        };

        for (let relationship of relationshipObjects){
            let mentoruserId = relationship.mentor;
            let mentor = await users.getPersonById(mentoruserId);
            relationship.mentor = mentor;
        }
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
        userId = validate.convertID(req.session.user.id);
        let menteeRelationships = await users.getMenteeList(userId);

        let relationshipObjects = []
        for (let relationshipId of menteeRelationships){
            relationshipObjects.push(await relationships.getRelationshipById(relationshipId));
        };

        for (let relationship of relationshipObjects){
            let menteeuserId = relationship.mentee;
            let mentee = await users.getPersonById(menteeuserId);
            relationship.mentee = mentee;
        }
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
        userId = validate.convertID(req.session.user.id);
        relationshipID = validate.convertID(req.params.relationshipID); // Changed to get value from body
        validate.checkIsEmptyString(req.params.status);
        enums.status.get(req.params.status); // will throw an error if status is invalid
        validate.isUserAuthorizedForPost(userId, relationshipID); // User Should be a mentor or mentee of this relationship
    }    
    catch(e) {
        if(e instanceof UnauthorizedRequest)
            return res.status(UnauthorizedRequest.status).json({error:UnauthorizedRequest.message});
        //res.status(400).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(400).json({error:e});
        return;
    }

    let updatedRelationship;
    try {
        updatedRelationship = await relationships.updateRelationshipStatus(relationshipID, req.params.status);
    }
    catch(e) {
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(500).json({error:e});
        return;
    }

    try {
        //return relationship objects
        let updatedUser = await users.updateUserRelationships(userId, updatedRelationship); 
        res.status(200).json({success: true, updatedRelationship: updatedRelationship, updatedUser: updatedUser});
    }
    catch(e){
        //res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
        res.status(403).json({error:e});
    }
};

/**
 * Upload a file into Application
 * Apppend newFileName to relationship files list
 * Needs the relationshipID and the file content
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
let fileUpload = async function(req, res) {
    let relationshipId = req.params.id;
    
    try {
        relationshipId = validate.convertID(relationshipId);
        if(!req.files || Object.keys(req.files).length == 0) 
            throw `File is not uploaded or is of size 0`;
        if(req.files.uploadfile.size > constants.MAX_FILE_SIZE)
            throw `File cannot be more than 10MB`;
        validate.isUserAuthorizedForPost(req.session.user.id, relationshipId);
    } catch(e) {
        if(e instanceof UnauthorizedRequest)
            return res.status(UnauthorizedRequest.status).json({error:UnauthorizedRequest.message});
        return res.status(400).json("Error: " + e);
    }
    
    try {
        const uploadedFile = req.files.uploadfile;
        let updatedFilesList = await relationships.uploadfile(relationshipId, uploadedFile);
        return res.status(200).json(updatedFilesList);
    } catch (err) {
        if(err instanceof UnprocessibleRequest) 
            return res.status(err.status).json(err.message);
        else
            return res.status(500).json(err);
    }
}

/**
 * Downloads the file into client browser
 * @param {Object} req 
 * @param {Object} res 
 * @returns a file as an attachment incase of success
 */
let fileDownload = async function(req, res) {
    let relationshipId = req.params.id;
    let filename = req.params.filename;
    try {
        relationshipId = validate.convertID(relationshipId);
        validate.checkIsEmptyString(filename);
        validate.isUserAuthorizedForPost(req.session.user.id, relationshipId);
    } catch(e) {
        if(e instanceof UnauthorizedRequest)
            return res.status(UnauthorizedRequest.status).json({error:UnauthorizedRequest.message});
        return res.status(400).json("Error: " + e);
    }

    try {
        let file = await relationships.downloadfile(relationshipId, filename);
        let absFilePath = path.join(path.resolve(), file);
        res.setHeader("Content-disposition", `attachment; filename=${filename}`);
        return res.status(200).sendFile(absFilePath);
    } catch (err) {
        if(err instanceof UnprocessibleRequest)     
            return res.status(err.status).json(err.message);
        else
            return res.status(500).json(err);
    }
}


// Routes
/**
 * Optional
 * When the status of a relationship needs to be retrieved periodically
 * Response: Latest status of relationship
 * @param {*} req 
 * @param {*} res 
 */
let getStatusOfRelationship = async function(req, res){
    try{
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
        if(!errorFlag){
            res.json(await chatData.getStatus(id));
        }
    } catch (e) {
        //console.log("Error in GET /relationships/:id/status route:"); // 500
        //console.log(e); // debug
        res.status(500).json(e);
    }
}

router.route("/:id/status") // Get the status of a given relationship  -- :relationshipid/status
.get(getStatusOfRelationship);

router.route('/:relationshipID/:status(approved|rejected|pending|completed)')// change the state of a relationship instead of /accept/reject
.post(postRelationshipStatusUpdate);

router.route('/$')
.get(getAllRelationships) // Get my relationships
.post(postNewRelationship); // Request a new relationship, the other person's id will be in req.body

router.route('/mentors') // get my list of mentors
.get(getMentors);

router.route('/mentees') // get my list of mentees
.get(getMentees);

router.route('/:status(approved|rejected|pending|completed)') //  get my relationships by status
.get(getRelationshipByStatus);

/**
 * File updates
 */

router.route("/:id/upload")
.post(fileUpload);

router.route("/:id/download/:filename")
.get(fileDownload);

/**
 * Timeline updates
 */

router.route('/updateCheckin')
.post(postLastCheckin);

router.route('/interval/:relationshipId$') // post an update to the checkin interval
.post(postUpdateTimeline);

module.exports = router;
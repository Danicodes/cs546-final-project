const express = require('express');
const router = express.Router();

const validate = require('../validations/data');
const enums = require('../enums/');
const data = require('../data');
const UnauthorizedRequest = require('../errors/UnauthorizedRequest');

const relationships = data.relationships;
const users = data.users;

// Render the workspace page

async function getWorkspaceLandingPage(req, res){ 
    // Check that user is auth'd and get the userId
    // Right now user is coming from params
    let userId;
    // TODO: add 'view' to session obj

    // if (req.session.user){
    //     userId = req.session.user.id;
    // }
    // else {
    //     res.redirect('/');
    //     return;
    // }
    
    let mentorList, menteeList;
    try {
        validate.checkIsEmptyString(req.params.userId);
        userId = validate.convertID(req.params.userId)

        menteeList = await users.getMenteeList(userId);
        menteeList = await relationships.filterRelationshipsByStatus(menteeList, "approved");

        mentorList = await users.getMentorList(userId);
        mentorList = await relationships.filterRelationshipsByStatus(mentorList, "approved");

        let mentorObjects = [];
        for (let relationshipId of mentorList){
            let relationshipObj = await relationships.getRelationshipById(relationshipId);
            relationshipObj.mentorObj = await users.getPersonById(relationshipObj.mentor);
            mentorObjects.push(relationshipObj);
        };

        let menteeObjects = [];
        for (let relationshipId of menteeList){
            let relationshipObj = await relationships.getRelationshipById(relationshipId);
            relationshipObj.menteeObj = await users.getPersonById(relationshipObj.mentee);
            menteeObjects.push(relationshipObj);
        };
        res.cookie('user', userId.toString())
            .render('partials/relationships', 
                    {layout: 'workspaces',
                     mentorRelationships: mentorObjects,
                      menteeRelationships: menteeObjects});
    }
    catch(e){
        res.status(400).json({error: e});
    }
}

/**
 * Render workspace according to a selected relationship id
 * @param {Object} req 
 * @param {Object} res 
 */
async function getWorkspaceRelationship(req, res){
    //validate relationshipId, userId
    let userId = req.params.userId;

    // if (req.session.user){
    //     userId = req.session.user.id;
    // }
    // else {
    //     res.redirect('/');
    //     return;
    // }

    let relationshipId = req.params.relationshipId;
    let relationshipObject;
    let otherUser;
    try {
        validate.convertID(relationshipId);
        // check if I am mentor or mentee
        relationshipObject = await relationships.getRelationshipById(relationshipId);
        
        if (userId.toString() === relationshipObject.mentor.toString()){
             // then retrieve info of mentee
             otherUser = relationshipObject.mentee;
         }
         else if (userId.toString() === relationshipObject.mentee.toString()) {
             otherUser = relationshipObject.mentor;
         }
         else {
             throw `Error: Unauthorized`
         }
    }
    catch(e){
        if(e instanceof UnauthorizedRequest)
            return res.status(e.status).json({error: e.message});
        return res.status(400).json({error: e});
    }

    try {
        // workspaceId contains files
        let files = relationshipObject.files;// get workspace function to get files
        let chat = relationshipObject.chatId; // get chat info 
        //otherUser = relationship
        otherUser = await users.getPersonById(otherUser);

        //res.render('partials/relationships', 
        res.status(200).json({
                            layout: 'workspaces', 
                            relationship: relationshipObject,
                            user: otherUser,
                            chatChannel: chat,
                            files: files
                            });

    }
    catch(e){
        res.status(400).json({error: e});
    }

}

/**
 * 
 */
async function getMentors(req, res){
    let mentors;
    try {
        mentors = await relationships.getMentorList(req.params.userid);
    }
    catch(e){
        res.send(400).json({error: e});
        return;
    }

    try {
        for (let mentor of mentors){
            let user = await users.getPersonById(mentor);
            mentors.push(user);
        }
        res.status(200).json({mentors: mentors});
    }
    catch(e){
        res.send(500).json({error: e});
        return;
    }
}

async function getWorkspaceFilesPage(req, res) {
    let relationshipId = req.params.relationshipId;
    let userId = req.session.user.id;
    let relationshipObj;
    try {
        validate.convertID(relationshipId);
        relationshipObj = await relationships.isUserAuthorizedForPost(userId, relationshipId);
    } catch (e) {
        if(e instanceof UnauthorizedRequest)
            return res.status(e.status).json({error: e.message});
        return res.status(400).json("getWorkspaceFilesPage: " + e);
    }

    let options = {layout: null, pageTitle: "Files", relationship: relationshipObj};
    return res.status(200).render("partials/workspace-files", options);
}

router.route('/getMentors')
.get(getMentors); // API enpoint, if this is in users url, redirect to workspaces

router.route('/:userId$') // /
.get(getWorkspaceLandingPage);

router.route('/relationships/:userId/:relationshipId')
.get(getWorkspaceRelationship);

router.route("/:relationshipId/files")
.get(getWorkspaceFilesPage);

module.exports = router;
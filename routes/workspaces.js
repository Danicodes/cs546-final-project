const express = require('express');
const router = express.Router();

const validate = require('../validations/data');
const enums = require('../enums/');
const data = require('../data');
const { route } = require('./chat');

const relationships = data.relationships;
const users = data.users;

// Render the workspace page

async function getWorkspaceLandingPage(req, res){ 
    // Check that user is auth'd and get the userId
    // Right now user is coming from params
    let userId = req.params.userId;
    let mentorList, menteeList;
    try {
        validate.checkIsEmptyString(userId);

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
        
        res.render('partials/relationships', {layout: 'workspaces', mentorRelationships: mentorObjects, menteeRelationships: menteeObjects});
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
    let relationshipId = req.params.relationshipId;
    let relationshipObject;
    let otherUser;
    try {
        validate.checkIsEmptyString(relationshipId);

        // check if I am mentor or mentee
        relationshipObject = await relationships.getRelationshipById(relationshipId);
        
        if ('62695d62726569197b9820f5' === relationshipObject.mentor.toString()){
            // then retrieve info of mentee
            otherUser = relationshipObject.mentee;
        }
        else {
            otherUser = relationshipObject.mentor;
        }

        // workspaceId contains files
        let workspace = relationshipObject.workspaceId;// get workspace function to get files
        let chat = relationshipObject.chatId; // get chat info 

        otherUser = await users.getPersonById(otherUser);
        // let userObj = { // define the relevant info to return? or return whole object? 
        //     username: otherUser.username
        // };

        res.render('partials/relationships', {
                                            layout: 'workspaces', 
                                            relationship: relationshipObject,
                                            user: otherUser,
                                            chatChannel: chat,
                                            workspace: workspace,
                                            myId: '62695d62726569197b9820f5'
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

router.route('/:userId/getMentors')
.get(getMentors); // API enpoint, if this is in users url, redirect to workspaces

router.route('/:userId$')
.get(getWorkspaceLandingPage);

router.route('/relationships/:relationshipId')
.get(getWorkspaceRelationship);


module.exports = router;
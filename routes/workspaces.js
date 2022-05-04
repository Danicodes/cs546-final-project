const express = require('express');
const router = express.Router();

const validate = require('../validations/data');
const enums = require('../enums/');
const data = require('../data');

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

        let placeholderUserObj = {
            username: "mentorusername",
            userId: 123,
            name: "Mentor Name Here"
        }
        // show only active relationships here
        let mentorObjects = [];
        for (let relationshipId of mentorList){
            let relationshipObj = await relationships.getRelationshipById(relationshipId);
            //relationshipObj.mentorObj = await users.getPersonById(relationshiopObj.mentor);
            relationshipObj.mentorObj = placeholderUserObj;
            mentorObjects.push(relationshipObj);
        };

        placeholderUserObj = {
            username: "menteeusername",
            userId: 123,
            name: "Mentee Name Here"
        }
        let menteeObjects = [];
        for (let relationshipId of menteeList){
            let relationshipObj = await relationships.getRelationshipById(relationshipId);
            //relationshipObj.menteeObj = await users.getPersonById(relationshiopObj.mentee);
            relationshipObj.menteeObj = placeholderUserObj;
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
    try {
        validate.checkIsEmptyString(relationshipId);

        relationshipObject = await relationships.getRelationshipById(relationshipId);
        // workspaceId contains files
        let workspace = relationshipObject.workspaceId;// get workspace function to get files
        let chat = relationshipObject.chatId; // get chat info 
        //let userObj = users.getUserObj(); // pretend this exists right now
        let fakeuserObj = {
            username: "Fake user name",
            cloutscore: 100
        } ;

        res.render('partials/relationships', {
                                            layout: 'workspaces', 
                                            relationship: relationshipObject,
                                            user: fakeuserObj,
                                            chatChannel: chat,
                                            workspace: workspace,
                                            myId: '62695d62726569197b9820f5'//userId
                                            });

    }
    catch(e){
        res.status(400).json({error: e});
    }

}


router.route('/:userId')
.get(getWorkspaceLandingPage);

router.route('/relationships/:relationshipId')
.get(getWorkspaceRelationship);


module.exports = router;
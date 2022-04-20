const express = require('express');
const router = express.Router();
const validations = require('../validations/data');
const data = require('../data');
const relationships = data.relationships;
const users = data.users;

// require users
const status = require('../enums/status');

async function validateCurrentSession(req, res) {
    //TODO: check that user is logged in here, none of these routes is accessible without being logged in
}

router.route('*').get(async(req,res) => {
    try {
        await validateCurrentSession(req, res);
        next();
    }
    catch(e) {
        res.status(400).render('frames/error', {error: e});
    }
});

router.route('*') 

// domain/relationships
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
    
        //Decide what exactly from the relationship needs to be returned.
        // username of connection and url?
        res.render('frames/relationships', {layout: 'profile', relationships: returnList});
    }
    catch(e) {
        res.status(500).render('frames/error', {layout: 'profile', error: "Internal server error"});
    }
})
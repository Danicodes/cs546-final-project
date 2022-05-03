const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validations = require("../validations/validations");
const validate = require('../validations/data');

router.get('/:userid', async (req, res) => {
    // Show profile information
    try {
        if (validations.validateId(req.params['userid']) == req.params['userid']){
            const id = req.params['userid'];
            const ret = await userData.getPersonById(id);
            console.log(ret);
        }
        else{
            res.status(400).send();
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.put('/:userid', async (req, res) => {
    // Update user in database
    try {
        if (validations.validateId(req.params['userid']) == req.params['userid']){
            const id = req.params['userid'];
            const name = req.body['name'];
            const bio = req.body['bio'];
            const age = req.body['age'];
            const searchTags = req.body['searchTags'];
            const mentorRelations = req.body['mentorRelationships'];
            const menteeRelations = req.body['menteeRelationships'];
            const myPosts = req.body['myPosts'];
            validate.checks(name, bio, age, searchTags, mentorRelations, menteeRelations, myPosts);
            // Get all the information out of the id to pass to updateUser
            const ret = await userData.updateUser(id, name, bio, age, searchTags, mentorRelations, menteeRelations, myPosts);
            // Return the updated collection? (To html page?)
            console.log(ret);
        }
        else{
            res.status(400).send();
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.put('/:userid/reset', async (req, res) => {
    // Update user in database
    try {
        if (validations.validateId(req.params['userid']) == req.params['userid']){
            const id = req.params['userid'];
            const password = req.body['password'];
            const ret = await userData.updatePassword(id, password);
            console.log("Password updated successfully");
            console.log(ret);
        }
        else{
            res.status(400).send();
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router.get('/users/:userid', async (req, res) => {
    // Show profile information
    try {
        if (req.session.username){
            const id = req.params['userid'];
            const ret = await userData.getPersonById(id);
            res.render('/private', ret);
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.put('/users/:userid', async (req, res) => {
    // Update user in database
    try {
        if (req.session.username){
            const id = req.params['userid'];
            const name = req.params['name'];
            const bio = req.params['bio'];
            const age = req.params['age'];
            const searchTags = req.params['searchTags'];
            const mentorRelations = req.params['mentorRelations'];
            const menteeRelations = req.params['menteeRelations'];
            const myPosts = req.params['myPosts'];
            // Get all the information out of the id to pass to updateUser
            const ret = await userData.updateUser(id, name, bio ,age, searchTags, mentorRelations, menteeRelations, myPosts);
            // Return the updated collection? (To html page?)
            console.log(ret);
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.put('/users/:userid/reset', async (req, res) => {
    // Update user in database
    try {
        if (req.session.username){
            const id = req.params['userid'];
            const ret = await userData.updatePassword(id);
            console.log("Password updated successfully");
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send();
    }
});

const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

/*
NOTE: REPLACE IF (TRUE) IN ALL THESE WITH THE SESSION EVENTUALLY
*/
router.get('/:userid', async (req, res) => {
    // Show profile information
    try {
        if (true){
            const id = req.params['userid'];
            const ret = await userData.getPersonById(id);
            console.log(ret);
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
        if (true){
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

router.put('/:userid/reset', async (req, res) => {
    // Update user in database
    try {
        if (true){
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

module.exports = router;
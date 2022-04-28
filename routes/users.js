const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

/*
NOTE: REPLACE IF (TRUE) IN ALL THESE WITH THE SESSION EVENTUALLY
ALSO DO ERROR CHECKING IN EVERY FUNCTION
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
            const name = req.body['name'];
            const bio = req.body['bio'];
            const age = req.body['age'];
            const searchTags = req.body['searchTags'];
            const mentorRelations = req.body['mentorRelations'];
            const menteeRelations = req.body['menteeRelations'];
            const myPosts = req.body['myPosts'];
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
            const password = req.body['password'];
            const ret = await userData.updatePassword(id, password);
            console.log("Password updated successfully");
            console.log(ret);
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;
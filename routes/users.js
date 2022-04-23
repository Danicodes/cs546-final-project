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
            // Get all the information out of the id to pass to updateUser
            const ret = await userData.updateUser(id);
            // I forget what to do here
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
            // Get password out of the id to pass to updatePassword
            const ret = await userData.updatePassword(id);
            // I forget what to do here
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send();
    }
});

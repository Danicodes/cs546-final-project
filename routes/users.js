const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validations = require("../validations/validations");
const validate = require('../validations/data');
const UnprocessibleRequest = require('../errors/UnprocessibleRequest');

router.get('/:userid', async (req, res) => {
    // Show profile information
    let userId = req.session.user.id;
    try {
        userId = validations.validateId(userId);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }
    try {
        const ret = await userData.getPersonById(userId);
        return res.status(200).json(ret);
    }
    catch(e){
        if(e instanceof UnprocessibleRequest)
            return res.status(e.status).json({error: e.message});
        res.status(500).json(e);
    }
});

router.put('/', async (req, res) => {
    // Update user in database
    let userId = req.session.user.id; 
    const name = req.body['name'];
    const mentorBio = req.body['mentorBio'];
    const menteeBio = req.body['menteeBio'];
    const age = req.body['age'];
    const myPreferredFeed = req.body['myPreferredFeed'];
    const searchTags = req.body['searchTags'];
    try {
        validations.validateId(userId);
        validate.checks(name, mentorBio, menteeBio, age, myPreferredFeed, searchTags);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }

    try {
        const ret = await userData.updateUser(userId, name, mentorBio, menteeBio, age, myPreferredFeed, searchTags);
        return res.status(200).json(ret);
    }
    catch(e){
        if(e instanceof UnprocessibleRequest)
            return res.status(e.status).json({error: e.message});
        console.log(e);
        res.status(500).json(e);
    }
});

router.put('/reset', async (req, res) => {
    // Update user in database
    let userId = req.session.user.id;
    let newpassword = req.body['password'];
    try {
        userId = validations.validateId(userId);
        newpassword = validations.validateString(newpassword);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }

    try {
        const ret = await userData.updatePassword(userId, newpassword);
        return res.status(200).json(ret);
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;
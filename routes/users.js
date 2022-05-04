const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validations = require("../validations/validations");
const validate = require('../validations/data');

router.get('/:userid', async (req, res) => {
    // Show profile information
    let userId = req.params['userid'];
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
        console.log(e);
        res.status(500).json(e);
    }
});

router.put('/:userid', async (req, res) => {
    // Update user in database
    let userId = req.params['userid'];
    const id = req.params['userid'];
    const name = req.body['name'];
    const bio = req.body['bio'];
    const age = req.body['age'];
    const searchTags = req.body['searchTags'];
    const mentorRelations = req.body['mentorRelationships'];
    const menteeRelations = req.body['menteeRelationships'];
    const myPosts = req.body['myPosts'];
    try {
        userId = validations.validateId(userId);
        validate.checks(name, bio, age, searchTags, mentorRelations, menteeRelations, myPosts);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }

    try {
        const ret = await userData.updateUser(userId, name, bio, age, searchTags, mentorRelations, menteeRelations, myPosts);
        return res.status(200).json(ret);
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
});

router.put('/:userid/reset', async (req, res) => {
    // Update user in database
    let userId = req.params['userid'];
    let password = req.body['password'];
    try {
        userId = validations.validateId(userId);
        password = validations.validateString(password);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }

    try {
        const ret = await userData.updatePassword(userId, password);
        return res.status(200).json(ret);
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;
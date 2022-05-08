const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validations = require("../validations/validations");
const validate = require('../validations/data');
const UnprocessibleRequest = require('../errors/UnprocessibleRequest');

router.get('/', async (req, res) => {
    let userId = req.session.user.id;
    res.redirect(`/${userId}`);
});

router.get('/:userid', async (req, res) => {
    // Show profile information
    let userId = req.params.userid;
    try {
        userId = validations.validateId(userId);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }
    try {
        const ret = await userData.getPersonById(userId);
        return res.render('layouts/users', {person : ret});
        //return res.status(200).json(ret);
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
        validate.checks(name, mentorBio, menteeBio, age, myPreferredFeed);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }

    try {
        const ret = await userData.updateUser(userId, name, mentorBio, menteeBio, parseInt(age), myPreferredFeed);
        return res.render('layouts/users', {person : ret});
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
    const newpassword = req.body['newpassword'];
    const password1 = req.body['password1'];
    const password2 = req.body['password2'];
    const user = await userData.getPersonById(userId);
    const userPass = user['password'];
    try {
        userId = validations.validateId(userId);
        validations.validateString(newpassword);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }
    try{
        validate.passCheck(userPass, password1, password2, newpassword);
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
    try {
        const ret = await userData.updatePassword(userId, newpassword);
        return res.render('layouts/users', {person : ret, updated : true});
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
});

router.put('/:userid/removeTag', async (req, res) => {
    // Update user in database
    let userId = req.params['userid'];
    let searchTag = req.body['searchTag'];
    try {
        userId = validations.validateId(userId);
        validations.validateString(searchTag);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }
    try {
        const ret = await userData.removeTag(userId, searchTag);
        return res.render('layouts/users', {person : ret});
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
});

router.put('/:userid/addTag', async (req, res) => {
    let userId = req.params['userid'];
    let searchTag = req.body['searchTag'];
    try {
        userId = validations.validateId(userId);
        validations.validateString(searchTag);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }
    try {
        const ret = await userData.addTag(userId, searchTag);
        return res.render('layouts/users', {person : ret});
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;
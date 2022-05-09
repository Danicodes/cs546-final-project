const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validations = require("../validations/validations");
const validate = require('../validations/data');
const UnprocessibleRequest = require('../errors/UnprocessibleRequest');

router.get('/', async (req, res) => {
    let userId = req.session.user.id;
    res.redirect(`/users/${userId}`);
});

router.get('/:userid', async (req, res) => {
    // Show profile information
    let userId = req.params.userid;
    let bool = true;
    if (req.session.user.id == userId){
        bool = false;
    }
    try {
        userId = validations.validateId(userId);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }
    try {
        const ret = await userData.getPersonById(userId, false);
        return res.render('layouts/users', {person : ret, bool : bool, pageTitle: "Profile"});
        //return res.status(200).json(ret);
    }
    catch(e){
        if(e instanceof UnprocessibleRequest)
            return res.status(e.status).json({error: e.message});
        res.status(500).json(e);
    }
});

router.get('/post/:userid', async (req, res) => {
    // Show profile information
    let userId = req.params.userid;
    let bool = true;
    if (req.session.user.id == userId){
        bool = false;
    }
    try {
        userId = validations.validateId(userId);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }
    try {
        const ret = await userData.getPersonById(userId, false);
        return res.json({person : ret, pageTitle : "Profile"});
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
    let name = req.body['name'];
    let mentorBio = req.body['mentorBio'];
    let menteeBio = req.body['menteeBio'];
    let age = req.body['age'];
    let myPreferredFeed = req.body['myPreferredFeed'];
    try {
        validations.validateId(userId);
        validate.checks(name, mentorBio, menteeBio, parseInt(age), myPreferredFeed);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }

    try {
        const ret = await userData.updateUser(userId, name, mentorBio, menteeBio, parseInt(age), myPreferredFeed);
        return res.render('layouts/users', {person : ret, pageTitle: "Profile"});
    }
    catch(e){
        if(e instanceof UnprocessibleRequest)
            return res.status(e.status).json({error: e.message});
        console.log(e);
        res.status(500).json(e);
    }
});

router.put('/:userid/reset', async (req, res) => {
    // Update user in database
    let userId = req.params['userid'];
    let newpassword = req.body['newpassword'];
    let password1 = req.body['password1'];
    let password2 = req.body['password2'];
    try {
        userId = validations.validateId(userId);
        validations.validateString(newpassword);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }
    try{
        await validate.passCheck(userId, password1, password2, newpassword);
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
    try {
        const ret = await userData.updatePassword(userId, newpassword);
        return res.render('layouts/users', {person : ret, updated : true, pageTitle : "Profile"});
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
        return res.render('layouts/users', {person : ret, pageTitle : "Profile"});
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
        return res.render('layouts/users', {person : ret, titke : "Profile"});
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;
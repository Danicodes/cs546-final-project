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
        return res.render('layouts/users', {person : ret});
        //return res.status(200).json(ret);
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
});

router.put('/:userid', async (req, res) => {
    // Update user in database
    let userId = req.params['userid'];
    const name = req.body['name'];
    const bio = req.body['bio'];
    const age = req.body['age'];
    const searchTag = req.body['searchTag'];
    let person = await userData.getPersonById(userId);
    let finalSearchTags = []
    for (let i = 0; i < person['searchTags'].length; i++){
        finalSearchTags.push(person['searchTags'][i]);
    }
    if(searchTag){
        finalSearchTags.push(searchTag);
    }
    try {
        userId = validations.validateId(userId);
        validate.checks(name, bio, parseInt(age), finalSearchTags);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }

    try {
        const ret = await userData.updateUser(userId, name, bio, parseInt(age), finalSearchTags);
        return res.render('layouts/users', {person : ret});
        //return res.status(200).json(ret);
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
});

router.put('/:userid/reset', async (req, res) => {
    // Update user in database
    console.log(req.body);
    let userId = req.params['userid'];
    const newpassword = req.body['newpassword'];
    const password1 = req.body['password1'];
    const password2 = req.body['password2'];
    console.log(newpassword);
    console.log(password1);
    console.log(password2);
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

module.exports = router;
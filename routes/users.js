const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validations = require("../validations/validations");
const validate = require('../validations/data');
const UnprocessibleRequest = require('../errors/UnprocessibleRequest');

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
    try {
        validations.validateId(userId);
        const searchTag = req.body['searchTag'];
        let person = await userData.getPersonById(userId);
        person.searchTags.push(searchTag);
        let finalSearchTags = person.searchTags;
        validate.checks(name, mentorBio, menteeBio, parseInt(age), myPreferredFeed, finalSearchTags);
    } catch (e) {
        return res.status(400).json("Error: " + e);
    }

    try {
        const ret = await userData.updateUser(userId, name, mentorBio, menteeBio, age, myPreferredFeed, finalSearchTags);
        return res.render('layotus/users', {person, ret});
        //return res.status(200).json(ret);
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
    let newpassword = req.body['newpassword'];
    let password1 = req.body['password1'];
    let password2 = req.body['password2'];
    try {
        userId = validations.validateId(userId);
        newpassword = validations.validateString(newpassword);
        let user = await userData.getPersonById(userId);
        const userPass = user['password'];
        validate.passCheck(userPass, password1, password2, newpassword);
    }
    catch(e){
        console.log(e);
        res.status(400).json({error: e});
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
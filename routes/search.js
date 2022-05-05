const express = require('express');
const router = express.Router();

const validate = require('../validations/data');
const data = require('../data');
const search = data.search;

async function getSearchPage(req, res){
    try {
        res.render('partials/searchbar', {
            layout: "test" // change to appropriate layout
        });
    }
    catch(e){
        res.status(500).json({error: e});
    }
}

async function searchUsers(req, res){
    let searchTerm;
    try {
        searchTerm = req.body.searchTerm;
        validate.checkIsEmptyString(searchTerm);
        searchTerm = req.body.searchTerm.trim();
        if (searchTerm.length === 0) throw `Invalid search term`;
    }
    catch(e) {
        res.status(400).json({error: e});
        return;
    }

    try{
        let results = await search.searchUsers(searchTerm);
        res.status(200).json({
            layout: 'test',
            results: results
        });
    }
    catch(e) {
        res.status(500).json({error: e});
        return;
    }
}

async function searchPosts(req, res){
    let searchTerm;
    try {
        searchTerm = req.body.searchTerm;
        validate.checkIsEmptyString(searchTerm);
        searchTerm = req.body.searchTerm.trim();
        if (searchTerm.length === 0) throw `Invalid search term`;
    }
    catch(e) {
        res.status(400).json({error: e});
        return;
    }

    try{
        let results = await search.searchPosts(searchTerm);
        res.status(200).json({
            layout: 'test',
            results: results
        });
    }
    catch(e) {
        res.status(500).json({error: e});
        return;
    }
}

router.route('/')
.get(getSearchPage);

router.route('/users')
.post(searchUsers);

router.route('/posts')
.post(searchPosts);

module.exports = router;
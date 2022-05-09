const express = require('express');
const router = express.Router();

const validate = require('../validations/data');
const data = require('../data');
const search = data.search;

async function getSearchPage(req, res){
    try {
        res.render('partials/searchbar', {
            layout: "main", // change to appropriate layout
            pageTitle: "Search Here"
        });
    }
    catch(e){
        res.status(500).json({error: e});
    }
}

async function searchUsers(req, res){
    let searchTerm;
    try {
        searchTerm = req.query.searchTerm;
        validate.checkIsEmptyString(searchTerm);
        searchTerm = searchTerm.trim();
    }
    catch(e) {
        res.status(400).json({error: e});
        return;
    }

    try{
        let results = await search.searchUsers(searchTerm);
        res.status(200).json({
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
        searchTerm = req.query.searchTerm;
        validate.checkIsEmptyString(searchTerm);
        searchTerm = searchTerm.trim();
    }
    catch(e) {
        res.status(400).json({error: e});
        return;
    }

    try{
        let results = await search.searchPosts(searchTerm);
        res.status(200).json({results:results});
    }
    catch(e) {
        res.status(500).json({error: e});
        return;
    }
}

router.route('/')
.get(getSearchPage);

router.route('/users')
.get(searchUsers);

router.route('/posts')
.get(searchPosts);

module.exports = router;
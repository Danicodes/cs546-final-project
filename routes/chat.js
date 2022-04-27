// chat.js (routes)
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System. Ethan Grzeda

// Imports

const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
const data = require('../data');
const chatData = data.chat;
const mongoCollections = require("./../config/mongoCollections");

const usersCol = mongoCollections.users;
const relationshipsCol = mongoCollections.relationships;
const chatsCol = mongoCollections.chats;

// IMPLEMENT ROUTES

router
    .route("/:id/messages")
    .get(async (req, res) => {
        // Implement
        console.log("GET /relationships/:id/messages route");
    })
    .post(async (req, res) => {
        // Implement
        console.log("POST /relationships/:id/messages route");
    })

router
    .route("/:id/status")
    .get(async (req, res) => {
        // Implement (optional)
        console.log("GET /relationships/:id/status");
    })
    .post(async (req, res) => {
        // Implement
        console.log("POST /relationships/:id/status");
    })

module.exports = router;

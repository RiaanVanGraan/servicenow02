/* Code needed to perform CRUD operations using Mongoose. */
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user.model.js');

const authCheck = ((req, res, next) => {
    if (!req.user) {
        //if user not logged in
        console.log(req.user);
        res.redirect('http://localhost:3006/');
    } else {
        next();
    }
});

router.get('/userData', authCheck, (req, res) => {
    res.send(req.user);
});

// Google login
router.get('/login', passport.authenticate('google', { scope: ['profile'] }));

// This path must match the redirect URI configured on Google's Developer console for this app
router.get('/login/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3006/dashboard');
});

// Local login
router.post('/localLogin',
    passport.authenticate('local', { successRedirect: 'http://localhost:3006/dashboard', failureRedirect: 'http://localhost:3006/' }),
);

// Local logout
router.get('/localLogout', function (req, res) {
    req.logout();
    res.redirect('http://localhost:3006/');
});

// New task
router.route('/newTask').put((req, res) => {
    User.findOneAndUpdate({ 'username': req.body.userID }, {
        $push: { tasks: req.body.newTask }
    }, { new: true }, function (err, doc) {
        if (err) {
            console.log("Something wrong when adding data");
            res.send("ERROR: Task not added. " + err);
        }
        res.send("Task added");
    });
});

// Delete task
router.route('/deleteTask').put((req, res) => {
    User.findOneAndUpdate({ 'username': req.body.userID }, {
        $pull: { tasks: req.body.task }
    }, { new: true }, function (err, doc) {
        if (err) {
            console.log("Something wrong when deleting data");
            res.send("ERROR: Task not deleted. " + err);
        }
        res.send("Task deleted");
    });
});

// Create and save new account
router.route('/newAccount').post((req, res) => {
    User.findOne({ username: req.body.newUsername }).then((currentUser) => {
        if (currentUser) {
            //have this user in our db
            console.log('new User ' + currentUser);
            done(null, currentUser);
        } else {
            //user not saved in DB so save  
            new User({
                username: req.body.newUsername,
                password: req.body.newPassword,
            }).save().then((newUser) => {
                console.log('new User ' + newUser);
                done(null, newUser);
            });
        }
    });
});

// Show all users
router.route('/showAll').get(function (req, res) {
    User.find({}, { username: true, tasks: true, _id: false }, function (err, users) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving users." });
        } else {
            res.send(users);
        }
    });
});

module.exports = router;



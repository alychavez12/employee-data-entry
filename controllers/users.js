const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

// sign up route
router.get('/signup', (req, res) => {
    res.render('signup.ejs', {
        error: null,
        title: 'signup'
    });
});

// submission route
router.post('/signup', (req, res) => {
    let error = null;

    if (req.body.password !== req.body.passwordConf) {
        error = 'password do not match';
        return res.render('signup.ejs', {
            error,
            title: 'signup form'
        });
    }

    // hasshing password through bcrypt algorithm to turn plain text into unintelligible number and letters
    const hashedPasword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPasword;
    User.create(req.body, (error, newUser) => {
        req.session.userId = newUser._id;
        res.redirect('/employees');
    });
});

//  login form route
router.get('/login', (req, res) => {
    res.render('login.ejs', {
        error: null,
        title: 'login'
    });
});

// submission route
router.post('/login', (req, res) => {
    let error = 'bad credentials';
    User.findOne({
        email: req.body.email
    }, (error, foundUser) => {
        if (!foundUser) {
            return res.render('login.ejs', {
                error,
                title: 'login submission'
            });
        }

        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password)
        if (!isMatched) {
            return res.render('login.ejs', {
                error,
                alert: 'wrong password',
                title: 'wrong password'
            });
        }
        req.session.userId = foundUser._id;
        res.redirect('/');
    });
});

// logout user route
router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/login');
    });
});

module.exports = router;
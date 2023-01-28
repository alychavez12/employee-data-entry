const express = require('express');
const router = express.Router();
// const data = require('../data');
const employeeRouter = require('../models/employees');
const Employee = require('../models/employees');

// routes INDUCES

// Seed Route

// Index
router.get('/employees', (req, res) => {
    Employee.find({}, (err, allEmployees) => {
        res.render('index.ejs', {
            employees: allEmployees,
            title: 'index page'
        });
    });
});

// New
router.get('/employees/new', (req, res) => {
    res.render('new.ejs', {
        title:'Add a new employee'
    });
});

// Delete

// Update

// Create
router.post('/employees', (req, res) => {
    Employee.create(req.body, (err, createdEmployee) => {
       res.redirect('/employees', {
        title: 'create route'
       }); // redirect to index page
    });
});

// Edit

// Show
router.get('/employees/:id', (req, res) => {
    Employee.findById(req.params.id, (err, foundEmployee) => {
        res.render('show.ejs', {
            title: 'show page'
        });

    });
});

module.exports = router;
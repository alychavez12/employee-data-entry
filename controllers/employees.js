const express = require('express');
const router = express.Router();
// const data = require('../data');
const employeeRouter = require('../models/employees');
const Employee = require('../models/employees');

// routes INDUCES

// Seed Route

// Index

// New
router.get('/employees/new', (req, res) => {
    res.render('new.ejs');
});

// Delete

// Update

// Create
router.post('/employees', (req, res) => {
    Employee.create(req.body, (err, createdEmployee) => {
       res.send(createdEmployee); 
    });
});

// Edit

// Show

module.exports = router;
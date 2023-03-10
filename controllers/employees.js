const express = require('express');
const router = express.Router();
const Employee = require('../models/employees');
const data = require('../data');

// routes INDUCES

// Seed Route
router.get('/employees/seed', (req, res) => {
    Employee.deleteMany({}, (err, results) => {
        Employee.create(data, (err, employees) => {
        res.redirect('/employees');
      }); 
    });
});


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
router.delete('/employees/:id', (req, res) => {
    Employee.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/employees');
    });
});

// Update
router.put('/employees/:id', (req, res) => {
    Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (err, updateEmployee) => {
            res.redirect(`/employees`)
        }
    );
});

// Create
router.post('/employees', (req, res) => {
    Employee.create(req.body, (err, createdEmployee) => {
       res.redirect('/employees') // redirect to index page
    });
});

// Edit
router.get('/employees/:id/edit', (req, res) => {
    Employee.findById(req.params.id, (err, foundEmployee) => {
        res.render('edit.ejs', {
            employee: foundEmployee,
            title: 'edit page'
        });
    });
})
// Show
router.get('/employees/:id', (req, res) => {
    Employee.findById(req.params.id, (err, foundEmployee) => {
        res.render('show.ejs', {
            employee: foundEmployee,
            title: 'show page'
        });

    });
});

module.exports = router;
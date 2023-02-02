// Require dependencies
const express = require('express');
const employees = require('./models/employees');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const employeesRouter = require('./controllers/employees');
const userRouter = require('./controllers/users');
const session = require('express-session');


// Initialize express app
const app = express();

// Configure settings
require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;


// Establish conecction to mongoDB
mongoose.set('strictQuery', false);
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to mongoDB');
});

// Middleware

app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));
app.use(employeesRouter);
app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 2678400000 //31 days
}));

// authentication middleware
function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
        res.locals.user = null;
        return res.redirect('/login');
    }
    res.locals.user = req.session.newUser_Id;
    next();
};

app.use(userRouter);
app.use(isAuthenticated, employeesRouter);

// CSS
app.use(express.static('public'));
// Configure data base


// Listening PORT
app.listen(PORT, () => {
    console.log(`app is listening on: ${PORT}`);
})
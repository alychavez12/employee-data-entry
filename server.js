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

app.use((req, res, next) => {
    if(req.session.userId) {
        res.locals.user = req.session.userId
    } else {
        res.locals.user = null
    }
    next();
});


// authentication middleware
function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};
// CSS
app.use(express.static('public'));

app.use(userRouter);
app.use(isAuthenticated, employeesRouter);



// Configure data base


// Listening PORT
app.listen(PORT, () => {
    console.log(`app is listening on: ${PORT}`);
})
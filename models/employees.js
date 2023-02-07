const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  idnumber: {
    type: Number,
    required: true,
    trim: true
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
  postcode: {
    type: String,
    required: true,
    trim: true,
    min: [5, 'Just 5 digits'],
    max: [5, 'max 5 digits']
  },
  emailaddress: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  phonenumber: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },

});


// capitalize the first letter of 
employeeSchema.pre('save', function (next) {
  let words = this.firstname.split(' ')
  this.firstname = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
  next()
});

employeeSchema.pre('save', function (next) {
  let words = this.lastname.split(' ')
  this.lastname = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
  next()
});

employeeSchema.pre('save', function (next) {
  let words = this.gender.split(' ')
  this.gender = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
  next()
});

employeeSchema.pre('save', function (next) {
  let words = this.position.split(' ')
  this.position = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
  next()
});


module.exports = mongoose.model('Employee', employeeSchema);
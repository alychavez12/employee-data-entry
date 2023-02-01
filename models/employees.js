const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    idnumber: Number,
    firstname: String,
    lastname: String,
    dob: String,
    gender: String,
    postcode: String,
    emailaddress: String,
    phonenumber: String,
    position: String

});

module.exports = mongoose.model('Employee', employeeSchema);
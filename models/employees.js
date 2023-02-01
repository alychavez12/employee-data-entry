const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    idnumber: {type: Number, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    dob: {type: String, required: true},
    gender: {type: String, required: true},
    postcode: {type: String, required: true},
    emailaddress: {type: String, required: true},
    phonenumber: {type: String, required: true},
    position: {type: String, required: true},

});

module.exports = mongoose.model('Employee', employeeSchema);
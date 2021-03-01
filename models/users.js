var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    passeport_Number : Number,
    room_Number : Number,
    interest : String,
})

module.exports = mongoose.model('users', userSchema)
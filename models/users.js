var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    lastName: String,
    email: String,
    roomNumber : Number,
    token:String,
    interest : String,
    motivation:String 
})

module.exports = mongoose.model('users', userSchema)
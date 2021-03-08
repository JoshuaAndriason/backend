var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    lastName: String,
    email: String,
    roomNumber : Number,
    interest : [String],
    motivation : String,
    token:String
})
 
module.exports = mongoose.model('users', userSchema)
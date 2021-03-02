var mongoose = require('mongoose');


var imageAccueilSchema = mongoose.Schema({
    serviceName: String,
    urlImage: String,
})

var hotelSchema = mongoose.Schema({
    nameHotel: String,
    Address: String,
    email: String,
    tel: Number,
    image: [imageAccueilSchema],
})

module.exports = mongoose.model('hotels', hotelSchema)
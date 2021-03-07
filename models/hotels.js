var mongoose = require('mongoose');


var imagesHotel = mongoose.Schema({
    serviceName: String,
})

var hotelSchema = mongoose.Schema({
    nameHotel: String,
    address: String,
    email: String,
    tel: Number,
    imageHotel: String,
    images: imagesHotel,
})

module.exports = mongoose.model('hotels', hotelSchema)
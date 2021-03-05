var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    nameEvents: String,
    dateEvents: Date,
    description: String,
    image: String,

    hotel:{ type: mongoose.Schema.Types.ObjectId, ref: 'hotels' },
})
module.exports = mongoose.model('events', eventSchema)
var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
    type: String,
    nameArticle: String,
    prix: Number,
    description: String, 
    detail: [Object],
    image: String,
    hotel:{ type: mongoose.Schema.Types.ObjectId, ref: 'hotels' },
})
module.exports = mongoose.model('foods', foodSchema)
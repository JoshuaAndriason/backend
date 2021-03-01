var mongoose = require('mongoose');

var restaurationSchema = mongoose.Schema({
    type: String,
    nameArticle: String,
    prix: Number,
    description: String,
    detail: [String],
    image: String,
    hotel:{ type: mongoose.Schema.Types.ObjectId, ref: 'hotels' },
})
module.exports = mongoose.model('restaurations', restaurationSchema)
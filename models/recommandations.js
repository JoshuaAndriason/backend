
var mongoose = require('mongoose');

var recommandationSchema = mongoose.Schema({
    typeRecommandation: String,
    nameRecommandation: String,
    Adresse: String,
    description: String,
    Visuel: String,
    telephone:Number,
    logo: String,
    hotel:{ type: mongoose.Schema.Types.ObjectId, ref: 'hotels' },
})
module.exports = mongoose.model('recommandations', recommandationSchema)
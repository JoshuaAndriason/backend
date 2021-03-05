
var mongoose = require('mongoose');

var roomDirectoryBaseSchema = mongoose.Schema({
    letterFilter: String,
    itemName: String,
    specialTag: String,
    description: String,
 
})
module.exports = mongoose.model('roomDirectoryBases', roomDirectoryBaseSchema)
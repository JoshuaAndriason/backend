var mongoose = require('mongoose');


var eventConfirmationSchema = mongoose.Schema({
    user :{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    event: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }] ,
})

module.exports = mongoose.model('eventConfirmations', eventConfirmationSchema)
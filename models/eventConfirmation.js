var mongoose = require('mongoose');


var eventConfirmationSchema = mongoose.Schema({
    user :{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'events' } ,
    isComing: Boolean
})

module.exports = mongoose.model('eventConfirmations', eventConfirmationSchema)
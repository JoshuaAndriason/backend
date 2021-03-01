var mongoose = require('mongoose');


var orderRestaurationSchema = mongoose.Schema({
    total :Number,
    quantity: Number,
    date_Paiement : Date,
    lieu : String ,
    heureService : Number,
    dateService : Date,
    user :{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    restauration: [{ type: mongoose.Schema.Types.ObjectId, ref: 'restaurations' }] ,
})

module.exports = mongoose.model('ordersRestauration', orderRestaurationSchema)



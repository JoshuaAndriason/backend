var mongoose = require('mongoose');
var orderSchema = mongoose.Schema({
    foodID:{type: mongoose.Schema.Types.ObjectId, ref: 'foods'},
    details: [Object]
})

var orderRestaurationSchema = mongoose.Schema({
    total :Number,
    quantity: Number,
    date_Paiement : Date,
    lieu : String ,
    heureService : String,
    dateService : Date,
    userID :{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    order: [orderSchema]
})

module.exports = mongoose.model('ordersRestauration', orderRestaurationSchema)



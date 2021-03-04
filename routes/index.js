var express = require('express');
var router = express.Router();

var hotelModel = require('../models/hotels')
var userModel = require('../models/users')
var eventConfirmationModel = require('../models/eventConfirmation')
var eventsModel = require('../models/events')
var orderRestaurationModel = require('../models/ordersRestauration')
var recommandationsModel = require('../models/recommandations')
var restaurationModel = require('../models/restaurations')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/sign-up', async function(req,res,next){
  
    var error = []
    var result = false
    var saveUser = null
   
  
    const data = await userModel.findOne({
      email: req.body.emailFromFront
    })
  
    if(data != null){
      error.push('utilisateur déjà présent')
    }
  
    if(req.body.nameFromFront == ''
    || req.body.emailFromFront == ''
    || req.body.roomNumberFromFront == ''
    ){
      error.push('champs vides')
    }
  
  
    if(error.length == 0){
      var newUser = new userModel({
        lastname: req.body.lastnameFromFront,
        email: req.body.emailFromFront,
        roomNumber: req.body.roomNumber,
        token: uid2(32)
      })
    
      saveUser = await newUser.save()
      if(saveUser){
        token = saveUser.token
        result = true
      }
    }
    res.json({result, saveUser, error,token})
  })









module.exports = router;

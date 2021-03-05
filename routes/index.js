var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uid2 =require("uid2")

var hotelModel = require('../models/hotels')
var userModel = require('../models/users')
var eventConfirmationModel = require('../models/eventConfirmation')
var eventsModel = require('../models/events')
var orderRestaurationModel = require('../models/ordersRestauration')
var recommandationsModel = require('../models/recommandations')
var foodModel = require('../models/food')
var roomDirectoryBaseModel = require('../models/roomDirectoryBase')



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
    if(req.body.lastnameFromFront == ''
    || req.body.emailFromFront == ''
    || req.body.roomNumberFromFront == ''
    ){
      error.push('champs vides')
    }
    if(error.length == 0){
      var newUser = new userModel({
        lastName: req.body.lastnameFromFront,
        email: req.body.emailFromFront,
        roomNumber: req.body.roomNumberFromFront,
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

  //POST SIGN-IN
router.post('/sign-in', async function(req,res,next){

  var user = null
  var error = []
  var token = null

  var result = false
  if(req.body.emailFromFront == ''
  || req.body.lastnameFromFront == '' 
  || req.body.roomNumberFromFront == '' 
  ){
    error.push('champs vides')
  }
  console.log(error.length)

  if(error.length == 0){
    var user = await userModel.findOne({
      lastName: req.body.lastnameFromFront,
      email: req.body.emailFromFront,
      roomNumber: req.body.roomNumberFromFront,
    })}

    if(user){
      result = true
    }

  res.json({result, user, error, token})

})

router.get('/roomDirectoryDetail/:lettre', async function(req,res,next){

console.log('lettre',req.params.lettre)

var filterRoomDirectory = await roomDirectoryBaseModel.find({letterFilter:req.params.lettre})
console.log('retourBDD',filterRoomDirectory)
var result = false;
if(filterRoomDirectory){
  result = true;}

  res.json({result, filterRoomDirectory})

})





module.exports = router;


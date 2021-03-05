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



  //POST EVENT SCREEN
  router.post('/isComing', async function(req,res,next){
      console.log(req.body.isComing, "ggggg");

    // res.json({})
  
  })
  
  module.exports = router;
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

router.get('/motivation/:motivation', async function(req, res, next) {
    const motivation = req.params.motivation
   
    const updateMotivation = await userModel.updateOne(
      {token: "uZGspznpAsH5E3qDXC4UawHy6siEE1hc"},
      {
        motivation: motivation
      }
    )

    if(updateMotivation.n === 0){
      res.json({result : false})
    }else if(updateMotivation.n === 1){
      res.json({result : true})
    }
  }
  );

  router.get('/interest/:interest', async function(req, res, next) {
    const interest = req.params.interest
   
    const updateMotivation = await userModel.updateOne(
      {token: "uZGspznpAsH5E3qDXC4UawHy6siEE1hc"},
      {
        interest: interest
      }
    )
    
    if(updateMotivation.n === 0){
      res.json({result : false})
    }else if(updateMotivation.n === 1){
      res.json({result : true})
    }
  }
  );

  module.exports = router;
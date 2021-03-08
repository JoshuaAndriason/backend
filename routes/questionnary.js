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

router.post('/motivation', async function(req, res, next) {
    const motivation = req.body.motivation
    const token = req.body.token
   console.log(token);
    const updateMotivation = await userModel.updateOne(
      {token: token},
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

  router.post('/interest/', async function(req, res, next) {
    const interest = req.body.interest
    const token = req.body.token
   
    const updateMotivation = await userModel.updateOne(
      {token: token},
      { $push: { interest: interest } }
    )
    
    if(updateMotivation.n === 0){
      res.json({result : false})
    }else if(updateMotivation.n === 1){
      res.json({result : true})
    }
  }
  );

  module.exports = router;
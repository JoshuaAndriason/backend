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
var foodModel = require('../models/foods')
var roomDirectoryBaseModel = require('../models/roomDirectoryBase')


router.get("/menus", async function(req, res){
    const menus = await foodModel.find({})
    console.log(menus);
    if(menus.length > 0){
        console.log("dd");
        res.json({result: menus})
    }else(console.log("error"))
})

module.exports = router;
  
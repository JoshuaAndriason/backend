var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var hotelModel = require('../models/hotels')
var userModel = require('../models/users')
var eventConfirmationModel = require('../models/eventConfirmation')
var eventsModel = require('../models/events')
var orderRestaurationModel = require('../models/ordersRestauration')
var recommandationsModel = require('../models/recommandations')
var foodModel = require('../models/food')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

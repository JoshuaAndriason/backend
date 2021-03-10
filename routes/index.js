var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uid2 = require("uid2")

var hotelModel = require('../models/hotels')
var userModel = require('../models/users')
var eventConfirmationModel = require('../models/eventConfirmation')
var eventsModel = require('../models/events')
var orderRestaurationModel = require('../models/ordersRestauration')
var recommandationsModel = require('../models/recommandations')
var foodModel = require('../models/foods')
var roomDirectoryBaseModel = require('../models/roomDirectoryBase')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET HOME IMAGE
router.get("/image", async function (req, res) {
  const data = await hotelModel.find({})
  if (data.length > 0) {
    res.json({ result: data })
  } else {
    res.json({ result: "no menus found" })
  }
})

/* POST SIGN-UP. */
router.post('/sign-up', async function (req, res, next) {

  var error = []
  var result = false
  var saveUser = null
  var token = null
console.log(typeof req.body.lastnameFromFront)

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })
  if (data != null && req.body.lastnameFromFront != "undefined" && req.body.emailFromFront != "undefined"  && req.body.roomNumberFromFront != "undefined" 
    ) {
    error.push('Vous êtes déja inscrit. Veuillez vous connecter directement.')
  }
  else if (req.body.lastnameFromFront == "undefined"
    || req.body.emailFromFront == "undefined"
    || req.body.roomNumberFromFront == "undefined"
  ) {
    error.push('champs vides')
  }
  else if (error.length == 0) {
    var newUser = new userModel({
      lastName: req.body.lastnameFromFront,
      email: req.body.emailFromFront,
      roomNumber: req.body.roomNumberFromFront,
      token: uid2(32)
    })

    saveUser = await newUser.save()
    if (saveUser) {
      token = saveUser.token
      result = true
    }
  }
  console.log(error)

   res.json({ result, saveUser, error, token })
  
})


//POST SIGN-IN
router.post('/sign-in', async function (req, res, next) {
  var user = null
  var error = []
  var token = null
  var result = false

  //CONDITION SI CHAMPS VIDE A CORRIGER CAR ENVOIE EGALEMENT UNE PROPOSITION DINSCRIPTION ALORS QUE PAS DANS LA MEME CONDITION

  if (req.body.emailFromFront == ''
    || req.body.lastnameFromFront == ''
    || req.body.roomNumberFromFront == ''
  ) {
    error.push("champs vides. Merci de saisir tous les champs")
  }
  console.log(error.length, "ugddjdgjdhjs")


  // SI CHAMPS REMPLI TU ENVOIES LE TOUT 
  // SI EMAIL NON CORRECT VS BDD ALORS TU DEMANDES DE S'INSCRIRE DABORD
  if (error.length == 0) {

    var user = await userModel.findOne({
      lastName: req.body.lastnameFromFront,
      email: req.body.emailFromFront,
      roomNumber: req.body.roomNumberFromFront,
    })
    console.log("user+++++: ", user)
  }
  console.log(req.body.emailFromFront, "j'ai mon email recupéré")
  console.log('user', user)

  if(user){
    if(req.body.emailFromFront === user.email){
      result = true
      token = user.token
    } else {
      result = false
      error.push('email incorrect')
    } 
  } else {
    error.push("Veuillez d'abord vous inscrire avant de vous connecter ! Merci.")
  }
  console.log(user, "je suis inscrite")
  res.json({ result, user, error, token })
})

// GET ROOM DIRECTORY LETTER
router.get('/roomDirectoryDetail/:lettre', async function (req, res, next) {

  console.log('lettre', req.params.lettre)

  var filterRoomDirectory = await roomDirectoryBaseModel.find({ letterFilter: req.params.lettre })
  console.log('retourBDD', filterRoomDirectory)
  var result = false;
  if (filterRoomDirectory) {
    result = true;
  }

  res.json({ result, filterRoomDirectory })

})

// GET ROOM DIRECTORY BADGE
router.get('/roomDirectoryBadge/:badge', async function(req,res,next){

  console.log('badge',req.params.badge)

  var filterRoomDirectory = await roomDirectoryBaseModel.find({itemName:req.params.badge})
  console.log('retourBDD',filterRoomDirectory)
  var result = false;
  if(filterRoomDirectory){
    result = true;}

    res.json({result, filterRoomDirectory})

  });

//Get EVENT (Carousel & detail EVENT)
router.get('/events', async function (req, res, next) {

  var events = await eventsModel.find()

  var result = false;
  if (events) {
    result = true;
  }
  res.json({ result, events })
})

//Get EVENT ID

router.get('/events/:id', async function (req, res, next) {

  var event = await eventsModel.findById(req.params.id)

  var result = false;
  if (event) {
    result = true;
    res.json({ result, event })
  }
  res.json({ result, event })
})

//POST EVENT CONFIRMATION  
router.post('/confirmation', async function (req, res, next) {

  var user = await userModel.findOne({
    token: req.body.token,
  })
  var idUser = user.id
  var newEventConfirmation = new eventConfirmationModel({
    user: idUser,
    event: req.body.eventId,
    isComing: req.body.isComing
  })
  saveConfirmationEvent = await newEventConfirmation.save()

  var result = false;
  if (saveConfirmationEvent) {
    result = true;
  }

  res.json({ result,saveConfirmationEvent })
})


//GET RECOMMENDATION
router.get("/recommendation", async function (req, res) {
  const data = await recommandationsModel.find({})
  if (data.length > 0) {
    res.json({ result: data })
  } else {
    res.json({ result: "no menus found" })
  }
})

//GET COMMANDE/ EVENT /USER
router.post('/account', async function (req, res, next) {

  console.log(req.body.token, "token")

  var saveUser = await userModel.findOne({
    token: req.body.token,
  })
  console.log(saveUser.id, 'useeeeeeeer')
  var idUser = saveUser.id
  var saveEvents = await eventConfirmationModel.find({
    user: idUser,
  }).populate('event').exec()
  console.log('saveEvents',saveEvents)
  

 var saveOrder = await orderRestaurationModel.find({
  userID: idUser,
  }).populate('order').exec()
  console.log('saveOrder',saveOrder)

  var resultUser = false;
  if (saveUser) {
    resultUser = true;
  }
  var resultEvent = false;
  if (saveEvents) {
    resultEvent = true;
  }
  var resultOrder = false;
  if (saveOrder) {
    resultOrder = true;
  }

  res.json({ resultOrder,resultUser,resultEvent,saveUser,saveEvents,saveOrder})
})




module.exports = router;

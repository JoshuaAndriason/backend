var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var uid2 = require("uid2");
var hotelModel = require("../models/hotels");
var userModel = require("../models/users");
var eventConfirmationModel = require("../models/eventConfirmation");
var eventsModel = require("../models/events");
var orderRestaurationModel = require("../models/ordersRestauration");
var recommandationsModel = require("../models/recommandations");
var foodModel = require("../models/foods");


// get all menus
router.get("/menus", async function (req, res) {
  const menus = await foodModel.find({});
  console.log(menus);
  if (menus.length > 0) {
    console.log("dd");
    res.json({ result: menus });
  } else {
    res.json({ result: "no menus found" });
  }
});

// get all breakfast
router.get("/breakfast/:id", async function (req, res) {
  const foodID = req.params.id;
  const food = await foodModel.findById(foodID);
  //handle error
  if (food) {
    console.log("food:", food);
    res.json({ result: food });
  } else {
    res.json({ result: "no food found " });
  }
});

// get all diner & a la carte documents
router.get("/food/:type", async function (req, res) {
  const foodType = req.params.type;

  try {
    if (foodType == "diner") {
      const food = await foodModel.find({
        $or: [{ type: "Desserts" }, { type: "Plats" }, { type: "Entrées" }],
      });
      res.json({ result: food });
    } else if (foodType === "Carte") {
      const food = await foodModel.find({
        type: "Carte",
      });
      console.log("food:", food);
      res.json({ result: food });
    }
  } catch (error) {
    console.log(error);
    res.json({ result: error });
  }
});


// send the order to the BDD 
router.post("/order", async function (req, res) {
  
  var saveUser = await userModel.findOne({
    token: req.body.token,
  })
  
  var idUser = saveUser.id

  let obj = {};
  const newOrder = new orderRestaurationModel({
    total: req.body.price,
    quantity: req.body.quantity,
    date_Paiement: req.body.date,
    lieu: req.body.lieu,
    heureService: req.body.heure,
    dateService: req.body.date,
    userID: idUser,
      order: [
        {
          foodID: req.body.foodID,
          details: obj[Object.keys(req.body.details)] = Object.values(req.body.details)
        }, 
      ],
    
  });
  
  const order = await newOrder.save();
  if(order.userID){
    res.json({result : "order saved"})
  }else if(!order.userID){
    res.json({result : "order has not "})
  }
});

module.exports = router;

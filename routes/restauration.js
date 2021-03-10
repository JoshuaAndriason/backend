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
var roomDirectoryBaseModel = require("../models/roomDirectoryBase");

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

// get all diner & a la carte document
router.get("/food/:type", async function (req, res) {
  const foodType = req.params.type;
  console.log("foodType:", foodType);

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

router.post("/order", async function (req, res) {
  console.log("details=============:", req.body.details);
  let obj = {};
  const newOrder = await new orderRestaurationModel({
    total: req.body.price,
    quantity: req.body.quantity,
    date_Paiement: req.body.date,
    lieu: req.body.lieu,
    heureService: req.body.heure,
    dateService: req.body.date,
    userID: "60463d4056f89429cf9dc49f",
      order: [
        {

          foodID: req.body.foodID,
          details: obj[Object.key(req.body.details)] = Object.key(req.body.details)
        }
      ],
    
  });
  //console.log('saveOrder:', newOrder)
  const order = await newOrder.save();
  console.log("order====>:", order);
});

module.exports = router;

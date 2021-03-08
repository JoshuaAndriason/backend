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

router.get("/food/:type", async function (req, res) {
  const foodType = req.params.type;
  console.log("foodType:", foodType);

  try {
    if (foodType == "diner") {
      const food = await foodModel.find({
        $or: [{ type: "Desserts" }, { type: "Plats" }, { type: "Entrées" }],
      });
      res.json({ result: food });
    } else if (foodType === "A La Carte") {
      const food = await foodModel.find({
        type: "A La Carte",
      });
      console.log("food:", food);
    }
  } catch (error) {
    console.log(error);
    res.json({ result: error });
  }

  // const menus = await foodModel.find({})
  // console.log(menus);
  // if(menus.length > 0){
  //     console.log("dd");
  //     res.json({result: menus})
  // }else{
  //     res.json({result: "no menus found"})
  // }
});

router.get("fooof");

module.exports = router;

const express = require("express");
const router = express.Router();
const  hourlyDataController  = require("../controllers/hourlyData.controller");

router.post("/hourly-data/:packetId", hourlyDataController.updateHourlyDataController);
router.get("/", hourlyDataController.getAllHourlyDatas);

module.exports = router;

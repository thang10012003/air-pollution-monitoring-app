const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensor.controller");

router.post("/", sensorController.createSensor);
router.get("/", sensorController.getAllSensor);
router.get("/:id", sensorController.getAllSensorFromLocation);

module.exports = router;

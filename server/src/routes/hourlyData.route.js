const express = require("express");
const HourlyDataController = require("../controllers/hourlyData.controller");

const router = express.Router();

router.post("/create", HourlyDataController.createHourlyData);

router.get("/:packetId", HourlyDataController.getHourlyDataByPacketId);
router.get("/:packetId/:date", HourlyDataController.getHourlyDataByPacketIdAndDate);

router.put("/:packetId", HourlyDataController.updateHourlyData);

router.delete("/:packetId", HourlyDataController.deleteHourlyData);

module.exports = router;

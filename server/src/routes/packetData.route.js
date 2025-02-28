const express = require('express');
const router = express.Router();
const packetDataController = require('../controllers/packetData.controller');

router.post('/', packetDataController.createOrUpdatePacketData);
router.get('/', packetDataController.getAllPacketData);
router.delete("/", packetDataController.deleteDataset);
router.get("/nearest-packet/:latitude&:longitude", packetDataController.getNearestPacketData);
router.get("/:locationId", packetDataController.getPacketDataByLocationId);

module.exports = router;
    
const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/history.controller');

router.get('/:packetId', HistoryController.getHistory);

module.exports = router;

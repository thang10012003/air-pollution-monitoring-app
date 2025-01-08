const express = require('express');
const router = express.Router();
const thresholdController = require('../controllers/threshold.controller')

router.get("/", thresholdController.getAll);
router.post("/create", thresholdController.createThreshold);
module.exports = router;
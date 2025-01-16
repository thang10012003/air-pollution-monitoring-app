const express = require('express');
const router = express.Router();
const dataController = require('../controllers/sensorData.controller')


//get All
router.get('/', dataController.getAllData);
//post data
router.post('/post', dataController.createData);

module.exports = router;
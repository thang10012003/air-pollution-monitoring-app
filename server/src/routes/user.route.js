const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller.js')
router.post('/', UserController.sendEmailUser)


module.exports = router
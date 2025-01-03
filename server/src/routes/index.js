const express = require('express');
const router = express.Router();


const dataRouter =  require('./sensorData.route');
const userRouter = require('./user.route');

router.use('/api/report', dataRouter);
router.use('/api/user', userRouter);






module.exports = router;
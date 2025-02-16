const express = require('express');
const router = express.Router();


const dataRouter =  require('./sensorData.route');
const sensorRouter =  require('./sensor.route');
const userRouter = require('./user.route');
const thresholdRouter = require('./threshold.route');
const typeRouter = require('./sensorType.route');
const locationRouter = require('./location.route');
const hourlyDataRouter = require('./hourlyData.route');
const historyRouter = require('./history.route');

const packetDataRouter = require('./packetData.route');
// const predictRouter = require('./predict.route')

const authRouter = require('./auth.route')

router.use('/api/report', dataRouter);
router.use('/api/user', userRouter);
router.use('/api/threshold', thresholdRouter);
router.use('/api/type', typeRouter);
router.use('/api/sensors', sensorRouter);
router.use('/api/packet', packetDataRouter);
router.use('/api/location', locationRouter);
router.use('/api/hourly', hourlyDataRouter);
router.use('/api/history', historyRouter);

router.use('/auth', authRouter)
// router.use('/predict',predictRouter)






module.exports = router;
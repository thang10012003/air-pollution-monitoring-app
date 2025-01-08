const thresholdService = require('../services/threshold.service');


const getAll =  async (req, res) =>{
    try {
        const threshold = await thresholdService.getAll();
        res.status(200).json(threshold);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
//Đặt ngưỡng để cảnh báo
const createThreshold =  async (req, res) =>{
    try {
        const { sensorTypeId, thresholdValue, AQIValues } = req.body;

        if (!thresholdValue || thresholdValue.length === 0) {
            return res.status(400).json({ message: "Threshold value must not be empty" });
        }
        if (!AQIValues || AQIValues.length === 0) {
            return res.status(400).json({ message: "AQIvalues must not be empty" });
        }
        const result = await thresholdService.createThreshold(
            sensorTypeId,
            thresholdValue,
            AQIValues
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


module.exports = {getAll, createThreshold}
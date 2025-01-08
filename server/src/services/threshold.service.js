const Threshold = require('../models/thresholdModel');

const getAll =  async () =>{
    try {
        const threshold = await Threshold.find();
        return threshold;
    } catch (error) {
        throw new Error(error.message);
    }
};
//Thiết lặp ngưỡng
const createThreshold =  async (sensorTypeId, thresholdValue, AQIValues) =>{
    try {
        const newThreshold = new Threshold({
            sensorTypeId,
            thresholdValue,
            AQIValues,
        });
        const savedThreshold = await newThreshold.save();
        return savedThreshold;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {getAll, createThreshold}
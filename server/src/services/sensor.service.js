const SensorModel = require("../models/sensorModel");
const getAllSensor=  async () =>{
    try {
        const sensors = await SensorModel.find();
        return sensors;
    } catch (error) {
        throw new Error(error.message);
    }
};
const getSensorByLocationAndType = async (locationId, sensorTypeId) => {
    return await SensorModel.findOne({ locationId, sensorTypeId });
};

const getAllSensorsFromLocation = async (locationId) => {
    return await SensorModel.find({locationId});
};
const createSensor = async (sensorId, locationId, sensorTypeId, status = "active") => {
    try {
        const newSensor = new SensorModel({
            sensorId,
            locationId,
            sensorTypeId,
            status,
        });
        const savedSensor = await newSensor.save();
        return savedSensor;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { createSensor , getAllSensor, getSensorByLocationAndType, getAllSensorsFromLocation};

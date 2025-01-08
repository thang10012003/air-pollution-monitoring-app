const SensorType = require('../models/sensorTypeModel')


const getAllType =  async () =>{
    try {
        const Type = await SensorType.find();
        return Type;
    } catch (error) {
        throw new Error(error.message);
    }
};
const createSensorType = async (typeName, description) => {
    try {
        const newType = new SensorType({
            typeName,
            description,
        });
        const savedType = await newType.save();
        return savedType;
    } catch (error) {
        throw new Error(error.message);
    }
};
const deleteSensorTypeById = async (id) => {
    try {
        const result = await SensorType.findByIdAndDelete(id);
        if (!result) {
            throw new Error("SensorType not found");
        }
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getAllType, createSensorType, deleteSensorTypeById };


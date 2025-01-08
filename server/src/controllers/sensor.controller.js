const sensorService = require("../services/sensor.service");

const getAllSensor =  async (req, res) =>{
    try {
        const sensors = await sensorService.getAllSensor();
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
const createSensor = async (req, res) => {
    try {
        const { sensorId, locationId, sensorTypeId, status } = req.body;

        // Validate dữ liệu
        if (!sensorId || !locationId || !sensorTypeId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newSensor = await sensorService.createSensor(
            sensorId,
            locationId,
            sensorTypeId,
            status
        );
        res.status(201).json(newSensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createSensor, getAllSensor };

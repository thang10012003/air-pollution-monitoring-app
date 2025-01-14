const sensorService = require("../services/sensor.service");
const locationService = require("../services/location.service");
const sensorTypeService = require("../services/sensorType.service");

const getAllSensor = async (req, res) => {
    try {
        const sensors = await sensorService.getAllSensor();
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSensor = async (req, res) => {
    try {
        const { sensorId, locationId, sensorTypeId, status } = req.body;

        // Validate dữ liệu
        if (!locationId || !sensorTypeId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Kiểm tra xem Location có tồn tại không
        const locationExists = await locationService.getLocationById(locationId);
        if (!locationExists) {
            return res.status(404).json({ message: "Location not found" });
        }

        // Kiểm tra xem SensorType có tồn tại không
        const sensorTypeExists = await sensorTypeService.getSensorTypeById(sensorTypeId);
        if (!sensorTypeExists) {
            return res.status(404).json({ message: "SensorType not found" });
        }

        // Kiểm tra xem Sensor đã tồn tại chưa
        const existingSensor = await sensorService.getSensorByLocationAndType(locationId, sensorTypeId);
        if (existingSensor) {
            return res.status(400).json({ message: "Sensor with this Location and SensorType already exists" });
        }

        // Tạo Sensor mới
        const newSensor = await sensorService.createSensor(sensorId, locationId, sensorTypeId, status);
        res.status(201).json(newSensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllSensorFromLocation = async(req, res) => {
    try{
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Location ID is required" });
        }
        const sensor = await sensorService.getAllSensorsFromLocation(id);

        if (!sensor) {
            return res.status(404).json({ message: "Sensor not found" });
        }

        res.status(200).json(sensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { createSensor, getAllSensor, getAllSensorFromLocation };

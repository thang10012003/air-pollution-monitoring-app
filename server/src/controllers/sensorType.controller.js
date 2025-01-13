const sensorTypeService = require('../services/sensorType.service');

const getAllType =  async (req, res) =>{
    try {
        const type = await sensorTypeService.getAllType();
        res.status(200).json(type);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
//post type
const getSensorTypeById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Sensor Type ID is required" });
        }

        const sensorType = await sensorTypeService.getSensorTypeById(id);

        if (!sensorType) {
            return res.status(404).json({ message: "Sensor Type not found" });
        }

        res.status(200).json(sensorType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createType = async (req, res) => {
    try {
        const { typeName, description } = req.body;

        if (!typeName || typeName.length === 0) {
            return res.status(400).json({ message: "Values must not be empty" });
        }

        const result = await sensorTypeService.createSensorType(
            typeName,
            description
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE type by id
const deleteType = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        const result = await sensorTypeService.deleteSensorTypeById(id);
        res.status(200).json({ message: "Deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllType, createType, deleteType, getSensorTypeById };
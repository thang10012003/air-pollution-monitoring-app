const dataService = require('../services/sensorData.service');



const getAllData =  async (req, res) =>{
    try {
        const data = await dataService.getAllData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
//post data
const createData =  async (req, res) => {
    try {
        const { sensorId, values } = req.body;

        if (!sensorId) {
            return res.status(400).json({ message: "SensorId is required" });
        }

        
        const result = await dataService.createData(
            sensorId,
            values
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {getAllData, createData}
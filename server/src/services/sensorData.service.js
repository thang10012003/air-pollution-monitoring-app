const SensorData = require('../models/sensorDataModel')


//get All
const getAllData =  async () =>{
    try {
        const data = await SensorData.find();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
//post data
const createData =  async (sensorId, values) =>{
    try {
        // Tạo dữ liệu mới
        const newData = new SensorData({
            sensorId,
            values,
        });
        // Lưu dữ liệu vào MongoDB
        const savedData = await newData.save();
        return savedData;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getDataFromLocaltion = async (location) =>{
    try{
        
    }catch(error){
        throw new Error(error.message);
    }
}
module.exports = {getAllData, createData, getDataFromLocaltion}
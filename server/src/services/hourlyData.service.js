const HourlyData = require("../models/hourlyDataModel");
const mongoose = require("mongoose");
const getAllHourlyData = async () => {
    try {
        const hourlyData = await HourlyData.find();
        return hourlyData;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getAllHourlyData };
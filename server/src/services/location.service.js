const Location = require("../models/locationModel");

// Lấy danh sách tất cả các địa điểm
const getAllLocations = async () => {
    try {
        const locations = await Location.find();
        return locations;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Tạo mới một địa điểm
const createLocation = async (name, latitude, longtitude) => {
    try {
        const newLocation = new Location({
            name,
            latitude,
            longtitude,
        });
        const savedLocation = await newLocation.save();
        return savedLocation;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getAllLocations, createLocation };

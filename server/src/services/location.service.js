const Location = require("../models/locationModel");
const mongoose = require("mongoose");
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
const createLocation = async (name, latitude, longitude) => {
    try {
        const newLocation = new Location({
            name,
            latitude,
            longitude,
        });
        const savedLocation = await newLocation.save();
        return savedLocation;
    } catch (error) {
        throw new Error(error.message);
    }
};
const updateLocation = async (id, long, lat) => {
    try {
        let location = await Location.findById(id);
        if (!location) {
            return null;
        }

        if (long != null && lat != null) {
            // Cập nhật longitude và latitude nếu có dữ liệu mới
            location.longitude = (long);
            location.latitude = (lat);
        }

        return await location.save();
    } catch (error) {
        console.error("Error updating location:", error);
        throw new Error("Database error");
    }
};

const getLocationById = async (id) => {
    try {
        return await Location.findById(id);
    } catch (error) {
        throw new Error("Error fetching Location by ID");
    }
};


module.exports = { getAllLocations, createLocation, getLocationById, updateLocation};

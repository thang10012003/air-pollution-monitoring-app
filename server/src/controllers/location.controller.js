const locationService = require("../services/location.service");

// Lấy tất cả các địa điểm
const getAllLocations = async (req, res) => {
    try {
        const locations = await locationService.getAllLocations();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo mới một địa điểm
const createLocation = async (req, res) => {
    try {
        const { name, latitude, longtitude } = req.body;

        // Kiểm tra đầu vào
        if (!name || !latitude || !longtitude) {
            return res.status(400).json({ message: "Values must not be empty" });
        }

        const result = await locationService.createLocation(name, latitude, longtitude);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllLocations, createLocation };

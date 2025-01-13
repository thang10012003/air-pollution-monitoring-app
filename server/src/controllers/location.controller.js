const locationService = require("../services/location.service");

const getAllLocations = async (req, res) => {
    try {
        const locations = await locationService.getAllLocations();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Location ID is required" });
        }
        const location = await locationService.getLocationById(id);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createLocation = async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body;

        // Kiểm tra đầu vào
        if (!name || !latitude || !longitude) {
            return res.status(400).json({ message: "Values must not be empty" });
        }

        const result = await locationService.createLocation(name, latitude, longitude);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateLocation = async (req, res) => {
    try {
        const { id, longitude, latitude } = req.body;

        if (!id || !longitude || !latitude) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const updatedLocation = await locationService.updateLocation(id, longitude, latitude);

        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json({
            message: "Location updated successfully",
            data: updatedLocation
        });

    } catch (error) {
        console.error("Error updating location:", error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getAllLocations, createLocation, getLocationById, updateLocation };

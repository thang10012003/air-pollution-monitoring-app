const express = require("express");
const router = express.Router();
const locationController = require("../controllers/location.controller");

// Lấy danh sách tất cả các địa điểm
router.get("/", locationController.getAllLocations);
router.get("/:id", locationController.getLocationById);
router.post("/update", locationController.updateLocation);


// Tạo mới một địa điểm
router.post("/", locationController.createLocation);

module.exports = router;

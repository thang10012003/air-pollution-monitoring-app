const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    sensorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sensor",
        required: true,
    },
    warningScale: {
        type: String,
        enum: ["low", "medium", "high", "critical"], // Enum tùy chỉnh
        required: true,
    },
    alertTime: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Alert", AlertSchema);

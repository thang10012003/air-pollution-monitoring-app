const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
    sensorId: {
        type: Number,
        required: true,
        unique: true,
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    sensorTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SensorType",
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "maintenance"],
        default: "active",
    },
});

const SensorModel = mongoose.model("Sensor", SensorSchema);
module.exports = SensorModel;

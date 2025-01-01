const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
    sensor_id: {
        type: Number,
        required: true,
        unique: true,
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    sensor_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SensorType",
        required: true,
    },
    installation_date: {
        type: Date,
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

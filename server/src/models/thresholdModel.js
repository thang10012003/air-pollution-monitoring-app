const mongoose = require("mongoose");

const ThresholdSchema = new mongoose.Schema({
    sensorTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SensorType",
        required: true,
    },
    thresholdValue: {
        type: Number,
        required: true,
    },
    AQIValues: [
        {
        level: { type: String, required: true }, // Mức độ AQI: "Good", "Moderate", "Unhealthy", v.v.
        minValue: { type: Number, required: true }, // Giá trị AQI tối thiểu
        maxValue: { type: Number, required: true }, // Giá trị AQI tối đa
        },
    ],
});

module.exports = mongoose.model("Threshold", ThresholdSchema);


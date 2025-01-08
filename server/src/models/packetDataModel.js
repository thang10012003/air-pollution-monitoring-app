const mongoose = require("mongoose");

const PacketDataSchema = new mongoose.Schema({
    dataset: [
        {
        sensorId: {
            type: Number,
            ref: "Sensor", 
            required: true,
        },
        timestamp: {
            type: Date,
            required: true,
        },
        dataType: {
            type: String,
            required: true,
        },
        dataValue: {
            type: mongoose.Schema.Types.Decimal128,
            required: true,
        },
        },
    ],
    evaluate: {
        type: String,
        enum: ["Good", "Moderate", "Unhealthy", "Hazardous"], 
        required: true,
    },
});

module.exports = mongoose.model("PacketData", PacketDataSchema);

const mongoose = require("mongoose");

const PacketDataSchema = new mongoose.Schema({
    location : {
        required : true,
        type: mongoose.Schema.Types.ObjectId,
    },
    dataset: [
        {
        timestamp: {
            type: Date,
            // required: true,
            default : Date.now(),
        },
        dataType: {
            type: String,
            required: true,
        },
        dataValue: {
            type: String,
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

const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
    alert_id: {
        type: Number,
        required: true,
        unique: true,
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    sensor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sensor",
        required: true,
    },
    threshold_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Threshold",
        required: true,
    },
    alert_type: {
        type: String,
        enum: ["normal", "warning", "info"], 
        required: true,
    },
    alert_time: {
        type: Date,
        default: Date.now,
    },
    message: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true, 
});

const AlertModel = mongoose.model("Alert", AlertSchema);
module.exports = AlertModel;

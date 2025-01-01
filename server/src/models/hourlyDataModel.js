const { default: mongoose } = require("mongoose");

const HourlyDataSchema = new mongoose.Schema({
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    hour_start: {
        type: Date,
        required: true,
    },
    avg_pm25: {
        type: mongoose.Schema.Types.Decimal128,
    },
    avg_temperature: {
        type: mongoose.Schema.Types.Decimal128,
    },
    avg_humidity: {
        type: mongoose.Schema.Types.Decimal128,
    },
    avg_mq7_value: {
        type: mongoose.Schema.Types.Decimal128,
    },
    avg_mq135_value: {
        type: mongoose.Schema.Types.Decimal128,
    },
    min_pm25: {
        type: mongoose.Schema.Types.Decimal128, 
    },
    max_pm25: {
        type: mongoose.Schema.Types.Decimal128, 
    },
    min_temperature: {
        type: mongoose.Schema.Types.Decimal128, 
    },
    max_temperature: {
        type: mongoose.Schema.Types.Decimal128, 
    },
    min_humidity: {
        type: mongoose.Schema.Types.Decimal128, 
    },
    max_humidity: {
        type: mongoose.Schema.Types.Decimal128, 
    },
    min_mq135_value: {
        type: mongoose.Schema.Types.Decimal128, 
    },
    max_mq135_value: {
        type: mongoose.Schema.Types.Decimal128, 
    },
    min_mq7_value: {
        type: mongoose.Schema.Types.Decimal128, 
    },
    max_mq7_value: {
        type: mongoose.Schema.Types.Decimal128, 
    },
    data_count: {
        type: Number, 
        default: 0,
    },
    status: {
        type: String, 
        enum: ["normal", "alert", "danger"],
        default: "normal",
    },
    alert_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alert", 
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const HourlyDataModel = mongoose.model("HourlyData", HourlyDataSchema);
module.exports = HourlyDataModel;

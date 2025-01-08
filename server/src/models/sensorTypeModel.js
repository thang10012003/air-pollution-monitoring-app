const mongoose = require("mongoose");

const SensorTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: Date.now(),
    },
});

const SensorTypeModel = mongoose.model("SensorType", SensorTypeSchema);

module.exports = SensorTypeModel;

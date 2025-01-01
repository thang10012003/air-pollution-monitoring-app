const { default: mongoose, modelNames } = require("mongoose");

const SensorTypeSchema = new mongoose.Schema({
    description: {
        type: Date,
        default: Date.now(),
        require: true,
    },
    type_name: {
        type: String,
        require: true,
    }
});
const SensorTypeModel = mongoose.model("SensorType", SensorTypeSchema);

module.exports = SensorTypeModel;
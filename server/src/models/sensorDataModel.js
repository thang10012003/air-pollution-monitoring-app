const { default: mongoose, modelNames } = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
    createAt: {
        type: Date,
        default: Date.now(),
        require: true,
    },
    value: {
        type: mongoose.Schema.Types.Decimal128,
        require: true,
    }
},{
    timestamps: true,
});
const SensorDataModel = mongoose.model("SensorData", SensorDataSchema);

module.exports = SensorDataModel;
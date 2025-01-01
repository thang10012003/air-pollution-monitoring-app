const { default: mongoose, modelNames } = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
    createAt: {
        type: Date,
        default: Date.now(),
        require: true,
    },
    sensor_name:{
        type : String,
        require: true,
    },
    value: {
        type: mongoose.Schema.Types.Decimal128,
        require: true,
    },
    threshold:{
        type : int,
        require: true,
    }

},{
    timestamps: true,
});
const SensorDataModel = mongoose.model("SensorData", SensorDataSchema);

module.exports = SensorDataModel;
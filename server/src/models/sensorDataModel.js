const { default: mongoose, modelNames } = require("mongoose");

// Định nghĩa các giá trị enum cho trường type
const sensorDataTypes = [
    "AIR_QUALITY", 
    "CO", 
    "DUST_PPM", 
    "HUMIDITY", 
    "TEMPERATURE"
];

const SensorDataSchema = new mongoose.Schema({
    sensorId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: Number,
        // type: String,
        required: true,
        ref: "SensorModel"
    },
    values: [
        {
            type: {
                type: String,
                required: true,
                enum: sensorDataTypes
            }, 
            value: {
                type: mongoose.Schema.Types.Decimal128,
                required: true
            }
        }
    ]
}, {
    timestamps: true,
});

const SensorDataModel = mongoose.model("SensorData", SensorDataSchema);

module.exports = SensorDataModel;
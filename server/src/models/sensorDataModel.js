const { default: mongoose, modelNames } = require("mongoose");

// Định nghĩa các giá trị enum cho trường type
const sensorDataTypes = [
    "air-quality", 
    "CO", 
    "dust-ppm", 
    "humidity", 
    "temperature"
];

const SensorDataSchema = new mongoose.Schema({
    sensorId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
        ref: "SensorModel"
    },
    values: [
        {
            type: {
                type: String,
                required: true,
                enum: sensorDataTypes // Sử dụng enum để chỉ định các giá trị hợp lệ
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
const { default: mongoose } = require("mongoose");

const HourlyDataSchema = new mongoose.Schema({
    hour_start: {
        type: Date,
        required: true,
    },
    avg_values: [
        {
            dataType: { type: String, required: true }, 
            avgValue: { type: mongoose.Schema.Types.Decimal128, required: true },
        },
    ],
    min_values: [
        {
            dataType: { type: String, required: true }, 
            minValue: { type: mongoose.Schema.Types.Decimal128, required: true }, 
        },
    ],
    max_values: [
        {
            dataType: { type: String, required: true }, 
            maxValue: { type: mongoose.Schema.Types.Decimal128, required: true },
        },
    ],
    data_count: {
        type: Number, 
        default: 0,
    },
    packetIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PacketData", 
        },
    ],
});

const HourlyDataModel = mongoose.model("HourlyData", HourlyDataSchema);
module.exports = HourlyDataModel;

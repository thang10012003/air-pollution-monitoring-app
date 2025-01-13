const { default: mongoose } = require("mongoose");

const HistorySchema = new mongoose.Schema({
    date:[{
        type: Date,
        require: true,
        default: Date.now
    }],
    location:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        require: true,
    },
    hourlyData:[
        {
            level: { type: String, required: true }, // Mức độ AQI: "Good", "Moderate", "Unhealthy", v.v.
            minValue: { type: Number, required: true }, // Giá trị AQI tối thiểu
            maxValue: { type: Number, required: true }, // Giá trị AQI tối đa
        },
    ],
});

const HistoryModel = mongoose.model("History", HistorySchema);
module.exports = HistoryModel;

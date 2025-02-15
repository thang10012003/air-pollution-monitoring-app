const mongoose = require("mongoose");

const HourlyDataSchema = new mongoose.Schema({
    packetId: {
        type: String,
        required: true,
        ref: "PacketData"
    },
    dates: [
        {
            date: { type: Date, required: true }, // Ngày lưu dữ liệu
            timeSeries: [
                {
                    hour: { type: Number, required: true }, // Mốc thời gian (0, 3, 6, ...)
                    dataset: {
                        temperature: { type: Number, required: true }, // Giá trị trung bình nhiệt độ
                        humidity: { type: Number, required: true },    // Giá trị trung bình độ ẩm
                        CO2: { type: Number, required: true },        // Giá trị trung bình CO2
                        CO: { type: Number, required: true },         // Giá trị trung bình CO
                        dust: { type: Number, required: true }        // Giá trị trung bình bụi
                    }
                }
            ]
        }
    ]
});

const HourlyDataModel = mongoose.model("HourlyData", HourlyDataSchema);
module.exports = HourlyDataModel;

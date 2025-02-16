const { default: mongoose } = require("mongoose");

const HistorySchema = new mongoose.Schema({
    packetId: {
        type: String,
        required: true,
        ref: "PacketData" 
    },
    records: [
        {
            co2: { type: Number, required: true },
            co: { type: Number, required: true },
            dust: { type: Number, required: true },
            temperature: { type: Number, required: true },
            humidity: { type: Number, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

const HistoryModel = mongoose.model("History", HistorySchema);

module.exports = HistoryModel;

async function addHistoryRecord(packetId, data) {
    try {
        let history = await HistoryModel.findOne({ packetId });

        if (!history) {
            history = new HistoryModel({ packetId, records: [] });
        }

        history.records.push({
            co2: data.co2,
            co: data.co,
            dust: data.dust,
            temperature: data.temperature,
            humidity: data.humidity
        });

        // Giữ tối đa 20 bản ghi gần nhất
        if (history.records.length > 20) {
            history.records.shift();
        }

        await history.save();
        console.log("✅ Đã cập nhật lịch sử thành công.");
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật lịch sử:", error);
    }
}

module.exports.addHistoryRecord = addHistoryRecord;

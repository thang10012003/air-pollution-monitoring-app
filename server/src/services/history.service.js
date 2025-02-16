const HistoryModel = require("../models/historyModel.js");

/**
 * Lấy lịch sử theo packetId
 * @param {ObjectId} packetId - ID của PacketData
 * @returns {Promise<Object>} - Lịch sử cảm biến
 */
async function getHistoryByPacketId(packetId) {
    return await HistoryModel.findOne({ packetId }).lean();
}

async function addHistoryRecord(packetId, data) {
    let history = await HistoryModel.findOne({ packetId });

    if (!history) {
        history = new HistoryModel({ packetId, records: [] });
    }

    history.records.push({
        co2: data.co2,
        co: data.co,
        dust: data.dust,
        temp: data.temp,
        humidity: data.humidity
    });

    // Giữ tối đa 20 bản ghi gần nhất
    if (history.records.length > 20) {
        history.records.shift();
    }

    await history.save();
    return history;
}

module.exports = { getHistoryByPacketId, addHistoryRecord };
const { getHistoryByPacketId, addHistoryRecord } = require("../services/history.service");

/**
 * API: Lấy lịch sử cảm biến
 */
async function getHistory(req, res) {
    try {
        const { packetId } = req.params;
        const history = await getHistoryByPacketId(packetId);

        if (!history) {
            return res.status(404).json({ message: "Không tìm thấy lịch sử" });
        }

        res.status(200).json({ message: "Thành công", result: history });
    } catch (error) {
        console.error("❌ Lỗi khi lấy lịch sử:", error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
}

/**
 * API: Thêm bản ghi lịch sử mới
 */
async function createHistoryRecord(req, res) {
    try {
        const { packetId } = req.body;
        const { co2, co, dust, temp, humidity } = req.body;

        if (!packetId || !co2 || !co || !dust || !temp || !humidity) {
            return res.status(400).json({ message: "Thiếu dữ liệu đầu vào" });
        }

        const history = await addHistoryRecord(packetId, { co2, co, dust, temp, humidity });
        res.status(201).json({ message: "Thêm bản ghi thành công", result: history });
    } catch (error) {
        console.error("❌ Lỗi khi thêm lịch sử:", error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
}

module.exports = { getHistory, createHistoryRecord };

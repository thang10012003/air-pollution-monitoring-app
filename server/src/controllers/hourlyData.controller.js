const HourlyDataService = require("../services/hourlyData.service");

class HourlyDataController {
    // API tạo dữ liệu
    static async createHourlyData(req, res) {
        try {
            const { packetId, dates } = req.body;
            const result = await HourlyDataService.createHourlyData(packetId, dates);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // API lấy dữ liệu theo packetId
    static async getHourlyDataByPacketId(req, res) {
        try {
            const { packetId } = req.params;
            const data = await HourlyDataService.getHourlyDataByPacketId(packetId);
            if (!data) return res.status(404).json({ message: "No data found" });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getHourlyDataByPacketIdAndDate(req, res) {
        try {
            const { packetId, date } = req.params;
            const data = await HourlyDataService.getHourlyDataByPacketIdAndDate(packetId, date);
            if (!data) return res.status(404).json({ message: "No data found" });
            // res.json(data);

            return res.status(200).json({
                message: "Get data successfully.",
                data:({
                    data
                })})
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // API cập nhật dữ liệu theo packetId và ngày
    static async updateHourlyData(req, res) {
        try {
            const { packetId } = req.params;
            const { date, newTimeSeries } = req.body;
            const updatedData = await HourlyDataService.updateHourlyData(packetId, date, newTimeSeries);
            res.json(updatedData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // API xóa dữ liệu theo packetId
    static async deleteHourlyData(req, res) {
        try {
            const { packetId } = req.params;
            await HourlyDataService.deleteHourlyData(packetId);
            res.json({ message: "Data deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = HourlyDataController;

const HourlyDataModel = require("../models/HourlyData");

class HourlyDataService {
    // Tạo dữ liệu mới
    static async createHourlyData(packetId, dates) {
        try {
            const newData = new HourlyDataModel({ packetId, dates });
            return await newData.save();
        } catch (error) {
            throw new Error("Error creating hourly data: " + error.message);
        }
    }

    // Lấy dữ liệu theo packetId
    static async getHourlyDataByPacketId(packetId) {
        try {
            return await HourlyDataModel.findOne({ packetId });
        } catch (error) {
            throw new Error("Error fetching hourly data: " + error.message);
        }
    }

    // Cập nhật dữ liệu theo packetId và ngày
    static async updateHourlyData(packetId, date, newTimeSeries) {
        try {
            const result = await HourlyDataModel.findOneAndUpdate(
                { packetId, "dates.date": date },
                { $push: { "dates.$.timeSeries": { $each: newTimeSeries } } },
                { new: true }
            );
            return result;
        } catch (error) {
            throw new Error("Error updating hourly data: " + error.message);
        }
    }

    // Xóa dữ liệu theo packetId
    static async deleteHourlyData(packetId) {
        try {
            return await HourlyDataModel.deleteOne({ packetId });
        } catch (error) {
            throw new Error("Error deleting hourly data: " + error.message);
        }
    }
}

module.exports = HourlyDataService;

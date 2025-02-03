const hourlyDataService = require("../services/hourlyData.service");
const PacketData = require("../models/packetDataModel");
const getAllHourlyDatas = async (req, res) => {
    try {
        const hourlyData = await hourlyDataService.getAllHourlyData();
        res.status(200).json(hourlyData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateHourlyDataController = async (req, res) => {
    try {
        const { packetId } = req.params;

        // Kiểm tra packetId
        if (!mongoose.Types.ObjectId.isValid(packetId)) {
            return res.status(400).json({ message: "Invalid packetId" });
        }

        // Lấy packetData từ database
        const packetData = await PacketData.findById(packetId);

        if (!packetData) {
            return res.status(404).json({ message: "PacketData not found" });
        }

        // Cập nhật HourlyData
        await hourlyDataService.addOrUpdateHourlyData(packetData);

        return res.status(200).json({ message: "HourlyData updated successfully" });
    } catch (error) {
        console.error("Error in updateHourlyDataController:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { updateHourlyDataController, getAllHourlyDatas };

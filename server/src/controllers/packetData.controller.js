const packetDataService = require("../services/packetData.service");
const {getLocationById} = require('../services/location.service');
const createOrUpdatePacketData = async (req, res) => {
    try {
        const { location, dataset} = req.body;

        // Validate dữ liệu đầu vào
        if (!location || !dataset || !Array.isArray(dataset) ) {
            return res.status(400).json({ message: "Missing or invalid required fields" });
        }

        // Kiểm tra từng phần tử trong dataset
        for (const data of dataset) {
            if (!data.dataType || data.dataValue === undefined) {
                return res.status(400).json({
                    message: "Each data in dataset must include dataType and dataValue",
                });
            }
        }

        // Gọi service để xử lý Create/Update
        const updatedPacketData = await packetDataService.createOrUpdatePacketData(location, dataset);

        res.status(200).json({
            message: "PacketData processed successfully",
            data: updatedPacketData,
        });
    } catch (error) {
        console.error("Error processing PacketData:", error);
        res.status(500).json({ message: error.message });
    }
};

const getAllPacketData =  async (req, res) =>{
    try {
        const packets = await packetDataService.getAllPacketData();
        const data = [];
        packets.forEach((packet) =>
            data.push({
                id: packet.id,
                locationId : packet.location,
                longitude: getLocationById(packet.location).longitude,
                latitude: getLocationById(packet.location).latitude,
                humidity: packet.dataset[3].dataValue,
                temperature: packet.dataset[2].dataValue,
                CO: packet.dataset[1].dataValue,
                airQuality: packet.dataset[0].dataValue,
                rain: packet.dataset[5].dataValue,
                dust: packet.dataset[4].dataValue,
                evaluate: packet.evaluate,
                time: packet.dataset[3].timestamp,
            })
        );
        res.status(200).json({
            message: "Get packet successfully",
            data
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
const deleteDataset = async (req, res) => {
    try {
        const { location, dataType } = req.body;

        // Validate dữ liệu đầu vào
        if (!location || !dataType) {
            return res.status(400).json({ message: "Missing location or dataType." });
        }

        // Gọi service để xử lý xóa sensor
        const updatedPacketData = await packetDataService.deleteDatasetByType(location, dataType);

        res.status(200).json({
            message: `Sensor with dataType "${dataType}" deleted successfully.`,
            data: updatedPacketData,
        });
    } catch (error) {
        console.error("Error deleting sensor data:", error);
        res.status(400).json({ message: error.message });
    }
};
const getNearestPacketData = async (req, res) => {
    try {
        const { longitude, latitude } = req.params;

        if (!longitude || !latitude) {
            return res.status(400).json({ message: "Missing longitude or latitude in the request." });
        }

        // Convert string to numbers
        const lon = parseFloat(longitude);
        const lat = parseFloat(latitude);

        if (isNaN(lon) || isNaN(lat)) {
            return res.status(400).json({ message: "Invalid longitude or latitude value." });
        }

        const { newPacket, nearestPacket, distance } = await packetDataService.findNearestPacketData(lon, lat);

        res.status(200).json({
            message: "Nearest PacketData found successfully.",
            data:({
                id: newPacket.id,
                locationId: newPacket.location,
                longitude: newPacket.longitude,
                latitude: newPacket.latitude,
                temperature: newPacket.temperature,
                humidity: newPacket.humidity,
                CO: newPacket.CO,
                airQuality: newPacket.airQuality,
                rain: newPacket.rain,
                dust: newPacket.dust,
                evaluate: newPacket.evaluate,
                time: newPacket.time,
                // longitude: getLocationById(newPacket.location).longitude,
                // latitude: getLocationById(newPacket.location).latitude,
                // temperature: newPacket.dataset[2].dataValue,
                // humidity: newPacket.dataset[3].dataValue,
                // CO: newPacket.dataset[1].dataValue,
                // airQuality: newPacket.dataset[0].dataValue,
                // rain: newPacket.dataset[5].dataValue,
                // dust: newPacket.dataset[4].dataValue,
                // evaluate: newPacket.evaluate,
                // time: newPacket.dataset[3].timestamp,

            }),
            distance: distance.toFixed(2),
        });
    } catch (error) {
        console.error("Error finding nearest packet data by coordinates:", error);
        res.status(500).json({ message: error.message });
    }
};
const getPacketDataByLocationId = async (req, res) => {
    try {
        const { locationId } = req.params;

        // Gọi service để lấy dữ liệu
        const packet = await packetDataService.getPacketDataByIdLocation(locationId);

        // Nếu không tìm thấy dữ liệu, trả về 404
        if (!packet) {
            return res.status(404).json({
                message: `No packet data found for location ID: ${locationId}`
            });
        }

        // Trả về dữ liệu thành công
        res.status(200).json({
            message: "Packet data retrieved successfully",
            data: packet
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrUpdatePacketData, getAllPacketData, deleteDataset, getNearestPacketData, getPacketDataByLocationId
};

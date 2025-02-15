const PacketData = require("../models/packetDataModel.js");
const HourlyData = require("../models/hourlyDataModel.js");
const Location = require("../models/locationModel.js");


const calculateEvaluate = (dataset) => {
    // Lấy các giá trị cần kiểm tra từ dataset
    const airQuality = dataset.find((data) => data.dataType === "AIR_QUALITY");
    const coLevel = dataset.find((data) => data.dataType === "CO");

    // Đưa ra đánh giá dựa trên các điều kiện
    if (airQuality && parseFloat(airQuality.dataValue) > 20 && parseFloat(airQuality.dataValue) <= 40) {
        return "Moderate";
    }
    else if(airQuality && parseFloat(airQuality.dataValue) > 40 && parseFloat(airQuality.dataValue) <= 60){
        return "Unhealthy";
    }
    else if(airQuality && parseFloat(airQuality.dataValue) > 60){
        return "Hazardous";
    }
    return "Good";
};

const createOrUpdatePacketData = async (location, dataset) => {
    // Tìm PacketData theo location
    let packetData = await PacketData.findOne({ location });

    if (packetData) {
        // Cập nhật dataset hiện có
        for (const newSensor of dataset) {
            const existingSensor = packetData.dataset.find(
                (sensor) => sensor.dataType === newSensor.dataType
            );

            if (existingSensor) {
                // Nếu giá trị đã thay đổi, cập nhật nó
                if (existingSensor.dataValue !== newSensor.dataValue) {
                    existingSensor.dataValue = newSensor.dataValue;
                    existingSensor.timestamp = new Date(); // Cập nhật timestamp
                }
            } else {
                // Nếu không tồn tại, thêm mới sensor
                packetData.dataset.push({
                    dataType: newSensor.dataType,
                    dataValue: newSensor.dataValue,
                    timestamp: new Date(),
                });
            }
        }

        // Tính lại evaluate dựa trên dataset mới
        packetData.evaluate = calculateEvaluate(packetData.dataset);
    } else {
        // Nếu không tồn tại, tạo mới PacketData
        packetData = {
            id: nearestPacket.id,
            location: nearestPacket.location,
            latitude: packetLatitude,
            longitude: packetLongitude,
            humidity: nearestPacket.dataset[3].dataValue,
            temperature: nearestPacket.dataset[2].dataValue,
            CO: nearestPacket.dataset[1].dataValue,
            airQuality: nearestPacket.dataset[0].dataValue,
            rain: nearestPacket.dataset[5].dataValue,
            dust: nearestPacket.dataset[4].dataValue,
            evalute: nearestPacket.evaluate,
            time: nearestPacket.dataset[3].timestamp,
        }
    }

    // Lưu vào database
    await packetData.save();

    //Tạo hourly data nếu có dữ liệu mới
    const now = new Date();
    const startOfHour = new Date(now.setMinutes(0, 0, 0)); // Cắt về đầu giờ hiện tại
    const endOfHour = new Date(startOfHour.getTime() + 60 * 60 * 1000); // Kết thúc giờ

    // Lấy tất cả các PacketData trong giờ hiện tại
    const packets = await PacketData.find({
        location,
        "dataset.timestamp": { $gte: startOfHour, $lt: endOfHour }
    });

    if (packets.length > 0) {
        // Tính trung bình các giá trị
        const avgValues = {
            humidity: 0,
            temperature: 0,
            CO: 0,
            airQuality: 0,
            rain: 0,
            dust: 0,
        };

        const count = { humidity: 0, temperature: 0, CO: 0, airQuality: 0, rain: 0, dust: 0 };

        packets.forEach(packet => {
            packet.dataset.forEach(sensor => {
                if (avgValues.hasOwnProperty(sensor.dataType)) {
                    avgValues[sensor.dataType] += parseFloat(sensor.dataValue);
                    count[sensor.dataType]++;
                }
            });
        });

        // Chia lấy trung bình
        for (let key in avgValues) {
            if (count[key] > 0) {
                avgValues[key] /= count[key];
            }
        }

        // Cập nhật hoặc tạo mới dữ liệu HourlyData
        let hourlyData = await HourlyData.findOne({ location, timestamp: startOfHour });

        if (hourlyData) {
            // Cập nhật dữ liệu trung bình của giờ hiện tại
            hourlyData.humidity = avgValues.humidity || hourlyData.humidity;
            hourlyData.temperature = avgValues.temperature || hourlyData.temperature;
            hourlyData.CO = avgValues.CO || hourlyData.CO;
            hourlyData.airQuality = avgValues.airQuality || hourlyData.airQuality;
            hourlyData.rain = avgValues.rain || hourlyData.rain;
            hourlyData.dust = avgValues.dust || hourlyData.dust;
            hourlyData.evaluate = calculateEvaluate([
                { dataType: "AIR_QUALITY", dataValue: avgValues.airQuality },
                { dataType: "CO", dataValue: avgValues.CO }
            ]);
        } else {
            // Nếu chưa có, tạo mới dữ liệu hourly
            hourlyData = new HourlyData({
                location,
                timestamp: startOfHour,
                humidity: avgValues.humidity || null,
                temperature: avgValues.temperature || null,
                CO: avgValues.CO || null,
                airQuality: avgValues.airQuality || null,
                rain: avgValues.rain || null,
                dust: avgValues.dust || null,
                evaluate: calculateEvaluate([
                    { dataType: "AIR_QUALITY", dataValue: avgValues.airQuality },
                    { dataType: "CO", dataValue: avgValues.CO }
                ]),
            });
        }

        await hourlyData.save(); // Lưu HourlyData
    }

};

const deleteDatasetByType = async (location, dataType) => {
    // Tìm packet theo location
    const packetData = await PacketData.findOne({ location });

    if (!packetData) {
        throw new Error("PacketData with the specified location not found.");
    }

    // Kiểm tra xem dataType có tồn tại không
    const initialLength = packetData.dataset.length;
    packetData.dataset = packetData.dataset.filter((sensor) => sensor.dataType !== dataType);

    if (packetData.dataset.length === initialLength) {
        throw new Error(`Sensor with dataType "${dataType}" not found.`);
    }

    // Lưu packetData sau khi xóa sensor
    await packetData.save();

    return packetData;
};

const getAllPacketData = async () => {
    return await PacketData.find();
}

/**
 * Tính khoảng cách giữa hai vị trí (latitude, longitude) sử dụng công thức Haversine
 * @param {Object} loc1 - Vị trí thứ nhất { latitude, longitude }
 * @param {Object} loc2 - Vị trí thứ hai { latitude, longitude }
 * @returns {number} Khoảng cách giữa hai vị trí (km)
 */
const calculateDistance = (loc1, loc2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Bán kính Trái đất (km)

    const dLat = toRad(loc2.latitude - loc1.latitude);
    const dLon = toRad(loc2.longitude - loc1.longitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(loc1.latitude)) *
            Math.cos(toRad(loc2.latitude)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Khoảng cách (km)
};

/**
 * Tìm packetData gần nhất từ locationID
 * @param {String} locationID - ID của vị trí
 * @returns {Object} PacketData gần nhất
 */
const findNearestPacketData = async (longitude, latitude) => {
    const packets = await PacketData.find({});
    let newPacket = null;
    if (packets.length === 0) {
        throw new Error("No PacketData found in the database.");
    }

    let nearestPacket = null;
    let minDistance = Infinity;

    for (const packet of packets) {
        const locationID = packet.location; // Lấy LocationID từ packetData

        // Tìm latitude và longitude từ locationID
        const location = await Location.findById(locationID);
        // console.log(location);
        if (!location) {
            continue; // Nếu không tìm thấy location, bỏ qua
        }

        const packetLatitude = location.latitude;
        const packetLongitude = location.longitude;

        // Tính toán khoảng cách
        const distance = calculateDistance({ latitude, longitude }, { latitude: packetLatitude, longitude: packetLongitude });

        if (distance < minDistance) {
            minDistance = distance;
            nearestPacket = packet;
        }
        // console.log(longitude, latitude, distance);
        newPacket = {
            id: nearestPacket.id,
            location: nearestPacket.location,
            latitude: packetLatitude,
            longitude: packetLongitude,
            humidity: nearestPacket.dataset[3].dataValue,
            temperature: nearestPacket.dataset[2].dataValue,
            CO: nearestPacket.dataset[1].dataValue,
            airQuality: nearestPacket.dataset[0].dataValue,
            rain: nearestPacket.dataset[5].dataValue,
            dust: nearestPacket.dataset[4].dataValue,
            evalute: nearestPacket.evaluate,
            time: nearestPacket.dataset[3].timestamp,
        }
        // console.log(newPacket)
    }

    return { newPacket,nearestPacket, distance: minDistance };
};

module.exports = {
    createOrUpdatePacketData, deleteDatasetByType, getAllPacketData, findNearestPacketData
};

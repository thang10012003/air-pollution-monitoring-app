const PacketData = require("../models/packetDataModel.js");
const HourlyData = require("../models/hourlyDataModel.js");
const Location = require("../models/locationModel.js");
const { addHistoryRecord } = require("../models/historyModel.js");


// const calculateEvaluate = (dataset) => {
//     // Lấy các giá trị cần kiểm tra từ dataset
//     const airQuality = dataset.find((data) => data.dataType === "AIR_QUALITY");
//     const coLevel = dataset.find((data) => data.dataType === "CO");

//     // Đưa ra đánh giá dựa trên các điều kiện
//     if (airQuality && parseFloat(airQuality.dataValue) > 20 && parseFloat(airQuality.dataValue) <= 40) {
//         return "Moderate";
//     }
//     else if(airQuality && parseFloat(airQuality.dataValue) > 40 && parseFloat(airQuality.dataValue) <= 60){
//         return "Unhealthy";
//     }
//     else if(airQuality && parseFloat(airQuality.dataValue) > 60){
//         return "Hazardous";
//     }
//     return "Good";
// };

const createOrUpdatePacketData = async (location, dataset) => {
    let packetData = await PacketData.findOne({ location });
    
    if (packetData) {
        for (const newSensor of dataset) {
            const existingSensor = packetData.dataset.find(
                (sensor) => sensor.dataType === newSensor.dataType
            );

            if (existingSensor) {
                if (existingSensor.dataValue !== newSensor.dataValue) {
                    existingSensor.dataValue = newSensor.dataValue;
                    existingSensor.timestamp = new Date();
                }
            } else {
                packetData.dataset.push({
                    dataType: newSensor.dataType,
                    dataValue: newSensor.dataValue,
                    timestamp: new Date(),
                });
            }
        }
        packetData.evaluate = newSensor.evaluate;
    } else {
        packetData = new PacketData({
            location,
            dataset: dataset.map(sensor => ({
                dataType: sensor.dataType,
                dataValue: sensor.dataValue,
                timestamp: new Date(),
            })),
            evaluate: "Good",
        });
    }

    await packetData.save();

    // ✅ Xử lý HourlyData
    const packetId = packetData._id;
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const date = new Date();
    let hourlyData = await HourlyData.findOne({ packetId });

    if (!hourlyData) {
        hourlyData = new HourlyData({
            packetId,
            dates: []
        });
    }

    let dateEntry = hourlyData.dates.find(entry => entry.date.getTime() === startOfDay.getTime());

    if (!dateEntry) {
        dateEntry = { date: startOfDay, timeSeries: [] };
        hourlyData.dates.push(dateEntry);
    }

    const avgValues = calculateAverages(packetData.dataset);
    console.log(avgValues);
    function calculateAverages(dataset) {
        const avg = { temperature: 0, humidity: 0, CO: 0, CO2: 0, dust: 0 };
        let count = { temperature: 0, humidity: 0, CO: 0, CO2: 0, dust: 0 };

        dataset.forEach(sensor => {
            // if (typeof sensor.dataValue !== 'number' || isNaN(sensor.dataValue)) return;
            switch (sensor.dataType) {
                case "TEMPERATURE":
                    avg.temperature += sensor.dataValue;
                    count.temperature++;
                    break;
                case "HUMIDITY":
                    avg.humidity += sensor.dataValue;
                    count.humidity++;
                    break;
                case "CO":
                    avg.CO += sensor.dataValue;
                    count.CO++;
                    break;
                case "AIR_QUALITY":
                    avg.CO2 += sensor.dataValue;
                    count.CO2++;
                    break;
                case "DUST":
                    avg.dust += sensor.dataValue;
                    count.dust++;
                    break;
            }
        });

        Object.keys(avg).forEach(key => {
            if (count[key] > 0) avg[key] /= count[key];
        });

        return avg;
    }

    function getNearestHourSlot(date) {
        const hour = date.getHours();
        return Math.floor(hour / 3) * 3; // Làm tròn về mốc gần nhất
    }

    const nearestHour = getNearestHourSlot(date);
    console.log("Mốc thời gian cập nhật:", nearestHour);

    const updateAverage = (oldValue, newValue) => {
        if (typeof newValue !== 'number' || isNaN(newValue)) return oldValue ?? 0;
        if (typeof oldValue !== 'number' || isNaN(oldValue)) return newValue;
        return (oldValue + newValue) / 2;
    };

    let timeSeriesEntry = dateEntry.timeSeries.find(entry => entry.hour === nearestHour);

    if (timeSeriesEntry) {
        timeSeriesEntry.dataset.temperature = updateAverage(timeSeriesEntry.dataset.temperature, avgValues.temperature);
        timeSeriesEntry.dataset.humidity = updateAverage(timeSeriesEntry.dataset.humidity, avgValues.humidity);
        timeSeriesEntry.dataset.CO = updateAverage(timeSeriesEntry.dataset.CO, avgValues.CO);
        timeSeriesEntry.dataset.CO2 = updateAverage(timeSeriesEntry.dataset.CO2, avgValues.CO2);
        timeSeriesEntry.dataset.dust = updateAverage(timeSeriesEntry.dataset.dust, avgValues.dust);
    } else {
        dateEntry.timeSeries.push({
            hour: nearestHour,
            dataset: {
                temperature: avgValues.temperature ?? 0,
                humidity: avgValues.humidity ?? 0,
                CO: avgValues.CO ?? 0,
                CO2: avgValues.CO2 ?? 0,
                dust: avgValues.dust ?? 0
            }
        });
    }

    await hourlyData.save();

     // ✅ Lưu giá trị gốc vào historyModel
     const latestValues = Object.fromEntries(packetData.dataset.map(sensor => [sensor.dataType, sensor.dataValue]));

     await addHistoryRecord(packetId, {
         co2: latestValues["AIR_QUALITY"] ?? 0,
         co: latestValues["CO"] ?? 0,
         dust: latestValues["DUST"] ?? 0,
         temperature: latestValues["TEMPERATURE"] ?? 0,
         humidity: latestValues["HUMIDITY"] ?? 0
     });
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

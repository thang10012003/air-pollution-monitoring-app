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
        try {
            let packetData = await PacketData.findOne({ location });
    
            if (!packetData) {
                // Tạo mới PacketData nếu không tồn tại
                packetData = new PacketData({
                    location,
                    dataset: dataset.map((data) => ({
                        dataType: data.dataType,
                        dataValue: data.dataValue,
                        timestamp: data.timestamp || new Date(),
                    })),
                    evaluate: calculateEvaluate(dataset),
                });
            } else {
                // Cập nhật PacketData nếu đã tồn tại
                for (const newSensor of dataset) {
                    const existingSensor = packetData.dataset.find(
                        (sensor) => sensor.dataType === newSensor.dataType
                    );
    
                    if (existingSensor) {
                        // Cập nhật nếu giá trị thay đổi
                        if (existingSensor.dataValue !== newSensor.dataValue) {
                            existingSensor.dataValue = newSensor.dataValue;
                            existingSensor.timestamp = newSensor.timestamp || new Date();
                        }
                    } else {
                        // Thêm mới sensor
                        packetData.dataset.push({
                            dataType: newSensor.dataType,
                            dataValue: newSensor.dataValue,
                            timestamp: newSensor.timestamp || new Date(),
                        });
                    }
                }
    
                // Cập nhật evaluate
                packetData.evaluate = calculateEvaluate(packetData.dataset);
            }
    
            // Gọi cập nhật vào HourlyData
            await addOrUpdateHourlyData(packetData);
    
            // Lưu PacketData
            return await packetData.save();
        } catch (error) {
            if (error.code === 11000) {
                console.error("Duplicate key error occurred!");
                throw new Error("Duplicate packetIds. Please check the data and try again.");
            }
            console.error("Error in createOrUpdatePacketData:", error);
            throw error;
        }
    };
    
    
    const addOrUpdateHourlyData = async (packetData) => {
        try {
            const now = new Date();
            const currentHour = now.getHours();
            const currentDate = now.setMinutes(0, 0, 0); // Lấy giờ hiện tại, bỏ phút và giây
    
            if (packetData.dataset && Array.isArray(packetData.dataset)) {
                // Tìm HourlyData hiện tại theo date và cập nhật packetIds nếu tồn tại
                const existingHourlyData = await HourlyData.findOne({ date: currentDate });
    
                if (existingHourlyData) {
                    console.log("HourlyData found for the current hour!");
    
                    // Kiểm tra xem đã tồn tại packetIds mới trong HourlyData chưa
                    const newPacketIds = packetData._id;
                    const existingPacketIds = existingHourlyData.packetIds || [];
                    if (!existingPacketIds.includes(newPacketIds)) {
                        existingHourlyData.packetIds.push(newPacketIds);
                    }
    
                    existingHourlyData.dataset.push(...packetData.dataset.map((data) => ({
                        dataType: data.dataType,
                        dataValues: [
                            {
                                value: data.dataValue,
                                timeStamp: new Date(),
                            },
                        ],
                    })));
    
                    // Cập nhật dữ liệu và lưu
                    existingHourlyData.data_count += packetData.dataset.length;
                    await existingHourlyData.save();
    
                    console.log("HourlyData updated successfully with new hour_start and data!");
                } else {
                    // Thêm mới với $addToSet sử dụng ObjectId, không trùng packetIds
                    const newHourlyData = new HourlyData({
                        date: currentDate,
                        hour_start: currentHour,
                        packetIds: [packetData._id],
                        dataset: packetData.dataset.map((data) => data ? {
                            dataType: data.dataType,
                            dataValues: [
                                {
                                    value: data.dataValue,
                                    timeStamp: new Date(),
                                },
                            ],
                        } : {}),
                        data_count: packetData.dataset.length,
                    });
    
                    await newHourlyData.save();
                    console.log("HourlyData created successfully!");
                }
            } else {
                console.log("packetData.dataset is not an array or is undefined.");
            }
        } catch (error) {
            console.error("Error updating HourlyData:", error);
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

        if (packets.length === 0) {
            throw new Error("No PacketData found in the database.");
        }

        let nearestPacket = null;
        let minDistance = Infinity;

        for (const packet of packets) {
            const locationID = packet.location; // Lấy LocationID từ packetData

            // Tìm latitude và longitude từ locationID
            const location = await Location.findById(locationID);
            console.log(location);
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
            console.log(longitude, latitude, distance);
        }

        return { nearestPacket, distance: minDistance };
    };

    module.exports = {
        createOrUpdatePacketData, deleteDatasetByType, getAllPacketData, findNearestPacketData
    };

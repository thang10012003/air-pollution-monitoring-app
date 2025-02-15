const axios = require("axios");
const Papa = require("papaparse");
const {mongoose} = require('mongoose')

require('dotenv').config();

const packetId = "67a43f2cda05ba5d2584da5c"; // Giả định packetId cố định




const HourlyDataModel = require("../models/hourlyDataModel.js");
// Thay DOC_ID bằng ID thực tế của Google Sheets
const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/1oH4yEWCYpwgAHIbUJu229Z2W74RAjVQk0RZXwCIPvWk/gviz/tq?tqx=out:csv";

const fetchGoogleSheetData = async () => {
    try {
        const response = await axios.get(GOOGLE_SHEETS_CSV_URL);
        const csvData = response.data;

        // Parse CSV thành JSON, chỉ lấy 3 dòng đầu
        const parsedData = Papa.parse(csvData, { 
            header: true, 
            skipEmptyLines: true
        });

        // Lấy đúng 3 dòng đầu tiên
        // 
        console.log("✅ Đọc thành công  Google Sheets:");

        // console.table(parsedData.data);

        return parsedData.data;  // Trả về dữ liệu JSON (3 dòng đầu)
    } catch (error) {
        console.error("❌ Lỗi khi đọc Google Sheets:", error);
        return [];
    }
};
// Hàm parse dữ liệu ngày/giờ
const parseExcelDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return null;

    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;

    let [day, month, year] = parts.map((p) => p.padStart(2, "0"));
    if (parseInt(month) > 12) [day, month] = [month, day];

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = timeStr.includes(":") ? timeStr : `${timeStr}:00`;

    const timestamp = new Date(`${formattedDate}T${formattedTime}`);
    return isNaN(timestamp.getTime()) ? null : timestamp;
};

// Hàm xử lý dữ liệu và nhóm theo giờ
const groupByHourlyIntervals = (data) => {
    const groupedData = {};

    data.forEach((row, index) => {
        const timestamp = parseExcelDateTime(row.DATE, row.TIME);
        if (!timestamp) return;

        const dateStr = timestamp.toISOString().split("T")[0]; // YYYY-MM-DD
        const hour = Math.floor(timestamp.getHours() / 3) * 3; // Làm tròn về 0, 3, 6, 9...

        if (!groupedData[packetId]) groupedData[packetId] = {};
        if (!groupedData[packetId][dateStr]) groupedData[packetId][dateStr] = {};
        if (!groupedData[packetId][dateStr][hour]) {
            groupedData[packetId][dateStr][hour] = {
                count: 0, TEMPERATURE: 0, HUMIDITY: 0, CO2: 0, CO: 0, DUST: 0
            };
        }

        groupedData[packetId][dateStr][hour].TEMPERATURE += parseFloat(row.TEMPERATURE) || 0;
        groupedData[packetId][dateStr][hour].HUMIDITY += parseFloat(row.HUMIDITY) || 0;
        groupedData[packetId][dateStr][hour].CO2 += parseFloat(row.CO2) || 0;
        groupedData[packetId][dateStr][hour].CO += parseFloat(row.CO) || 0;
        groupedData[packetId][dateStr][hour].DUST += parseFloat(row.DUST) || 0;
        groupedData[packetId][dateStr][hour].count += 1;
    });

    return groupedData;
};

// Hàm lưu vào MongoDB
const saveToDatabase = async (groupedData) => {
    for (let packetId in groupedData) {
        for (const dateStr in groupedData[packetId]) {
            const timeSeries = [];

            for (const hour in groupedData[packetId][dateStr]) {
                const data = groupedData[packetId][dateStr][hour];
                if (data.count > 0) {
                    timeSeries.push({
                        hour: parseInt(hour),
                        dataset: {
                            temperature: data.TEMPERATURE / data.count,
                            humidity: data.HUMIDITY / data.count,
                            CO2: data.CO2 / data.count,
                            CO: data.CO / data.count,
                            dust: data.DUST / data.count,
                        },
                    });
                }
            }

            const existingDocument = await HourlyDataModel.findOne({ packetId });

            if (existingDocument) {
                // Nếu packetId đã tồn tại, kiểm tra xem ngày có trong danh sách chưa
                const dateIndex = existingDocument.dates.findIndex(d => 
                    d.date.toISOString().split("T")[0] === dateStr
                );

                if (dateIndex !== -1) {
                    // Nếu ngày đã tồn tại, cập nhật timeSeries
                    existingDocument.dates[dateIndex].timeSeries = timeSeries;
                } else {
                    // Nếu ngày chưa có, thêm mới
                    existingDocument.dates.push({ date: new Date(dateStr), timeSeries });
                }

                await existingDocument.save();
                console.log(`✅ Đã cập nhật packetId: ${packetId}, date: ${dateStr}`);
            } else {
                // Nếu packetId chưa tồn tại, tạo mới
                const hourlyData = new HourlyDataModel({
                    packetId,
                    dates: [{ date: new Date(dateStr), timeSeries }],
                });

                await hourlyData.save();
                console.log(`✅ Đã lưu mới packetId: ${packetId}, date: ${dateStr}`);
            }
        }
    }
};


// Chạy quá trình xử lý dữ liệu
const processGoogleSheetData = async () => {
    const rawData = await fetchGoogleSheetData();
    if (rawData.length === 0) return;

    const groupedData = groupByHourlyIntervals(rawData);
    await saveToDatabase(groupedData);
    mongoose.disconnect();
};

// Thực thi chương trình
module.exports = { processGoogleSheetData };
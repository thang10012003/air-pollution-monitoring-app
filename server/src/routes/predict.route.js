const express = require('express');
const predictRouter =  express.Router();
const ort = require("onnxruntime-node");
const { scalerInverseTransform } = require("../utils/scaler");
const path = require("path");
const MODEL_PATH = path.resolve(__dirname, "../ai_models/predict10h_air_model.onnx");

// 🟢 Tạo dữ liệu mẫu nếu không có đủ dữ liệu từ MongoDB
function generateSampleData() {
    const sampleData = [];
    for (let i = 0; i < 20; i++) {
        sampleData.push({
            co2: Math.random() * (600 - 400) + 400,   // Giá trị ngẫu nhiên từ 400-600 ppm
            co: Math.random() * (10 - 1) + 1,         // Giá trị ngẫu nhiên từ 1-10 ppm
            dust: Math.random() * (50 - 10) + 10,     // Giá trị ngẫu nhiên từ 10-50 µg/m³
            temperature: Math.random() * (35 - 20) + 20,     // Giá trị ngẫu nhiên từ 20-35°C
            humidity: Math.random() * (80 - 40) + 40, // Giá trị ngẫu nhiên từ 40-80%
            timestamp: new Date(Date.now() - i * 3600000) // Cách nhau 1 giờ
        });
    }
    return sampleData;
}

// // API để thực hiện dự đoán
// router.get("/predict", async (req, res) => {
//     try {
//         // Load model ONNX
//         const session = await ort.InferenceSession.create(MODEL_PATH);

//         // Lấy 20 dữ liệu cảm biến gần nhất từ MongoDB
//         const latestData = await SensorData.find().sort({ timestamp: -1 }).limit(20);
//         if (latestData.length < 20) {
//             return res.status(400).json({ error: "Không đủ dữ liệu để dự đoán!" });
//         }

//         // Chuyển đổi dữ liệu thành mảng có shape (1, 20, 5)
//         const inputArray = latestData.map(item => [item.co2, item.co, item.dust, item.temp, item.humidity]);
//         const inputTensor = new ort.Tensor("float32", new Float32Array(inputArray.flat()), [1, 20, 5]);

//         // Thực hiện dự đoán
//         const results = await session.run({ [session.inputNames[0]]: inputTensor });

//         // Lấy kết quả dự đoán
//         const prediction = results[session.outputNames[0]].data;
        
//         res.json({ prediction });
//     } catch (error) {
//         console.error("Lỗi khi dự đoán:", error);
//         res.status(500).json({ error: "Lỗi khi dự đoán" });
//     }
// });

predictRouter.get("/predict", async (req, res) => {
    try {
        // 📌 Nhận dữ liệu longitude & latitude từ query params
        const { lat, long } = req.query;

        // 📌 Kiểm tra xem người dùng có truyền tọa độ không
        if (!long || !lat) {
            return res.status(400).json({ error: "Vui lòng cung cấp longitude và latitude!" });
        }
        // Load model ONNX
        const session = await ort.InferenceSession.create(MODEL_PATH);

        // 🟢 Lấy dữ liệu: Thay vì MongoDB, dùng dữ liệu mẫu
        let latestData = generateSampleData();
        console.log("📌 Sử dụng dữ liệu mẫu:", latestData);

        // Chuyển đổi dữ liệu thành mảng có shape (1, 20, 5)
        const inputArray = latestData.map(item => [item.co2, item.co, item.dust, item.temp, item.humidity]);
        const inputTensor = new ort.Tensor("float32", new Float32Array(inputArray.flat()), [1, 20, 5]);

        // 📌 Chạy dự đoán chỉ một lần
        const results = await session.run({ [session.inputNames[0]]: inputTensor });

        // 📌 Lấy kết quả dự đoán
        const predictions = results[session.outputNames[0]].data;

        // Chuyển object thành mảng 1D (lấy values từ object)
        const predictionArray = Object.values(predictions);

        // Chuyển đổi thành mảng 10x3
        const reshapedPredictions = [];
        for (let i = 0; i < 10; i++) {
            reshapedPredictions.push(predictionArray.slice(i * 3, (i + 1) * 3));
        }
        // 🟢 Inverse transform về giá trị gốc
        let realPredictions = scalerInverseTransform(reshapedPredictions);
        // In kết quả
        // console.log(reshapedPredictions);
        // Trả về kết quả
        // return res.json({   realPredictions});



        return res.status(200).json({
            message: "Predicted successfully.",
            data:({
                realPredictions
            })})
        // return res.json({   realPredictions});

        

    } catch (error) {
        console.error("❌ Lỗi khi dự đoán:", error);
        res.status(500).json({ error: "Lỗi khi dự đoán" });
    }
});


module.exports = predictRouter
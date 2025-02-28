const { getHistoryByPacketId, addHistoryRecord } = require("../services/history.service");
const ort = require("onnxruntime-node");
const { scalerInverseTransform } = require("../utils/scaler");
const path = require("path");
const MODEL_PATH = path.resolve(__dirname, "../ai_models/predict10h_air_model.onnx");
/**
 * API: Lấy lịch sử cảm biến
 */
// async function getHistory(req, res) {
//     try {
//         const { packetId } = req.params;
//         const history = await getHistoryByPacketId(packetId);

//         if (!history) {
//             return res.status(404).json({ message: "Không tìm thấy lịch sử" });
//         }

//         res.status(200).json({ message: "Thành công", result: history });
//     } catch (error) {
//         console.error("❌ Lỗi khi lấy lịch sử:", error);
//         res.status(500).json({ message: "Lỗi máy chủ" });
//     }
// }
const extractData = (data) => {
    return data?.records?.map(record => ({
        co2: record.co2,
        co: record.co,
        dust: record.dust,
        temperature: record.temperature,
        humidity: record.humidity,
        timestamp: record.timestamp
    })) || [];
};
const fillMissingData = (data, requiredLength = 20) => {
    if (data.length >= requiredLength) return data;

    const lastElement = data[data.length - 1] || {}; // Lấy phần tử cuối hoặc rỗng nếu data rỗng
    while (data.length < requiredLength) {
        data.push({ ...lastElement }); // Thêm bản sao của phần tử cuối vào mảng
    }
    return data;
};
async function getHistory(req, res) {
    try {
        const { packetId } = req.params;
        const history = await getHistoryByPacketId(packetId);
        if (!history) {
            return res.status(404).json({ message: "Không tìm thấy lịch sử" });
        }
        const formattedData = extractData(history);
        const latestData = fillMissingData(formattedData); // Đảm bảo đủ 20 phần tử
        // console.log(latestData)
        
        // res.status(200).json({ message: "Thành công", result: history });


        // // 📌 Nhận dữ liệu longitude & latitude từ query params
        // const { lat, long } = req.query;

        // // 📌 Kiểm tra xem người dùng có truyền tọa độ không
        // if (!long || !lat) {
        //     return res.status(400).json({ error: "Vui lòng cung cấp longitude và latitude!" });
        // }
        // Load model ONNX
        const session = await ort.InferenceSession.create(MODEL_PATH);

        // 🟢 Lấy dữ liệu: Thay vì MongoDB, dùng dữ liệu mẫu
        // let latestData = generateSampleData();
        // console.log("📌 Sử dụng dữ liệu mẫu:", latestData);

        // Chuyển đổi dữ liệu thành mảng có shape (1, 20, 5)
        const inputArray = latestData.map(item => [item.co2, item.co, item.dust, item.temperature, item.humidity]);
        console.log(inputArray)
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
           
        return res.status(200).json({
            message: "Predicted successfully.",
            data:({
                realPredictions
                // filledMissingData
            })})
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
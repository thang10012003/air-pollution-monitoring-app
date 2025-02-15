const minValues = [10, 20, 300, 0.1, 5];  // Giá trị min khi train
const maxValues = [40, 90, 1200, 5, 500]; // Giá trị max khi train

// Hàm chuẩn hóa dữ liệu
function scalerTransform(data) {
    return data.map(row => row.map((value, i) => (value - minValues[i]) / (maxValues[i] - minValues[i])));
}

// Hàm inverse transform
function scalerInverseTransform(data) {
    return data.map(row => row.map((value, i) => value * (maxValues[i] - minValues[i]) + minValues[i]));
}

module.exports = { scalerTransform, scalerInverseTransform };

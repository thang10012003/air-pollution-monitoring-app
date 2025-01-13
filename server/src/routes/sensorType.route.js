const express = require('express');
const { getAllType, createType, deleteType, getSensorTypeById } = require('../controllers/sensorType.controller');

const router = express.Router();

// Lấy tất cả sensor types
router.get('/', getAllType);
router.get('/:id', getSensorTypeById);


// Tạo mới sensor type
router.post('/', createType);

// Xóa sensor type theo ID
router.delete('/:id', deleteType);

module.exports = router;

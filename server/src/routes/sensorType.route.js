const express = require('express');
const { getAllType, createType, deleteType } = require('../controllers/sensorType.controller');

const router = express.Router();

// Lấy tất cả sensor types
router.get('/', getAllType);

// Tạo mới sensor type
router.post('/', createType);

// Xóa sensor type theo ID
router.delete('/:id', deleteType);

module.exports = router;

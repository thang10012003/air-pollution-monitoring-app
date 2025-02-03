const socketIo = require('socket.io');
const PacketData = require("../models/packetDataModel.js");
const {findNearestPacketData} = require('../services/packetData.service.js')
let io;

const initSocket = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {
        console.log(' A user connected', socket.id);

        // Khi client gửi vị trí của mình (lúc kết nối hoặc khi thay đổi vị trí)
        socket.on('registerLocation', (location) => {
            registerClient(socket, location);
        });

        // Lắng nghe sự kiện 'fetchData' từ client
        socket.on('fetchData', (data) => {
            socket.emit('fetchData', { message: 'Hello from server!' });
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
            // Xóa client khỏi danh sách khi ngắt kết nối
            delete clients[socket.id];
        });
    });

    return io;
};

const getIo = () => {
    if (!io) throw new Error("Socket.io chưa được khởi tạo!");
    return io;
};
///////////////////////////////////////////////////
// Danh sách client với vị trí GPS
const clients = {};

const monitorSensorData = () => {
  const changeStream = PacketData.watch();

  changeStream.on('change', async (change) => {
    if (change.operationType === 'insert') {
      const newData = change.fullDocument;
      console.log(' Cảm biến gửi dữ liệu mới:', newData);

      // Gửi dữ liệu mới cho tất cả client theo vị trí
      for (const clientId in clients) {
        const clientLocation = clients[clientId];

        const nearestData = await findNearestPacketData(clientLocation.longitude, clientLocation.latitude);
        if (nearestData) {
          io.to(clientId).emit('sensorData', nearestData);
        }
      }
    }
  });

  console.log('Change Stream đang theo dõi dữ liệu cảm biến...');
};

// module.exports = { initSocket, getIo };
module.exports = { initSocket, getIo, monitorSensorData }
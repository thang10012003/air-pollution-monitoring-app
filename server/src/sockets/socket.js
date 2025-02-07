const socketIo = require('socket.io');
const PacketData = require("../models/packetDataModel.js");
const {findNearestPacketData} = require('../services/packetData.service.js')

let io;
const clients = [];
const initSocket = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {
        console.log(' A user connected', socket.id);

        // Khi client gửi vị trí của mình (lúc kết nối hoặc khi thay đổi vị trí)
        // socket.on('registerLocation', (location) => {
        socket.on('registerLocation', async(location) => {
            // registerClient(socket, location);
            console.log("Location:", location)
            clients[socket.id] = location;
            // const nearestData = await findNearestPacketData(location.longitude, location.latitude);
            const {newPacket, nearestPacket, distance } = await findNearestPacketData(location.longitude, location.latitude);
            if (newPacket) {
              socket.emit("sensorData", newPacket);
          } else {
              socket.emit("sensorData", { error: "Không tìm thấy cảm biến gần nhất!" });
          }

        });

        socket.on('disconnect', () => {
            console.log('❌ Client disconnected:', socket.id);
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

const monitorSensorData = () => {
  const changeStream = PacketData.watch([], { fullDocument: "updateLookup" });

  changeStream.on('change', async (change) => {
    if (change.operationType === 'insert'|| change.operationType === 'update') {
      const newData = change.fullDocument;
      // console.log(' Cảm biến gửi dữ liệu mới:', newData);

      // Gửi dữ liệu mới cho tất cả client theo vị trí
      for (const clientId in clients) {
        const clientLocation = clients[clientId];

        const {newPacket, nearestPacket, distance }  = await findNearestPacketData(clientLocation.longitude, clientLocation.latitude);
        if (newPacket) {
          io.to(clientId).emit('sensorData', newPacket);
        }
      }
    }
  });

  console.log('Change Stream đang theo dõi dữ liệu cảm biến...');
};

// module.exports = { initSocket, getIo };
module.exports = { initSocket, getIo, monitorSensorData }
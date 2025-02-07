import io, { Socket } from 'socket.io-client';
import { appInfo } from '../constants/appInfo';

// const SOCKET_SERVER = 'https://air-pollution-monitoring-app.onrender.com'; // Thay YOUR_PC_IP bằng địa chỉ IP máy chủ
const SOCKET_SERVER = appInfo.BASE_URL; // Thay YOUR_PC_IP bằng địa chỉ IP máy chủ

let socket:Socket| null = null;

// // Lắng nghe khi kết nối thành công
// newSocket.on('connect', () => {
//     console.log('Connected to Socket.IO server');
//     // socket.emit('message', 'Hello from React Native!');
// });
// const sendLocationToServer = (latitude: String, longitude:String) => {
//     socket.emit("registerLocation", { latitude, longitude });
//   };

// export default newSocket

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_SERVER);

    socket.on("connect", () => {
      console.log("🔌 Kết nối thành công đến WebSocket server", socket?.id);
      socket?.emit("connect","Ket noi thanh cong")
    });
    // Lắng nghe phản hồi từ server
    socket.on("locationReceived", (data) => {
        console.log("📩 Server xác nhận vị trí:", data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Mất kết nối WebSocket");
    });
    
  }
};

export const sendLocationToServer = (latitude: string, longitude: string) => {
  if (socket) {
    socket.emit("registerLocation", { latitude, longitude });
    console.log("📍 Gửi vị trí:", latitude, longitude);
  }else {
    console.log("⚠️ Socket chưa được khởi tạo!");
  }
};
// // Lắng nghe dữ liệu cảm biến từ server
// export const listenToSensorData = (callback: (data: any) => void) => {
//     if (socket) {
//         socket.on("sensorData", (data) => {
//             console.log("📥 Nhận dữ liệu cảm biến mới:", data);
//             callback(data);
//         });
//     }
// };
export const listenToSensorData = (callback: (data: any) => void) => {
    if (!socket) {
        console.log("⚠️ Socket chưa được khởi tạo!");
        return;
    }

    // Xóa listener cũ trước khi đăng ký lại (tránh đăng ký trùng lặp)
    socket.off("sensorData"); 

    // Đăng ký lắng nghe dữ liệu cảm biến
    socket.on("sensorData", (data) => {
        console.log("📥 Nhận dữ liệu cảm biến mới:", data);
        callback(data);
    });

    console.log("✅ Lắng nghe dữ liệu cảm biến từ server...");
};
export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/connectDb');
const app = express();
const errorMiddleware = require('./middlewares/errorMiddleware')
const socketIo = require('socket.io');
const http = require('http')

// Tạo server HTTP từ app Express
const server = http.createServer(app);

// Khởi tạo socket.io và kết nối với server HTTP
const io = socketIo(server);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Express on Vercel"));
const apiRoutes = require('./routes/index')
app.use(apiRoutes);

(async () => {
    try {
      await connectDB();
    } catch (error) {
      console.error("Error syncing database:", error);
    }
  })();

app.use(errorMiddleware);

// app.listen(PORT, (err) => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(`Server starting at http://localhost:${PORT}`);
// });

// Xử lý kết nối WebSocket với Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Lắng nghe sự kiện 'message' từ client
  socket.on('fetchData', (data) => {
      socket.emit('fetchData', { message: 'Hello from server!' });
  });

  // Khi client ngắt kết nối
  socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});

// Chạy server với cả HTTP và WebSocket
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app
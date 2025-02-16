const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/connectDb');
const app = express();
const errorMiddleware = require('./middlewares/errorMiddleware')
const http = require('http')
const {initSocket, monitorSensorData} = require('./sockets/socket')
// const {processGoogleSheetData} = require('./services/processExcel')

// Tạo server HTTP từ app Express
const server = http.createServer(app);

// Khởi tạo socket.io và kết nối với server HTTP
// Khởi động WebSocket
const io = initSocket(server);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Express on Vercel"));
const apiRoutes = require('./routes/index')
app.use(apiRoutes);

(async () => {
    try {
      await connectDB();
      monitorSensorData();
      // processGoogleSheetData();
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



// Chạy server với cả HTTP và WebSocket
server.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app

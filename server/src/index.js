const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/connectDb');
const app = express();
const errorMiddleware = require('./middlewares/errorMiddleware')

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

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server starting at http://localhost:${PORT}`);
});
module.exports = app
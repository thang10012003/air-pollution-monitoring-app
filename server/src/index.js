const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/connectDb');
const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const apiRoutes = require('./routes/index')
app.use(apiRoutes);

(async () => {
    try {
      await connectDB();
    } catch (error) {
      console.error("Error syncing database:", error);
    }
  })();


app.get('/hello', (_req, res) =>{
    res.send(`<h1>Hello</h1>`);
});

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server starting at http://localhost:${PORT}`);
});
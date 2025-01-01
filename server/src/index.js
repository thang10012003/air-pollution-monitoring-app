const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/connectDb');
const app = express();


app.use(cors())

const PORT = process.env.PORT;


connectDB();

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
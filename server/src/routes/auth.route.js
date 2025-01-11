const express = require('express');
const authRouter =  express.Router();

authRouter.post('/register', (_req, res) =>{
    res.send(`<h1>Hello</h1>`);
});
// authRouter.post
module.exports = authRouter
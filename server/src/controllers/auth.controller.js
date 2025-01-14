const authService = require('../services/auth.service');
const asyncHandler = require('express-async-handler')

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const newUser = await authService.register(name, email, password);
        res.status(200).json({
            mess: "Register",
            data: newUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {register}
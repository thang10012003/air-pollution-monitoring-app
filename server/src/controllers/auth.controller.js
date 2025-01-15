const authService = require('../services/auth.service');
const asyncHandler = require('express-async-handler')

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const newUser = await authService.register(name, email, password);
        res.status(200).json({
            mess: "Register",
            data: {
                id: newUser.savedUser.id,
                email: newUser.savedUser.email,
                accessToken: newUser.accessToken,
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const login = async (req, res) => {
    const {email, password} = req.body;
    const isExistUser = await authService.login(email, password);
    if(!isExistUser.success){
        res.status(403).json("Login Failed")
    }else{
        res.status(200).json({
            mess: "Login successfully",
            data: {
                id: isExistUser.user.id,
                email: isExistUser.user.email,
                accessToken: isExistUser.accessToken,
            }
        });
    }
    // res.send(isExistUser)
};
module.exports = {register, login}
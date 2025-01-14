const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt =  require('jsonwebtoken')



const getJWT = (email, id) => {
    const payload = {
        email,
        id
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '7d',
    });

    return token;

} 

const register = async(name, email, password) =>{
    
    //Kiem tra ton tai
    const existUser = await findUser(email);
    if(existUser){
        throw new Error("User has already exist!!!")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
    });
    const savedUser = await newUser.save();
    //lay access token
    const accessToken = await getJWT(email, savedUser.id)

    return {savedUser, accessToken}
    // return savedUser
};
const findUser = async(email) => {
    const existUser = await UserModel.findOne({email});
    return existUser;
} 

module.exports = {register}
const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    }, 
    password: {
        type: String,
        require: true,
    }, 
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt:{
        type: Date, 
        default: Date.now(),
    },
    notification_references:{
        type:String,
    }
},{
    timestamps: true,
});

const UserModel  = mongoose.model('User', UserSchema);
module.exports = UserModel;
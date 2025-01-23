const { default: mongoose } = require("mongoose");

const LocationSchema = new mongoose.Schema({
    name:{
        require: true,
        type: String,
    },
    latitude:{
        require: true,
        type: String,
    },
    longitude:{
        require: true,
        type: String,
    }
});

const LocationModel = mongoose.model("Location", LocationSchema);
module.exports = LocationModel;

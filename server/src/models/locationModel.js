const { default: mongoose } = require("mongoose");

const LocationSchema = new mongoose.Schema({
    name:{
        require: true,
        type: String,
    },
    latitude:{
        require: true,
        type: mongoose.Schema.Types.Decimal128,
    },
    longitude:{
        require: true,
        type: mongoose.Schema.Types.Decimal128,
    }
});

const LocationModel = mongoose.model("Location", LocationSchema);
module.exports = LocationModel;

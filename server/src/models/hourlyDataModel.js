const { default: mongoose } = require("mongoose");

const HourlyDataSchema = new mongoose.Schema({
    
});
const HourlyDataModel = mongoose.model('HourlyData', HourlyDataSchema)
module.exports = HourlyDataModel
const { default: mongoose } = require("mongoose");

const HistorySchema = new mongoose.Schema({
    
});

const HistoryModel = mongoose.model("History", HistorySchema);
module.exports = HistoryModel;

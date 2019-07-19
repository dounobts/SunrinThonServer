const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    months: Number,
    days: Number,
    time: Number,
    roomnumber: Number,
    username: String,
    personalID: Number
});
const roomModel = mongoose.model("room", roomSchema);

module.exports = roomModel;
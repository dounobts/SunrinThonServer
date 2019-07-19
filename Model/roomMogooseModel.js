const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    roomname: String,
    roomnumber: Number,
    username: String,
    maxPeopleNumber: Number,
    months: Number,
    days: Number,
    personalID: Number
});
const roomModel = mongoose.model("room", roomSchema);

module.exports = roomModel;
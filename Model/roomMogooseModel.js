const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    roomname: String,
    roomnumber: Number,
    reservation: Array,
    maxPeopleNumber: Number
});
const roomModel = mongoose.model("room", roomSchema);

module.exports = roomModel;
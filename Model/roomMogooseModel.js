const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    roomname: String,
    roomnumber: Number,
    reservation: Array
});
const roomModel = mongoose.model("room", roomSchema);

module.exports = roomModel;
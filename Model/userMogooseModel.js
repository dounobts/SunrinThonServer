const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: String,
    password: String,
    name: String,
    personalID: String,
    penalty: Number
});
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
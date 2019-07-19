const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: String,
    password: String,
    name: String,
    personalID: String
});
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
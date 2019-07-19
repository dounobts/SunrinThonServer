const mongoose = require("mongoose");

const registerKeySchema = mongoose.Schema({
    personalID: Number,
    registerkey: String
});
const registerKeyModel = mongoose.model("registerkey", registerKeySchema);

module.exports = registerKeyModel;
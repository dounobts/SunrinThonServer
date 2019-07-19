const mongoose = require("mongoose");
const userModel = require("../Model/userMogooseModel");

exports.initialize = config => {
    mongoose.connect(`mongodb://localhost/${config.name}`, {
        useNewUrlParser: true
    });
};

exports.login = (data, callback) => {
    userModel.findOne({username: data.username, password: data.password}, (err, res) => {
        if (err) {
            callback({ message: "login failed", err });
        } else if (res == null) {
            callback({ message: "login failed", err: "user not found" });
        } else {
            callback({ message: "login complete" });
        }
    });
};

exports.register = (data, callback) => {
    userModel.findOne({username: result.username}, (err, res) => {
        if (err) {
            callback({ message: "register failed", err });
        } else if (res == null) {
            new userModel({username: result.username, password: result.password, name: data.name, personalID: data.personalID}).save(err => {
                if (err)
                    callback({ message: "register failed", err });
                else
                    callback({ message: "register complete" });
            });
        } else {
            callback({ message: "register failed", err: "same username is already exist" });
        }
    });
};
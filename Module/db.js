const mongoose = require("mongoose");
const userModel = require("../Model/userMogooseModel");
const roomModel = require("../Model/roomMogooseModel");

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
    userModel.findOne({username: data.username}, (err, res) => {
        if (err) {
            callback({ message: "register failed", err });
        } else if (res == null) {
            new userModel({username: data.username, password: data.password, name: data.name, personalID: data.personalID}).save(err => {
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

exports.getroom = (data, callback) => {
    roomModel.findOne({roomnumber: data.roomnumber, months: data.months, days: data.days, time: data.time}, (err, res) => {
        if (err) {
            callback({ message: "getroom failed", err});
        } else if (res == null) {
            callback({ message: "getroom failed", err: "room not found"});
        } else {
            callback({ message: "getroom complete", data: res});
        }
    });
}

exports.getrooms = (data, callback) => {
    roomModel.find({months: data.months, days: data.days, time: data.time}, (err, res) => {
        if (err) {
            callback({ message: "getroom failed", err});
        } else {
            callback({ message: "getroom complete", data: res});
        }
    });
}

exports.reserve = (data, callback) => {
    roomModel.findOne({roomnumber: data.roomnumber, months: data.months, days: data.days, time: data.time}, (err, res) => {
        if (err) {
            callback({ message: "reserve failed", err});
        } else if (res == null) {
            roomModel.create({
                months: data.months,
                days: data.days,
                time: data.time,
                roomnumber: data.roomnumber,
                purpose: data.purpose,
                username: data.username,
                personalID: data.personalID
            });

            callback({ message: "reserve complete"});
        } else {
            callback({ message: "reserve failed", err: "already reserved"});
        }
    })
}

exports.cancel = (data, callback) => {
    roomModel.findOne({roomnumber: data.roomnumber, months: data.months, days: data.days, time: data.time}, (err, res) => {
        if (err) {
            callback({ message: "cancel failed", err});
        } else if (res == null) {
            callback({ message: "cancel failed", err: "room not found"});
        } else {
            roomModel.deleteOne({roomnumber: data.roomnumber, months: data.months, days: data.days, time: data.time}, (err, res) => {
                if (err) {
                    callback({ message: "cancel failed", err});
                } else {
                    callback({ message: "cancel complete"});
                }
            })
        }
    });
}
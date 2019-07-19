const mongoose = require("mongoose");
const userModel = require("../Model/userMogooseModel");
const roomModel = require("../Model/roomMogooseModel");
const registerKeyModel = require("../Model/registerkeyMogooseModel");
const config = require("../config");

exports.initialize = config => {
    mongoose.connect(`mongodb://localhost/${config.name}`, {
        useNewUrlParser: true
    });
};

exports.login = (data, callback) => {
    if (data.username == config.adminAccount.username && data.password == config.adminAccount.password) {
        callback({ message: "login complete" });
    } else {
        userModel.findOne({username: data.username, password: data.password}, (err, res) => {
            if (err) {
                callback({ message: "login failed", err });
            } else if (res == null) {
                callback({ message: "login failed", err: "user not found" });
            } else {
                callback({ message: "login complete" });
            }
        });
    }
};

exports.register = (data, callback) => {
    if (data.username == config.adminAccount.username) {
        callback({ message: "register failed", err: "same username is already exist"  });
    } else {
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
    }
};

exports.certificate = (data, callback) => {
    registerKeyModel.create({registerkey: data.registerkey, personalID: data.personalID});
    registerKeyModel.findOne({registerkey: data.registerkey}, (err, res) => {
        if (err) {
            callback({ message: "certificate failed", err});
        } else if (res == null) {
            callback({ message: "certificate failed", err: "key not found"});
        } else if (res.personalID != data.personalID) {
            callback({ message: "certificate failed", err: "invalid key"});
        } else {
            callback({ message: "certificate success"})
        }
    })
}

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

exports.getallrooms = (data, callback) => {
    roomModel.find({months: data.months, days: data.days}, (err, res) => {
        if (err) {
            callback({ message: "getallroom failed", err});
        } else {
            callback({ message: "getallroom complete", data: res});
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
            callback({ message: "cancel failed", err });
        } else if (res == null) {
            callback({ message: "cancel failed", err: "room not found" });
        } else {
            roomModel.deleteOne({roomnumber: data.roomnumber, months: data.months, days: data.days, time: data.time}, (err, res) => {
                if (err) {
                    callback({ message: "cancel failed", err });
                } else {
                    callback({ message: "cancel complete"});
                }
            })
        }
    });
}

exports.getMonthRooms = (data, callback) => {
    roomModel.find({months: data.months, username: data.username}, (err, res) => {
        if (err)
            callback({ message: "getMonthRooms failed", err });
        else
            callback({ message: "getMonthRooms complete", data: res });
    });
}
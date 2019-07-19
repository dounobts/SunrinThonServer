const db = require("../Module/db");

exports.getrooms = (req, res) => {
    let data = {
        months: req.body.months,
        days: req.body.days,
        time: req.body.time
    };
    db.getrooms({months: data.months, days: data.days, time: data.time}, result => {
        if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            res.status(200).json({status: "Success", data: result.data});
        }
    });
};

exports.getroom = (req, res) => {
    let data = {
        months: req.body.months,
        days: req.body.days,
        time: req.body.time,
        roomnumber: req.body.roomnumber
    };
    db.getroom({months: data.months, days: data.days, time: data.time, roomnumber: data.roomnumber}, result => {
        if (result.err == "room not found") {
            res.status(404).json({status: "Not Found"});
        } else if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            res.status(200).json({status: "Success"});
        }
    });
};

exports.getallrooms = (req, res) => {
    let data = {
        months: req.body.months,
        days: req.body.days
    };
    db.getallrooms({months: data.months, days: data.days}, result => {
        if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            res.status(200).json({status: "Success", data: result.data});
        }
    });
};

exports.cancel = (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        time: req.body.time,
        roomnumber: req.body.roomnumber,
        username: req.body.username
    };
    db.cancel({roomnumber: data.roomnumber, months: data.months, days: data.days, time: data.time}, result => {
        if (result.err == "room not found") {
            res.status(404).json({status: "Not Found", err: result.err});
        } else if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            res.status(200).json({status: "Success"});
        }
    });
};
exports.getPenalty = (req, res) => {
    let data = {
        username: req.body.username
    };
    db.getPenalty({username: data.username}, result => {
        if (result.err == "user not found") {
            res.status(404).json({status: "Not Found", err: "user not found"});
        } else if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            res.status(200).json({status: "Success", data: result.data});
        }
    });
};
exports.addPenalty = (req, res) => {
    let data = {
        username: req.body.username
    };
    db.addPenalty({username: data.username}, result => {
        if (result.err == "user not found") {
            res.status(404).json({status: "Not Found", err: "user not found"});
        } else if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            res.status(200).json({status: "Success", data: result.data});
        }
    });
};
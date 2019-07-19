const db = require("../Module/db");

exports.reserve = (req, res) => {
    let data = {
        months: req.body.months,
        days: req.body.days,
        time: req.body.time,
        roomnumber: req.body.roomnumber,
        username: req.body.username,
        personalID: req.body.personalID
    };
    db.getMonthRooms({months: data.months, username: data.username}, result => {
        if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            if (result.data.length > 20) {
                res.status(403).json({status: "Forbidden", err: "over limit"});
            } else {
                db.reserve({roomnumber: data.roomnumber, months: data.months, days: data.days, time: data.time, username: data.username, personalID: data.personalID}, result => {
                    if (result.err == "already reserved") {
                        res.status(403).json({status: "Forbidden", err: result.err});
                    } else if (result.err) {
                        res.status(500).json({status: "Internal Server Error", err: result.err});
                    } else {
                        res.status(200).json({status: "Success"});
                    }
                });
            }
        }
    })
};

exports.cancel = (req, res) => {
    let data = {
        months: req.body.months,
        days: req.body.days,
        username: req.body.username,
        time: req.body.time,
        roomnumber: req.body.roomnumber
    };
    db.getroom({roomnumber: data.roomnumber, months: data.months, days: data.days, time: data.time, username: data.username}, result => {
        if (result.err == "room not found") {
            res.status(403).json({status: "Forbidden", err: result.err});
        } else if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            db.cancel({roomnumber: data.roomnumber, months: data.months, days: data.days, time: data.time}, result => {
                if (result.err == "room not found") {
                    res.status(403).json({status: "Forbidden", err: result.err});
                } else if (result.err) {
                    res.status(500).json({status: "Internal Server Error", err: result.err});
                } else {
                    res.status(200).json({status: "Success"});
                }
            });
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
            res.status(200).json({status: "Success", data: result.data});
        }
    });
};

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

exports.getreservedrooms = (req, res) => {
    let data = {
        months: req.body.months,
        username: req.body.username
    };
    db.getreservedrooms({months: data.months, username: data.username}, result => {
        if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            res.status(200).json({status: "Success", data: result.data});
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
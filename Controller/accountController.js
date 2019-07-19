const db = require('../Module/db');

exports.login = (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password
    };
    db.login(data, result => {
        if (result.err == "user not found") {
            res.status(404).json({status: "Not Found"});
        } else if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            res.status(200).json({status: "Success"});
        }
    });
};

exports.register = (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        personalID: req.body.personalID
    };

    db.register(data, result => {
        if (result.err == "user not found") {
            res.status(404).json({status: "Not Found"});
        } else if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            res.status(200).json({status: "Success"});
        }
    });
};
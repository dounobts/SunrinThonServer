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
        if (result.err == "same username is already exist") {
            res.status(403).json({status: "Forbidden"});
        } else if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            res.status(200).json({status: "Success"});
        }
    });
};

exports.certificate = (req, res) => {
    let data = {
        registerkey: req.body.registerkey,
        personalID: req.body.personalID
    };
    db.certificate(data, result => {
        if (result.err == "key not found" || result.err == "invailed key") {
            res.status(403).json({status: "Forbidden", err: result.err});
        } else if (result.err) {
            res.status(500).json({status: "Internal Server Error", err: result.err});
        } else {
            res.status(200).json({status: "Success"});
        }
    });
};

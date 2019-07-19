const db = require('../Module/db');
const jwt = require("../Module/jwt");
const crypto = require('../Module/crypto');

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
            res.status(200).json({status: "Success", token: jwt.encodeToken({
                username: data.username
            })});
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

exports.setProfile = (req, res) => {
    let data = {
        username: req.body.username,
        profileURL: "http://localhost:8080/" + req.file.filename,
        token: req.body.token
    };

    crypto.decrypt({username: data.username}, result => {
        db.setProfileURL({username: result.username, profileURL: data.profileURL}, result => {
            if (result.err) {
                res.status(500).json({
                    status: "Internal Server Error",
                    err: result.err
                });
            } else {
                res.status(200).json({
                    status: "Success"
                });
            }
        });
    });
};

exports.getProfile = (req, res) => {
    let data = {
        username: req.body.username,
        token: req.body.token
    };

    crypto.decrypt({username: data.username}, result => {
        db.getProfile({username: result.username}, result => {
            if (result.err) {
                res.status(500).json({
                    status: "Internal Server Error",
                    err: result.err
                });
            } else {
                res.status(200).json({
                    status: "Success",
                    profile: result.profileURL,
                    name: result.name
                });
            }
        });
    });
};

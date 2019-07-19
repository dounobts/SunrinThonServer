const jwt = require("jwt-simple");
const config = require("../config");

exports.encodeToken = data => {
    return jwt.encode(data, config.key);
}

exports.decodeToken = token => {
    return jwt.decode(token, config.key);
}
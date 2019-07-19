exports.rooms = (req, res) => {
    let data = {
        years: req.body.years,
        months: req.body.months,
        days: req.body.days,
        time: req.body.time
    };
    res.send("Hello World");
};

exports.getroom = (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        roomnumber: req.body.roomnumber
    };
    res.send("Hello World");
};

exports.cancel = (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        time: req.body.time,
        roomnumber: req.body.roomnumber,
    };
    res.send("Hello World");
};
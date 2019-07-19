exports.reserve = (req, res) => {
    let data = {
        years: req.body.years,
        months: req.body.months,
        days: req.body.days,
        time: req.body.time,
        roomnumber: req.body.roomnumber,
        purpose: req.body.purpose,
        username: req.body.username
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
        username: req.body.username
    };
    res.send("Hello World");
};
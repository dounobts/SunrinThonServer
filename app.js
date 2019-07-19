const express = require('express');
const logger = require('morgan');

const app = express();

const reservationRouter = require('./Route/reservation');
const adminRouter = require('./Route/admin');
const accountRouter = require('./Route/account');
const db = require('./Module/db');

const config = require('./config');

db.initialize(config);

app.use(logger(config.environment));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./Static'));

app.use('/reservation', reservationRouter);
app.use('/admin', adminRouter);
app.use('/account', accountRouter);

app.set('views', './View');
app.set('view engine', 'ejs');

app.listen(config.port, console.log("server is running"));
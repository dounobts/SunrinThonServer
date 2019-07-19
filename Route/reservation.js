const express = require('express');
const router = express.Router();
const reservationController = require('../Controller/reservationController');

router.post('/reserve', (req, res) => reservationController.reserve(req, res));
router.post('/cancel', (req, res) => reservationController.cancel(req, res));

module.exports = router;
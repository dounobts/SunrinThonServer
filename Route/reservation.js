const express = require('express');
const router = express.Router();
const reservationController = require('../Controller/reservationController');

router.post('/reserve', (req, res) => reservationController.reserve(req, res));
router.post('/cancel', (req, res) => reservationController.cancel(req, res));
router.post('/getallrooms', (req, res) => reservationController.getallrooms(req, res));
router.post('/getrooms', (req, res) => reservationController.getrooms(req, res));
router.post('/getreservedrooms', (req, res) => reservationController.getreservedrooms(req, res));
router.post('/getroom', (req, res) => reservationController.getroom(req, res));
router.post('/getprofile', (req, res) => reservationController.getprofile(req, res));

module.exports = router;
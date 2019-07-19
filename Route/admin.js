const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminController');

router.post('/getallrooms', (req, res) => adminController.getallrooms(req, res));
router.post('/getrooms', (req, res) => adminController.getrooms(req, res));
router.post('/getroom', (req, res) => adminController.getroom(req, res));
router.post('/cancel', (req, res) => adminController.getroom(req, res));

module.exports = router;
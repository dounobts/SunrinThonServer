const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminController');

router.post('/rooms', (req, res) => adminController.rooms(req, res));
router.post('/getroom', (req, res) => adminController.getroom(req, res));

module.exports = router;
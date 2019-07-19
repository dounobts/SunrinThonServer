const express = require('express');
const router = express.Router();
const accountController = require('../Controller/accountController');

router.post('/login', (req, res) => accountController.login(req, res));
router.post('/register', (req, res) => accountController.register(req, res));

module.exports = router;
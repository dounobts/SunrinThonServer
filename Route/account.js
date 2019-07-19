const express = require('express');
const router = express.Router();
const accountController = require('../Controller/accountController');

router.post('/login', (req, res) => accountController.login(req, res));
router.post('/register', (req, res) => accountController.register(req, res));
router.post('/certificate', (req, res) => accountController.certificate(req, res));

module.exports = router;
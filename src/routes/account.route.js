const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const accountController = require('../controllers/AccountController');

router.post('/', accountController.createOrUpdateAccount);

router.get('/:accountMail', auth, accountController.getAccounts);

router.post('/login', accountController.login);

router.put('/:accountMail', auth, accountController.getAccounts);

module.exports = router;

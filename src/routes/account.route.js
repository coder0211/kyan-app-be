const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const accountController = require('../controllers/AccountController');

router.get('/get-all', auth, accountController.getAll);

router.get('/:accountMail', auth, accountController.getOne);

router.post('/create-or-update', accountController.createOrUpdate);

router.post('/login', accountController.login);

router.delete('/delete', accountController.delete);

module.exports = router;

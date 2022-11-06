const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const conversationController = require('../controllers/ConversationController');

router.get('/get-all', auth, conversationController.getAll);

router.post('/create-or-update', auth, conversationController.createOrUpdate);

router.delete('/delete', auth, conversationController.delete);

module.exports = router;

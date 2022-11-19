const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const conversationMessageController = require('../controllers/ConversationMessageController');

router.get('/get-all', auth, conversationMessageController.getAll);

router.post('/create-or-update', auth, conversationMessageController.createOrUpdate);

router.delete('/delete', auth, conversationMessageController.delete);

module.exports = router;

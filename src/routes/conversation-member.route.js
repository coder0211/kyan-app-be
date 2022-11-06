const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const conversationMemberController = require('../controllers/ConversationMemberController');

router.get('/get-all', auth, conversationMemberController.getAll);

router.post('/create-or-update', auth, conversationMemberController.createOrUpdate);

router.delete('/delete', auth, conversationMemberController.delete);

module.exports = router;

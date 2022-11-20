const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const channelMemberController = require('../controllers/ChannelMemberController');

router.get('/get-all', auth, channelMemberController.getAll);

router.get('/get-member-by-channel-id', auth, channelMemberController.getMemberByChannelId);

router.post('/create-or-update', auth, channelMemberController.createOrUpdate);

router.delete('/delete', auth, channelMemberController.delete);

module.exports = router;

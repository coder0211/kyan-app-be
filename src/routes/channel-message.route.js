const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const channelMessageController = require('../controllers/ChannelMessageController');

router.get('/get-all', auth, channelMessageController.getAll);

router.get('/get-one', auth, channelMessageController.getOne);

router.post('/create-or-update', auth, channelMessageController.createOrUpdate);

router.delete('/delete', auth, channelMessageController.delete);

module.exports = router;

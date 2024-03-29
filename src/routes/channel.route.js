const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const channelController = require('../controllers/ChannelController');

router.get('/get-all', auth, channelController.getAll);

router.get('/get-one', auth, channelController.getOne);

router.get(
    '/get-all-by-account-workspace',
    auth,
    channelController.getAllChannelByAccountWorkSpace,
);

router.post('/create-or-update', auth, channelController.createOrUpdate);

router.delete('/delete', auth, channelController.delete);

module.exports = router;

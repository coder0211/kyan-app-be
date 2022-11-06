const express = require('express');
const router = express.Router();
const accountRoute = require('./account.route');
const taskRoute = require('./task.route');
const workSpaceRoute = require('./work-space.route');
const memberWorkSpaceRoute = require('./member-work-space.route');
const channelRoute = require('./channel.route');
const channelMemberRoute = require('./channel-member.route');
const channelMessageRoute = require('./channel-message.route');
const conversationRoute = require('./conversation.route');
const conversationMemberRoute = require('./conversation-member.route');
const conversationMessageRoute = require('./conversation-message.route');

const uploadFile = require('./upload-file.route');
const attachmentTask = require('./attachment-task.router');

router.get('/', (req, res) => {
    res.send('Welcome to kyan app!');
});
router.use('/account', accountRoute);
router.use('/task', taskRoute);
router.use('/work-space', workSpaceRoute);
router.use('/member-work-space', memberWorkSpaceRoute);
router.use('/channel', channelRoute);
router.use('/channel-member', channelMemberRoute);
router.use('/channel-message', channelMessageRoute);
router.use('/conversation', conversationRoute);
router.use('/conversation-member', conversationMemberRoute);
router.use('/conversation-message', conversationMessageRoute);

router.use('/file', uploadFile);
router.use('/attachment-task', attachmentTask);
module.exports = router;

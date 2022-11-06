const express = require('express');
const router = express.Router();
const accountRoute = require('./account.route');
const taskRoute = require('./task.route');
const workSpaceRoute = require('./work-space.route');
const memberWorkSpaceRoute = require('./member-work-space.route');
const uploadFile = require('./upload-file.route');
const attachmentTask = require('./attachment-task.route');

router.get('/', (req, res) => {
    res.send('Welcome to kyan app!');
});
router.use('/account', accountRoute);
router.use('/task', taskRoute);
router.use('/work-space', workSpaceRoute);
router.use('/member-work-space', memberWorkSpaceRoute);
router.use('/file', uploadFile);
router.use('/attachment-task', attachmentTask);
module.exports = router;

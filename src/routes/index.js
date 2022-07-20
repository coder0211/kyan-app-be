const express = require('express');
const router = express.Router();
const accountRoute = require('./account.route');
const taskRoute = require('./task.route');
const workSpaceRoute = require('./work-space.route');

router.get('/hello', (req, res) => {
    res.send('Welcome to kyan app!');
});
router.use('/account', accountRoute);
router.use('/task', taskRoute);
router.use('/work-space', workSpaceRoute);

module.exports = router;

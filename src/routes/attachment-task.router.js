const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const attachmentTaskController = require('../controllers/AttachmentTaskController');

router.get('/add-file', auth, attachmentTaskController.addFile);

router.post('/get-by-task-id', auth, attachmentTaskController.getByTaskId);

router.delete('/delete', auth, channelMemberController.delete);

module.exports = router;

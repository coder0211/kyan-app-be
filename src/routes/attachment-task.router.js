const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const attachmentTaskController = require('../controllers/AttachmentTaskController');

router.get('/add-file', auth, attachmentTaskController.addFile);

router.post('/get-by-task-id', auth, attachmentTaskController.getByTaskId);

router.delete('/delete', auth, attachmentTaskController.delete);

module.exports = router;

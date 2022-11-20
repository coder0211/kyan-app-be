const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const taskCommentController = require('../controllers/TaskCommentController');

router.get('/get-all-by-task-id', auth, taskCommentController.getAllByTaskId);

router.post('/create-or-update', auth, taskCommentController.createOrUpdate);

router.delete('/delete', auth, taskCommentController.delete);

module.exports = router;

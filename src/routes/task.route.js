const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/TaskController');

router.post('/create-or-update', auth, taskController.createOrUpdate);

router.delete('/deletet', auth, taskController.delete);

router.get('/get-one', auth, taskController.getOne);

router.get('/get-all', auth, taskController.getAll);

module.exports = router;

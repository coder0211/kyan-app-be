const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/TaskController');

router.post('/create-or-update', auth, taskController.createOrUpdate);

router.delete('/delete', auth, taskController.delete);

router.get('/get-one', auth, taskController.getOne);

router.get('/get-all-by-account-workspace', auth, taskController.getAllByAccountWorkspace);

router.get('/get-all-by-workspace', auth, taskController.getAllByWorkspace);

router.get('/get-all-by-time', auth, taskController.getTaskByTime);

router.get('/get-all-by-day', auth, taskController.getTaskByDay);

router.get('/get-all-by-month-year', auth, taskController.getTaskByMonthYear);

router.get('/get-total-task-by-account-id', auth, taskController.totalTaskInWorkSpaceByIdAccount);

router.get(
    '/get-total-task-done-by-account-id',
    auth,
    taskController.totalTaskDoneInWorkSpaceByIdAccount,
);

router.get('/get-total-task', auth, taskController.totalTaskInWorkSpace);

router.get('/get-total-task-done', auth, taskController.totalTaskDoneInWorkSpace);

module.exports = router;

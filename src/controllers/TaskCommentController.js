const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');
const asyncQuery = require('../helpers/async-mysql');

const jwt = require('jsonwebtoken');
require('dotenv').config();

class TaskCommentController {
    createOrUpdate = asyncHandler(async (req, res) => {
        var { taskCommentId, content, taskId, attachmentUrl } = req.body;

        var sql = `INSERT INTO TaskComment (taskCommentId, content, taskId, attachmentUrl) 
        VALUES (?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE content = ?,taskId = ?, attachmentUrl = ?`;
        const result = await asyncQuery(db, sql, [
            taskCommentId,
            content,
            taskId,
            attachmentUrl,
            content,
            taskId,
            attachmentUrl,
        ]);
        console.log(result);
        res.send(result);
    });

    getAllByTaskId = asyncHandler(async (req, res) => {
        var taskId = req.query.taskId;
        db.query('SELECT * FROM TaskComment WHERE taskId = ?', [taskId], function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    delete = asyncHandler(async (req, res) => {
        var taskCommentId = req.body.taskCommentId;
        const sql = 'DELETE FROM TaskComment WHERE taskCommentId = ?';

        if (!taskCommentId) throw 'taskCommentId can not null';
        const result = await asyncQuery(db, sql, [taskCommentId]);
        res.json(result);
    });
}

module.exports = new TaskCommentController();

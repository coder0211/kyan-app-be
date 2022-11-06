const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');
const e = require('express');
require('dotenv').config();
class AttachmentTaskController {
    addFile = asyncHandler(async (req, res) => {
        const { taskId, attachmentUrl } = req.params;
        sql = 'INSERT INTO AttachmentTask( taskId, attachmentUrl) VALUES (?,?)';
        try {
            db.query(sql, [taskId, attachmentUrl], (error, result) => {
                if (error) throw error;
                res.send(result);
            });
        } catch (error) {
            throw error;
        }
    });

    getByTaskId = asyncHandler(async (req, res) => {
        const taskId = req.params.taskId;
        sql = 'SELECT * FROM AttachmentTask WHERE taskId = ?';
        try {
            db.query(sql, [taskId], (error, result) => {
                if (error) throw error;
                res.send(result);
            });
        } catch (error) {
            throw error;
        }
    });

    delete = asyncHandler(async (req, res) => {
        var attachmentId = req.body.attachmentId;
        const sql = 'DELETE FROM AttachmentTask WHERE attachmentId = ? ';

        if (!attachmentId) throw 'attachmentId can not null';
        const result = await asyncQuery(db, sql, [attachmentId]);
        res.json(result);
    });
}

module.exports = new AttachmentTaskController();

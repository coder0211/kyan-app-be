const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');
const asyncQuery = require('../helpers/async-mysql');
class TaskController {
    createOrUpdate = asyncHandler(async (req, res) => {
        const {
            taskId,
            taskCreateBy,
            taskSummary,
            taskDescription,
            taskDueTimeLTE,
            taskDueTimeGTE,
            taskIsDone,
            taskCreateAt,
            taskWorkspaceId,
            taskAssignTo,
        } = req.body;
        if (taskId) {
            //update
            var sql_update = `UPDATE Task SET taskCreateBy = ?, taskSummary = ?, taskDescription = ?
                            , taskDueTimeLTE = ?, taskDueTimeGTE = ?, taskIsDone = ?,taskCreateAt = ?
                            , taskWorkspaceId = ?, taskAssignTo = ? WHERE taskId = ?`;

            const result_u = await asyncQuery(db, sql_update, [
                taskCreateBy,
                taskSummary,
                taskDescription,
                taskDueTimeLTE,
                taskDueTimeGTE,
                taskIsDone,
                taskCreateAt,
                taskWorkspaceId,
                taskAssignTo,
                taskId,
            ]);
            res.json(result_u);
        } else {
            //create
            var sql_create = `INSERT INTO Task (taskCreateBy, taskSummary, taskDescription, taskDueTimeLTE
                            , taskDueTimeGTE, taskIsDone, taskCreateAt, taskWorkspaceId, taskAssignTo) 
                            VALUES (?,?,?,?,?,?,?,?,?)`;
            const result_c = await asyncQuery(db, sql_create, [
                taskCreateBy,
                taskSummary,
                taskDescription,
                taskDueTimeLTE,
                taskDueTimeGTE,
                taskIsDone,
                taskCreateAt,
                taskWorkspaceId,
                taskAssignTo,
            ]);
            res.json(result_c);
        }
    });

    delete = asyncHandler(async (req, res) => {
        const taskId = req.query.taskId;
        const sql = 'DELETE FROM Task WHERE taskId = ?';
        const result = await asyncQuery(db, sql, [taskId]);
        res.json(result);
    });

    getOne = asyncHandler(async (req, res) => {
        const taskId = req.query.taskId;
        const sql = 'SELECT * FROM Task WHERE taskId = ?';
        db.query(sql, [taskId], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    getAll = asyncHandler(async (req, res) => {
        const sql = 'SELECT * FROM Task';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });
}

module.exports = new TaskController();

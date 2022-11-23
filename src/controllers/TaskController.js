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

    getAllByAccountId = asyncHandler(async (req, res) => {
        const { taskAssignTo } = req.query;
        const sql = 'SELECT * FROM Task AS T WHERE T.taskAssignTo = ?';
        db.query(sql, [taskAssignTo], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    getAllByWorkspaceId = asyncHandler(async (req, res) => {
        const { workSpaceId } = req.query;
        const sql = 'SELECT * FROM Task AS T WHERE T.taskWorkspaceId  = ?';
        db.query(sql, [workSpaceId], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    totalTaskInWorkSpaceByIdAccount = asyncHandler(async (req, res) => {
        const workSpaceId = req.query.workSpaceId;
        const accountId = req.query.accountId;
        const sql =
            'SELECT COUNT(*) as TotalTask FROM Task WHERE taskWorkspaceId = ? and taskAssignTo = ?';
        const result = await asyncQuery(db, sql, [workSpaceId, accountId]);
        res.json(result);
    });

    totalTaskDoneInWorkSpaceByIdAccount = asyncHandler(async (req, res) => {
        const workSpaceId = req.query.workSpaceId;
        const accountId = req.query.accountId;
        const sql =
            'SELECT COUNT(*) as TotalTask FROM Task WHERE taskWorkspaceId = ? and taskAssignTo = ? AND taskIsDone = 1';
        const result = await asyncQuery(db, sql, [workSpaceId, accountId]);
        res.json(result);
    });

    totalTaskInWorkSpace = asyncHandler(async (req, res) => {
        const workSpaceId = req.query.workSpaceId;
        const sql = 'SELECT COUNT(*) as TotalTask FROM Task WHERE taskWorkspaceId = ?';
        const result = await asyncQuery(db, sql, [workSpaceId]);
        res.json(result);
    });

    totalTaskDoneInWorkSpace = asyncHandler(async (req, res) => {
        const workSpaceId = req.query.workSpaceId;
        const sql =
            'SELECT COUNT(*) as TotalTask FROM Task WHERE taskWorkspaceId = ? AND taskIsDone = 1';
        const result = await asyncQuery(db, sql, [workSpaceId]);
        res.json(result);
    });
}

module.exports = new TaskController();

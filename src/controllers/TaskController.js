const db = require('../configs/config-mysql');
const asyncQuery = require('../helpers/async-mysql');
class TaskController {
    async createOrUpdate(req, res) {
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

        try {
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
        } catch (error) {
            res.send(error);
        }
    }

    async delete(req, res) {
        const taskId = req.query.taskId;
        try {
            const sql = 'DELETE FROM Task WHERE taskId = ?';
            const result = await asyncQuery(db, sql, [taskId]);
            res.json(result);
        } catch (error) {
            res.json(error);
        }
    }

    getOne(req, res) {
        const taskId = req.query.taskId;
        const sql = 'SELECT * FROM Task WHERE taskId = ?';
        db.query(sql, [taskId], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }

    getAll(req, res) {
        const sql = 'SELECT * FROM Task';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }
}

module.exports = new TaskController();

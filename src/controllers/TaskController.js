const db = require('../configs/config-mysql');

class TaskController {
    createOrUpdate(req, res) {
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

        if (id) {
            //update
            var sql_update = `UPDATE Task SET taskCreateBy = ?, taskSummary = ?, taskDescription = ?
                            , taskDueTimeLTE = ?, taskDueTimeGTE = ?, taskIsDone = ?,taskCreateAt = ?
                            , taskWorkspaceId = ?, taskAssignTo = ? WHERE taskId = ?`;

            db.query(
                sql_update,
                [
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
                ],
                (err, result) => {
                    if (err) throw err;
                    res.send(result);
                },
            );
        } else {
            //create
            var sql_create = `INSERT INTO Task (taskCreateBy, taskSummary, taskDescription, taskDueTimeLTE
                            , taskDueTimeGTE, taskIsDone, taskCreateAt, taskWorkspaceId, taskAssignTo) 
                            VALUES (?,?,?,?,?,?,?,?,?)`;

            db.query(
                sql_create,
                [
                    taskCreateBy,
                    taskSummary,
                    taskDescription,
                    taskDueTimeLTE,
                    taskDueTimeGTE,
                    taskIsDone,
                    taskCreateAt,
                    taskWorkspaceId,
                    taskAssignTo,
                ],
                (err, result) => {
                    if (err) throw err;
                    res.send(result);
                },
            );
        }
    }

    delete(req, res) {
        const taskId = req.query.taskId;
        const sql = 'DELETE FROM Task WHERE taskId = ?';
        db.query(sql, [taskId], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
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

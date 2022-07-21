const db = require('../configs/config-mysql');
const shortid = require('shortid');
const { nanoid } = require('nanoid');

class WorkSpaceController {
    createOrUpdate(req, res) {
        const id = req.body.id;
        const name = req.body.name;
        const urlPhoto = req.body.urlPhoto;
        try {
            if (id) {
                const sql_update =
                    'UPDATE Workspace SET workspaceName = ?, workspaceUrlPhoto = ? WHERE workspaceId = ?';
                db.query(sql_update, [name, urlPhoto, id], (err, result) => {
                    if (err) throw new Error(err.message);
                    res.send(result);
                });
            } else {
                const codeJoin = nanoid(6);
                const sql_create =
                    'INSERT INTO Workspace (workspaceName, workspaceUrlPhoto, workspaceCodeJoin) VALUES (?, ?, ?)';
                db.query(sql_create, [name, urlPhoto, codeJoin], (err, result) => {
                    if (err) throw new Error(err.message);
                    res.send(result);
                });
            }
        } catch (error) {
            res.send(error);
        }
    }
    delete(req, res) {
        const id = req.query.id;
        const sql = 'DELETE FROM Workspace WHERE workspaceId = ?';
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }
    getOne(req, res) {
        const id = req.query.id;
        const sql = 'SELECT * FROM Workspace WHERE workspaceId = ?';
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            res.send(result[0]);
        });
    }
    getAll(req, res) {
        const sql = 'SELECT * FROM Workspace';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }
}

module.exports = new WorkSpaceController();

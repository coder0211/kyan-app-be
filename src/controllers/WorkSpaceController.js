const db = require('../configs/config-mysql');
const asyncQuery = require('../helpers/async-mysql');
const { nanoid } = require('nanoid');

class WorkSpaceController {
    async createOrUpdate(req, res) {
        const id = req.body.id;
        const name = req.body.name;
        const urlPhoto = req.body.urlPhoto;
        const idUser = req.body.idUser;
        try {
            if (id) {
                const sql_update =
                    'UPDATE Workspace SET workspaceName = ?, workspaceUrlPhoto = ? WHERE workspaceId = ?';
                const result_update = await asyncQuery(db, sql_update, [name, urlPhoto, id]);
                res.send({
                    workspaceId: id,
                    workspaceName: name,
                    workspaceUrlPhoto: urlPhoto,
                });
            } else {
                const codeJoin = nanoid(6);
                const sql_create =
                    'INSERT INTO Workspace (workspaceName, workspaceUrlPhoto, workspaceCodeJoin) VALUES (?, ?, ?)';
                const result_create = await asyncQuery(db, sql_create, [name, urlPhoto, codeJoin]);

                const sql_create_wspaceMember = `INSERT INTO WorkspaceMember(workspaceId, accountId, workspaceMemberIsOwner) VALUES (?,?,?)`;
                await asyncQuery(db, sql_create_wspaceMember, [result_create.insertId, idUser, 1]);
                res.send({
                    workspaceId: result_create.insertId,
                    workspaceName: name,
                    workspaceUrlPhoto: urlPhoto,
                    workspaceCodeJoin: codeJoin,
                });
            }
        } catch (error) {
            res.send(error);
        }
    }

    async delete(req, res) {
        const id = req.query.id;
        const sql = 'DELETE FROM Workspace WHERE workspaceId = ?';
        try {
            const result = await asyncQuery(db, sql, [id]);
            res.send(result);
        } catch (error) {
            res.send(error);
        }
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
        const id_user = req.query.id_user;
        const sql = `SELECT A.workspaceId,A.workspaceName,A.workspaceUrlPhoto,A.workspaceCodeJoin,B.workspaceMemberIsOwner FROM Workspace as A INNER JOIN WorkspaceMember as B ON A.workspaceId = B.workspaceId WHERE B.accountId = ?`;

        db.query(sql, [id_user], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }
}

module.exports = new WorkSpaceController();

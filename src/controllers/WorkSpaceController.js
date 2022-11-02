const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');
const asyncQuery = require('../helpers/async-mysql');
const { nanoid } = require('nanoid');
const Account = require('../models/account');

class WorkSpaceController {
    _membersWorkSpace = function (workspaceId) {
        return new Promise((resolve) => {
            const sql =
                'SELECT A.accountId,A.accountMail,A.accountDisplayName,A.accountUrlPhoto FROM WorkspaceMember AS W INNER JOIN Account AS A ON W.accountId = A.accountId WHERE workspaceId = ?';
            db.query(sql, [workspaceId], function (err, result) {
                if (err) throw err;
                resolve(result);
            });
        });
    };

    createOrUpdate = asyncHandler(async (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        const urlPhoto = req.body.urlPhoto;
        const idUser = req.body.idUser;

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
    });

    delete = asyncHandler(async (req, res) => {
        const id = req.query.id;
        const sql = 'DELETE FROM Workspace WHERE workspaceId = ?';
        try {
            const result = await asyncQuery(db, sql, [id]);
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    });

    getOne = asyncHandler(async (req, res) => {
        const id = req.query.id;
        const sql = 'SELECT * FROM Workspace WHERE workspaceId = ?';
        var _membersWorkSpace = this._membersWorkSpace;
        db.query(sql, [id], async (err, result) => {
            if (err) throw err;
            if (result[0] != null && result[0] != undefined) {
                var members = await _membersWorkSpace(id);
                if (members.length > 0) {
                    result[0]['members'] = members;
                }
                res.send(result[0]);
            } else {
                res.send({});
            }
        });
    });

    getAll = asyncHandler(async (req, res) => {
        const id_user = req.query.id_user;
        const sql = `SELECT A.workspaceId,A.workspaceName,A.workspaceUrlPhoto,A.workspaceCodeJoin,B.workspaceMemberIsOwner FROM Workspace as A INNER JOIN WorkspaceMember as B ON A.workspaceId = B.workspaceId WHERE B.accountId = ?`;
        var _membersWorkSpace = this._membersWorkSpace;
        db.query(sql, [id_user], async (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                var list = [];
                for (let index = 0; index < result.length; index++) {
                    var element = result[index];
                    list.push(element);
                    var members = await _membersWorkSpace(element.workspaceId);
                    if (members.length > 0) {
                        list[index]['members'] = members;
                    }
                }
                res.send(list);
            } else {
                res.send([]);
            }
        });
    });

    getByCodeJoin = asyncHandler(async (req, res) => {
        const { codeJoin } = req.query;
        const sql = 'SELECT * FROM Workspace WHERE workspaceCodeJoin = ?';
        try {
            db.query(sql, [codeJoin], (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } catch (e) {
            throw e;
        }
    });
}

module.exports = new WorkSpaceController();

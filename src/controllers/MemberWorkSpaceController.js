const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');

class MemberWorkSpaceController {
    create = asyncHandler(async (req, res) => {
        const { workspaceId, accountId, workspaceMemberIsOwner } = req.body;
        const sql =
            'INSERT INTO  WorkspaceMember ( workspaceId ,  accountId ,  workspaceMemberIsOwner ) VALUES (?,?,?)';
        try {
            db.query(sql, [workspaceId, accountId, workspaceMemberIsOwner], (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } catch (e) {
            throw e;
        }
    });

    delete = asyncHandler(async (req, res) => {
        const { workspaceId, accountId } = req.body;
        const sql = 'DELETE FROM WorkspaceMember WHERE workspaceId = ? AND accountId = ?';
        try {
            db.query(sql, [workspaceId, accountId], (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } catch (e) {
            throw e;
        }
    });
}

module.exports = new MemberWorkSpaceController();

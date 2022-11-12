const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');
const asyncQuery = require('../helpers/async-mysql');

const jwt = require('jsonwebtoken');
require('dotenv').config();

class ConversationController {
    createOrUpdate = asyncHandler(async (req, res) => {
        console.log(req.body);

        var conversationId = req.body.conversationId;
        var conversationWorkspaceId = req.body.conversationWorkspaceId;
        var conversationThemeId = req.body.conversationThemeId;
        var sql = `INSERT INTO Conversation (conversationId, conversationWorkspaceId, conversationThemeId) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE conversationWorkspaceId = ?, conversationThemeId = ?`;

        const result = await asyncQuery(db, sql, [
            conversationId,
            conversationWorkspaceId,
            conversationThemeId,
            conversationWorkspaceId,
            conversationThemeId,
        ]);
        res.send(result);
    });

    getMemberConversationByIdConversation = function (conversationId, accountId) {
        return new Promise((resolve) => {
            db.query(
                'SELECT A.* FROM ConversationMember M LEFT JOIN Account A ON M.accountId = A.accountId WHERE M.conversationId = ? AND EXISTS (SELECT * FROM ConversationMember MC WHERE MC.conversationId = ? AND MC.accountId = ?)',
                [conversationId, conversationId, accountId],
                function (err, result) {
                    if (err) throw err;
                    resolve(result);
                },
            );
        });
    };

    getAll = asyncHandler(async (req, res) => {
        var conversationWorkspaceId = req.query.conversationWorkspaceId;
        var accountId = req.query.accountId;
        if (conversationWorkspaceId != null) {
            var getMemberConversationByIdConversation = this.getMemberConversationByIdConversation;
            db.query(
                'SELECT * FROM Conversation WHERE conversationWorkspaceId = ?',
                [conversationWorkspaceId],
                async function (err, result) {
                    if (err) throw err;
                    if (result.length > 0) {
                        var list = [],
                            index = 0;
                        for (let i = 0; i < result.length; i++) {
                            var element = result[i];
                            var listMember = await getMemberConversationByIdConversation(
                                element.conversationId,
                                accountId,
                            );
                            if (listMember.length > 0) {
                                list.push(element);
                                list[index++]['listMember'] = listMember;
                            }
                        }
                        res.send(list);
                    } else res.send([]);
                },
            );
        } else res.send([]);
    });

    delete = asyncHandler(async (req, res) => {
        var conversationId = req.body.conversationId;
        const sql = 'DELETE FROM Conversation WHERE conversationId = ? ';

        if (!conversationId) throw 'conversationId can not null';
        const result = await asyncQuery(db, sql, [conversationId]);
        res.json(result);
    });
}

module.exports = new ConversationController();

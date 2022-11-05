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

    getAll = asyncHandler(async (req, res) => {
        db.query('SELECT * FROM Conversation', function (err, result) {
            if (err) throw err;
            res.send(result);
        });
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

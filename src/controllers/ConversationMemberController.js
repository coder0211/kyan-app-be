const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');
const asyncQuery = require('../helpers/async-mysql');

const jwt = require('jsonwebtoken');
require('dotenv').config();

class ConversationMemberController {
    createOrUpdate = asyncHandler(async (req, res) => {
        console.log(req.body);

        var conversationId = req.body.conversationId;
        var accountId = req.body.accountId;
        var conversationMemberNickName = req.body.conversationMemberNickName;
        var sql = `INSERT INTO ConversationMember (conversationId, accountId, conversationMemberNickName) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE conversationMemberNickName = ?`;

        const result = await asyncQuery(db, sql, [
            conversationId,
            accountId,
            conversationMemberNickName,
            conversationMemberNickName,
        ]);
        res.send(result);
    });

    getAll = asyncHandler(async (req, res) => {
        db.query('SELECT * FROM ConversationMember', function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    delete = asyncHandler(async (req, res) => {
        console.log(req.body);
        var conversationId = req.body.conversationId;
        var accountId = req.body.accountId;
        const sql = 'DELETE FROM ConversationMember WHERE conversationId = ? and accountId = ?';

        if (!conversationId) throw 'conversationId, accountId can not null';
        const result = await asyncQuery(db, sql, [conversationId, accountId]);
        res.json(result);
    });
}

module.exports = new ConversationMemberController();

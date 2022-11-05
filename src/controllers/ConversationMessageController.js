const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');
const asyncQuery = require('../helpers/async-mysql');

const jwt = require('jsonwebtoken');
require('dotenv').config();

class ConversationMemberController {
    createOrUpdate = asyncHandler(async (req, res) => {
        console.log(req.body);

        var conversationMessageId = req.body.conversationMessageId;
        var conversationMessageContent = req.body.conversationMessageContent;
        var conversationMessageTimeSend = req.body.conversationMessageTimeSend;
        var conversationMessageConversationId = req.body.conversationMessageConversationId;
        var conversationMessageSenderId = req.body.conversationMessageSenderId;
        var sql = `INSERT INTO ConversationMessage (conversationMessageId, conversationMessageContent, conversationMessageTimeSend, conversationMessageConversationId, conversationMessageSenderId) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE conversationMessageContent = ?,conversationMessageTimeSend = ?, conversationMessageConversationId = ?, conversationMessageSenderId = ?`;

        const result = await asyncQuery(db, sql, [
            conversationMessageId,
            conversationMessageContent,
            conversationMessageTimeSend,
            conversationMessageConversationId,
            conversationMessageContent,
            conversationMessageTimeSend,
            conversationMessageConversationId,
        ]);
        res.send(result);
    });

    getAll = asyncHandler(async (req, res) => {
        db.query('SELECT * FROM ConversationMessage', function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    delete = asyncHandler(async (req, res) => {
        var conversationMessageId = req.body.conversationMessageId;
        const sql = 'DELETE FROM ConversationMessage WHERE conversationMessageId = ?';

        if (!conversationMessageId) throw 'conversationMessageId can not null';
        const result = await asyncQuery(db, sql, [conversationMessageId]);
        res.json(result);
    });
}

module.exports = new ConversationMemberController();

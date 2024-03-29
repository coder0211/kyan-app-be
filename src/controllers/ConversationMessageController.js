const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');
const asyncQuery = require('../helpers/async-mysql');

const jwt = require('jsonwebtoken');
require('dotenv').config();

class ConversationMemberController {
    createOrUpdate = asyncHandler(async (req, res) => {
        var {
            conversationMessageId,
            conversationMessageContent,
            conversationMessageTimeSend,
            conversationMessageConversationId,
            conversationMessageSenderId,
            attachmentUrl,
        } = req.body;
        const result = await this.postMessageConversation(
            conversationMessageContent,
            conversationMessageTimeSend,
            conversationMessageConversationId,
            conversationMessageSenderId,
            attachmentUrl,
            conversationMessageId,
        );

        res.send(result);
    });

    getAll = asyncHandler(async (req, res) => {
        var conversationId = req.query.conversationId;
        var offset = req.query.offset;
        var limit = req.query.limit;
        db.query(
            'SELECT * FROM ConversationMessage MC LEFT JOIN Account A ON MC.conversationMessageSenderId = A.accountId WHERE conversationMessageConversationId = ? ORDER BY conversationMessageId DESC LIMIT ? OFFSET ?',
            [parseInt(conversationId), parseInt(limit), parseInt(offset)],
            function (err, result) {
                if (err) throw err;
                res.send(result);
            },
        );
    });

    delete = asyncHandler(async (req, res) => {
        var conversationMessageId = req.body.conversationMessageId;
        const sql = 'DELETE FROM ConversationMessage WHERE conversationMessageId = ?';

        if (!conversationMessageId) throw 'conversationMessageId can not null';
        const result = await asyncQuery(db, sql, [conversationMessageId]);
        res.json(result);
    });

    postMessageConversation = async (
        conversationMessageContent,
        conversationMessageTimeSend,
        conversationMessageConversationId,
        conversationMessageSenderId,
        attachmentUrl,
        conversationMessageId = null,
    ) => {
        var sql = `INSERT INTO ConversationMessage (conversationMessageId, conversationMessageContent, conversationMessageTimeSend, conversationMessageConversationId, conversationMessageSenderId, attachmentUrl) 
        VALUES (?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE conversationMessageContent = ?,conversationMessageTimeSend = ?, conversationMessageConversationId = ?, conversationMessageSenderId = ?, attachmentUrl = ?`;

        const result = await asyncQuery(db, sql, [
            conversationMessageId,
            conversationMessageContent,
            conversationMessageTimeSend,
            conversationMessageConversationId,
            conversationMessageSenderId,
            attachmentUrl,
            conversationMessageContent,
            conversationMessageTimeSend,
            conversationMessageConversationId,
            conversationMessageSenderId,
            attachmentUrl,
        ]);
        return result;
    };
}

module.exports = new ConversationMemberController();

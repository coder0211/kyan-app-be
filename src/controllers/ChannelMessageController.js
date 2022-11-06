const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');
const asyncQuery = require('../helpers/async-mysql');

const jwt = require('jsonwebtoken');
require('dotenv').config();

class ChannelMessageController {
    createOrUpdate = asyncHandler(async (req, res) => {
        console.log(req.body);
        console.log('channel - message');

        var channelMessageId = req.body.channelMessageId;
        var channelMessageContent = req.body.channelMessageContent;
        var channelMessageTimeSend = req.body.channelMessageTimeSend;
        var channelMessageChannelId = req.body.channelMessageChannelId;
        var channelMessageSenderId = req.body.channelMessageSenderId;
        var sql = `INSERT INTO ChannelMessage (channelMessageId, channelMessageContent, channelMessageTimeSend, channelMessageChannelId, channelMessageSenderId) VALUES (?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE channelMessageContent = ?, channelMessageTimeSend = ?,channelMessageChannelId = ?, channelMessageSenderId = ?`;

        const result = await asyncQuery(db, sql, [
            channelMessageId,
            channelMessageContent,
            channelMessageTimeSend,
            channelMessageChannelId,
            channelMessageSenderId,
            channelMessageContent,
            channelMessageTimeSend,
            channelMessageChannelId,
            channelMessageSenderId,
        ]);
        res.send(result);
    });

    getAll = asyncHandler(async (req, res) => {
        db.query('SELECT * FROM ChannelMessage', function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    delete = asyncHandler(async (req, res) => {
        var channelMessageId = req.body.channelMessageId;
        const sql = 'DELETE FROM ChannelMessage WHERE channelMessageId = ? ';

        if (!channelMessageId) throw 'channelId & accountId can not null';
        const result = await asyncQuery(db, sql, [channelMessageId]);
        res.json(result);
    });
}

module.exports = new ChannelMessageController();

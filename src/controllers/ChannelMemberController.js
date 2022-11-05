const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');
const asyncQuery = require('../helpers/async-mysql');

const jwt = require('jsonwebtoken');
require('dotenv').config();

class ChannelMemberController {
    createOrUpdate = asyncHandler(async (req, res) => {
        console.log(req.body);
        var channelId = req.body.channelId;
        var channelMemberOwner = req.body.channelMemberOwner;
        var accountId = req.body.accountId;
        var sql = `INSERT INTO ChannelMember (channelId, channelMemberOwner, accountId) VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE channelMemberOwner = ?`;

        const result = await asyncQuery(db, sql, [
            channelId,
            channelMemberOwner,
            accountId,
            channelMemberOwner,
        ]);
        res.send(result);
    });

    getAll = asyncHandler(async (req, res) => {
        db.query('SELECT * FROM ChannelMember', function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    delete = asyncHandler(async (req, res) => {
        var channelId = req.body.channelId;
        var accountId = req.body.accountId;
        const sql = 'DELETE FROM ChannelMember WHERE channelId = ? and accountId = ?';

        if (!channelId) throw 'channelId & accountId can not null';
        const result = await asyncQuery(db, sql, [channelId, accountId]);
        res.json(result);
    });
}

module.exports = new ChannelMemberController();

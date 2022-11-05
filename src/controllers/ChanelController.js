const db = require('../configs/config-mysql');
const asyncHandler = require('express-async-handler');
const asyncQuery = require('../helpers/async-mysql');

const jwt = require('jsonwebtoken');
require('dotenv').config();

class ChannelController {
    createOrUpdate = asyncHandler(async (req, res) => {
        console.log(req.body);
        var channelId = req.body.channelId;
        var channelName = req.body.channelName;
        var channelIsPrivate = req.body.channelIsPrivate;
        var channelWorkspaceId = req.body.channelWorkspaceId;
        var sql = `INSERT INTO Account (channelId, channelName, channelIsPrivate, channelWorkspaceId) VALUES (?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE channelName = ?, channelIsPrivate = ?, channelWorkspaceId = ?`;

        const result = await asyncQuery(db, sql, [
            channelId,
            channelName,
            channelIsPrivate,
            channelWorkspaceId,
            channelName,
            channelIsPrivate,
            channelWorkspaceId,
        ]);
        res.send(result);
    });

    getOne = asyncHandler(async (req, res) => {
        var channelId = req.params.channelId;
        if (channelId != null) {
            var sql = 'SELECT * FROM Channel WHERE channelId = ?';
            db.query(sql, [channelId], function (err, result) {
                if (err) throw err;
                res.send(result[0]);
            });
        }
    });

    getAll = asyncHandler(async (req, res) => {
        db.query('SELECT * FROM Channel', function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    delete = asyncHandler(async (req, res) => {
        var channelId = req.body.channelId;
        const sql = 'DELETE FROM Channel WHERE channelId = ?';

        if (!channelId) throw 'channelId can not null';
        const result = await asyncQuery(db, sql, [channelId]);
        res.json(result);
    });
}

module.exports = new ChannelController();

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
        var sql = `INSERT INTO Channel (channelId, channelName, channelIsPrivate, channelWorkspaceId) VALUES (?, ?, ?, ?) 
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

    getMemberChannelByIdChannel = (accountId, channelId) => {
        const sql =
            'SELECT A.* FROM ChannelMember M LEFT JOIN Account A ON M.accountId = A.accountId WHERE M.channelId = ? AND EXISTS (SELECT * FROM ChannelMember MC WHERE MC.channelId = ? AND MC.accountId = ?);';

        return new Promise((resolve) => {
            db.query(sql, [channelId, channelId, accountId], function (err, result) {
                if (err) throw err;
                resolve(result);
            });
        });
    };

    getOne = asyncHandler(async (req, res) => {
        var channelId = req.query.channelId;
        console.log(channelId);
        if (channelId != null) {
            var sql = 'SELECT * FROM Channel WHERE channelId = ?';
            db.query(sql, [channelId], function (err, result) {
                if (err) throw err;
                res.send(result[0]);
            });
        }
    });

    getAll = asyncHandler(async (req, res) => {
        var channelWorkspaceId = req.query.channelWorkspaceId;
        var accountId = req.query.accountId;
        const getMemberChannelByIdChannel = this.getMemberChannelByIdChannel;
        if (channelWorkspaceId != -1) {
            db.query(
                'SELECT * FROM Channel WHERE channelWorkspaceId	 = ?',
                [channelWorkspaceId],
                async function (err, result) {
                    if (err) throw err;
                    if (result.length > 0) {
                        var list = [],
                            index = 0;
                        for (let i = 0; i < result.length; i++) {
                            var element = result[i];
                            var listMember = await getMemberChannelByIdChannel(
                                accountId,
                                element.channelId,
                            );
                            if (listMember.length > 0 || !element.isPrivate) {
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
        var channelId = req.body.channelId;
        const sql = 'DELETE FROM Channel WHERE channelId = ?';

        if (!channelId) throw 'channelId can not null';
        const result = await asyncQuery(db, sql, [channelId]);
        res.json(result);
    });
}

module.exports = new ChannelController();

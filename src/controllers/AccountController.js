const db = require('../configs/config-mysql');
const asyncQuery = require('../helpers/async-mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Account = require('../models/account');
class AccountController {
    async createOrUpdate(req, res) {
        console.log(req.body);
        var accountMail = req.body.accountMail;
        var accountDisplayName = req.body.accountDisplayName;
        var accountUrlPhoto = req.body.accountUrlPhoto;
        var accountToken = req.body.accountToken;
        var accountId = req.body.accountId;
        var sql = `INSERT INTO Account (accountId, accountMail, accountDisplayName, accountUrlPhoto, accountToken) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE accountDisplayName = ?, accountUrlPhoto = ?`;
        try {
            const result = await asyncQuery(db, sql, [
                accountId,
                accountMail,
                accountDisplayName,
                accountUrlPhoto,
                accountToken,
                accountDisplayName,
                accountUrlPhoto,
            ]);
            if (result) {
                let myAccount = new Account(
                    accountId,
                    accountMail,
                    accountDisplayName,
                    accountUrlPhoto,
                    accountToken,
                );
                res.send(myAccount);
            }
        } catch (error) {
            res.json(error);
        }
    }

    login(req, res) {
        const { mail } = req.body;
        console.log(mail);
        const sql = `SELECT * FROM Account WHERE accountMail = ?`;
        db.query(sql, [mail], (err, result) => {
            if (err) throw err;
            jwt.sign(
                { _id: result[0].accountId },
                process.env.SECRET_KEY,
                { expiresIn: '100 days' },
                (err, token) => {
                    if (err) throw err;
                    res.send({ ...result[0], token: token });
                },
            );
        });
    }

    getOne(req, res) {
        var accountMail = req.params.accountMail;
        if (accountMail != null) {
            var sql = 'SELECT * FROM Account WHERE accountMail = ?';
            db.query(sql, [accountMail], function (err, result) {
                if (err) throw err;
                res.send(result[0]);
            });
        }
    }

    getAll(req, res) {
        db.query('SELECT * FROM Account', function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    }

    async delete(req, res) {
        var accountMail = req.body.accountMail;
        const sql = 'DELETE FROM Account WHERE accountMail = ?';

        try {
            if (!accountMail) throw 'Account mail can not null';
            const result = await asyncQuery(db, sql, [accountMail]);
            res.json(result);
        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = new AccountController();

const db = require('../configs/config-mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AccountController {
    createOrUpdateAccount(req, res) {
        var accountMail = req.body.accountMail;
        var accountDisplayName = req.body.accountDisplayName;
        var accountUrlPhoto = req.body.accountUrlPhoto;
        var accountToken = req.body.accountToken;
        var accountId = req.body.accountId;
        var sql =
            'INSERT INTO Account (accountId, accountMail, accountDisplayName, accountUrlPhoto, accountToken) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE accountDisplayName = ?, accountUrlPhoto = ?';
        db.query(
            sql,
            [
                accountId,
                accountMail,
                accountDisplayName,
                accountUrlPhoto,
                accountToken,
                accountDisplayName,
                accountUrlPhoto,
            ],
            function (err, result) {
                if (err) throw err;
                jwt.sign({ user: result }, 'secretkey', { expiresIn: '100 days' }, (err, token) => {
                    if (err) throw err;
                    let myAccount = new Account(
                        accountId,
                        accountMail,
                        accountDisplayName,
                        accountUrlPhoto,
                        accountToken,
                        token,
                    );
                    res.send(myAccount);
                });
            },
        );
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

    getAccounts(req, res) {
        var accountMail = req.params.accountMail;
        if (accountMail != null) {
            var sql = 'SELECT * FROM Account WHERE accountMail = ?';
            db.query(sql, [accountMail], function (err, result) {
                if (err) throw err;
                res.send(result[0]);
            });
        } else {
            db.query('SELECT * FROM Account', function (err, result) {
                if (err) throw err;
                res.send(result);
            });
        }
    }

    deleteAccount(req, res) {
        var accountMail = req.body.accountMail;
        if (accountMail != null) {
            sql = 'DELETE FROM Account WHERE accountMail = ?';
            db.query(sql, [accountMail], function (err, result) {
                if (err) throw err;
                res.send(result);
            });
        } else {
            if (err) throw 'Account mail can not null';
        }
    }
}

module.exports = new AccountController();

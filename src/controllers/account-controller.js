const Account = require("../models/account");
const jwt = require("jsonwebtoken");
module.exports = function (con) {
  this.createOrUpdateAccount = function (req, res) {
    var accountMail = req.body.accountMail;
    var accountDisplayName = req.body.accountDisplayName;
    var accountUrlPhoto = req.body.accountUrlPhoto;
    var accountToken = req.body.accountToken;
    var accountId = req.body.accountId;
    var sql =
      "INSERT INTO Account (accountId, accountMail, accountDisplayName, accountUrlPhoto, accountToken) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE accountDisplayName = ?, accountUrlPhoto = ?";
    con.query(
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
        jwt.sign(
          { user: result },
          "secretkey",
          { expiresIn: "100 days" },
          (err, token) => {
            if (err) throw err;
            let myAccount = new Account(
              accountId,
              accountMail,
              accountDisplayName,
              accountUrlPhoto,
              accountToken,
              token
            );
            res.send(myAccount);
          }
        );
      }
    );
  };

  this.getAccounts = function (req, res) {
    var accountMail = req.query.accountMail;
    if (accountMail != null) {
      var sql = "SELECT * FROM Account WHERE accountMail = ?";
      con.query(sql, [accountMail], function (err, result) {
        if (err) throw err;
        res.send(result[0]);
      });
    } else {
      con.query("SELECT * FROM Account", function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    }
  };

  this.deleteAccount = function (req, res) {
    var accountMail = req.body.accountMail;
    if (accountMail != null) {
      sql = "DELETE FROM Account WHERE accountMail = ?";
      con.query(sql, [accountMail], function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    } else {
      if (err) throw "Account mail can not null";
    }
  };
};

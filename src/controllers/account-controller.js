module.exports = function (con) {
  this.createOrUpdateAccount = function (req, res) {
    var accountMail = req.body.accountMail;
    var accountDisplayName = req.body.accountDisplayName;
    var accountUrlPhoto = req.body.accountUrlPhoto;
    var sql =
      "INSERT INTO Account (accountMail, accountDisplayName, accountUrlPhoto) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE accountDisplayName = ?, accountUrlPhoto = ?";
    con.query(
      sql,
      [
        accountMail,
        accountDisplayName,
        accountUrlPhoto,
        accountDisplayName,
        accountUrlPhoto,
      ],
      function (err, result) {
        if (err) throw err;
        res.send(result);
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

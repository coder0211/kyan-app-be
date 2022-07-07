module.exports = function (con) {
  this.getAccounts = function (req, res) {
    var mail = req.query.mail;
    if (mail != null) {
      var sql = "SELECT * FROM Account WHERE mail = ?";
      con.query(sql, [mail], function (err, result) {
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
};

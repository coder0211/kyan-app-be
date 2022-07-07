accountRoutes = function (app, con) {
  //
  var _ac = require("../controllers/account-controller");
  var accountController = new _ac(con);

  app.get("/accounts/:mail?", function (req, res) {
    accountController.getAccounts(req, res);
  });
};

module.exports = accountRoutes;

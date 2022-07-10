const jwt = require("jsonwebtoken");

accountRoutes = function (app, con) {
  //TODO: DECLARE ACCOUNT CONTROLLER
  var _ac = require("../controllers/account-controller");
  var accountController = new _ac(con);
  var _verifyToken = require("../helpers/helpers");

  //TODO: ---     ROUTES      ---
  app.post("/account", function (req, res) {
    console.log("\x1b[36m", "POST:/account", "\x1b[0m");
    accountController.createOrUpdateAccount(req, res);
  });

  app.get("/accounts/:accountMail?", _verifyToken, function (req, res) {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log("\x1b[36m", "GET:/accounts/:accountMail?", "\x1b[0m");
        accountController.getAccounts(req, res);
      }
    });
  });

  app.put("/account/:accountMail?", function (req, res) {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log("\x1b[36m", "PUT:/account", "\x1b[0m");
        accountController.deleteAccount(req, res);
      }
    });
  });
};

module.exports = accountRoutes;

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
var cors = require("cors");
var moment = require("moment-timezone");
moment().tz("Asia/Ho_Chi_Minh").format();
const port = process.env.PORT || 3001;

//Config request
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config database
var con = require("../src/configs/config-mysql");
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//TODO: Routes --- Declare ---

var accountRoute = require("../src/routes/account-route");
new accountRoute(app, con);

//? ------

app.enable("trust proxy");
server.listen(port, () => {
  console.log("Server started on: " + port);
});

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../src/configs/config-mysql');
const path = require('path');
const moment = require('moment-timezone');
moment().tz('Asia/Ho_Chi_Minh').format();
const port = process.env.PORT || 3001;
const route = require('./routes');
const io = require('socket.io')(server, {
    cors: { origin: '*', methods: ['*'] },
});

const socketsManager = require('./sockets/socketsManager');

// Config request
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config database
db.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
});

// config static folder
app.use(express.static(path.join(__dirname, 'public')));

// TODO: Routes --- Declare ---
app.use(route);

// socket
socketsManager(io);

app.enable('trust proxy');
server.listen(port, () => {
    console.log('Server started on: ' + port);
});

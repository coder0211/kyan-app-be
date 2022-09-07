const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../src/configs/config-mysql');
const path = require('path');
const multer = require('multer');
const moment = require('moment-timezone');
moment().tz('Asia/Ho_Chi_Minh').format();

const port = process.env.PORT || 3001;
const route = require('./routes');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });
//Config request
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config database

db.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
});

//config static folder
app.use(express.static(path.join(__dirname, 'public')));

//TODO: Routes --- Declare ---
app.use(route);
//upload file
app.post('/upload-single-file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Upload file again!');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});

app.post('/upload-files', upload.array('file', 10), function (req, res, next) {
    const file = req.files;
    console.log(file);
    if (!file) {
        const error = new Error('Upload file again!');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});

//? ------

app.enable('trust proxy');
server.listen(port, () => {
    console.log('Server started on: ' + port);
});

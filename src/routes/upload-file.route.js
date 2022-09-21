const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../configs/config-multer');

//upload file
router.post('/upload-single-file', [
    auth,
    upload.single('file'),
    (req, res, next) => {
        const file = req.file;
        if (!file) {
            const error = new Error('Upload file again!');
            error.httpStatusCode = 400;
            return next(error);
        }
        res.send(file);
    },
]);

router.post('/upload-files', [
    auth,
    upload.array('file', 10),
    function (req, res, next) {
        const file = req.files;
        console.log(file);
        if (!file) {
            const error = new Error('Upload file again!');
            error.httpStatusCode = 400;
            return next(error);
        }
        res.send(file);
    },
]);

module.exports = router;

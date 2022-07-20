const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const workSpaceController = require('../controllers/WorkSpaceController');

router.post('/create-or-update', auth, workSpaceController.createOrUpdate);

router.delete('/deletet', auth, workSpaceController.delete);

router.get('/get-one', auth, workSpaceController.getOne);

router.get('/get-all', auth, workSpaceController.getAll);

module.exports = router;
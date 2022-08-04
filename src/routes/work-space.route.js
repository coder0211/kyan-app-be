const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const workSpaceController = require('../controllers/WorkSpaceController');

router.post('/create-or-update', auth, workSpaceController.createOrUpdate);

router.delete('/delete', auth, workSpaceController.delete);

router.get('/get-one', auth, workSpaceController.getOne);

router.get('/get-all-by-id-user', auth, workSpaceController.getAll);

module.exports = router;

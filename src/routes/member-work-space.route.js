const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const memberWorkSpaceController = require('../controllers/MemberWorkSpaceController');

router.post('/create', auth, memberWorkSpaceController.create);

router.delete('/delete', auth, memberWorkSpaceController.delete);

router.get('/get-all', auth, memberWorkSpaceController.getAll);

module.exports = router;

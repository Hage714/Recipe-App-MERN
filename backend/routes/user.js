const express = require('express');
const router = express.Router();
const { getUser, getUsers } = require('../controllers/user');

router.get('/id', getUser);
router.get('/', getUsers);

module.exports = router;

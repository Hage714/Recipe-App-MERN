const express = require('express');

const { getContributions, createContribution } = require('../controllers/contribute');

const router = express.Router();

router.get('/', getContributions);
router.post('/', createContribution);

module.exports = router;
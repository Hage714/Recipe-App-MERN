const { getMyCollections } = require('../controllers/collections')
const express = require('express')
const router = express.Router()

router.get('/', getMyCollections)

module.exports = router
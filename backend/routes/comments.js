const express = require('express');
const { verifyUser } = require('../middleware/auth');


const { getComments, addComment } = require('../controllers/comments');

const router = express.Router();

router.get('/', getComments);
router.post('/:recipeId', addComment);

module.exports = router;
const express = require('express');
const { login } = require("../auth/login")
const { register } = require("../auth/register")

const router = express.Router();
router.post("/login", login);
router.post("/register", register);

module.exports = router;
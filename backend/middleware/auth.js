const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyUser = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({ error: "Please provide a token" });

    try {
        const decoded = jwt.verify(token, "1234")
        const user = await User.findById(decoded.user.id); // Find the user by ID

        if (!user) {
            return res.status(401).send({ error: "User not found" });
        }
        req.user = decoded.user;
        next()
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}

module.exports = { verifyUser  } ;




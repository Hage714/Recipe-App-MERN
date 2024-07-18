const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({ error: "Please provide a token" });

    try {
        const decoded = jwt.verify(token, "1234")
        req.user = decoded.user;
        next()
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}

module.exports = { verifyUser  } ;




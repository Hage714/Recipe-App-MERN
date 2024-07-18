const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req, res) => {
const { email, password } = req.body;

if (!email || !password) 
    return res.status(400).send({ error: "Please fill all the fields" });

    try {
        
        const user = await User.findOne({ email:email });
        if (!user) return res.status(404).send({ error: "User not found" });
            const passwordMatches = bcrypt.compare(password, user.password)
            if (!passwordMatches) return res.status(401).send({ error: "Invalid password" });

            const payload = {
                id: user._id,
                name: user.name,
                email: user.email
            }
            const token = await jwt.sign({ user: payload }, "1234", { expiresIn: '20h' });
            res.send(token).status(200);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message});
    }
};


module.exports = { login };
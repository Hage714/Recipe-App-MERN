const User = require('../models/user');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ error: "Please fill all the fields" });
    }

    try {
        const existingUser = await User.findOne({ email: email });  //checking if the user exists
        if (existingUser) 
            return res.status(400).send({ error: "Email already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);  //hashing the password
            const newUser = await User.create({
                name: name,
                email: email,
                password: hashedPassword
            });
            if (!newUser)
                return res.status(400).send({ error: "Failed to create user" });
            res.send(newUser).status(201);
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { register };
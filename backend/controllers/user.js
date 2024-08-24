const User = require('../models/user'); // Your user model

const getUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assumes you have middleware setting req.user

        // Fetch user details from the database
        const user = await User.findById(userId); // Adjust fields as needed

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send user details in the response
        res.json({
            id: user._id,
            name: user.name,
            email: user.email, 

        });
    } catch (error) {
        console.error('Error fetching user', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getUsers = async (req, res) => {
    try {
        // Optionally add query parameters for filtering or pagination
        const filter = {}; // Replace with your filtering logic based on query params
        const options = {}; // Replace with pagination options if needed

        const users = await User.find(filter, options);

        // Optionally filter sensitive data before sending response
        const usersToSend = users.map((user) => {
            return {
                _id: user._id, // Include ID if needed
                name: user.name,
                email: user.email, // Include other relevant fields
                // Exclude sensitive fields (e.g., password)
            };
        });

        res.json(usersToSend);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

module.exports = { getUser, getUsers };
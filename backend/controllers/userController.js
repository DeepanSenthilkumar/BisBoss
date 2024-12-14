const { createUser, getUserByEmail} = require('../models/User');

const signup = async (req, res) => {
    const { userID, name, shopName, email } = req.body;
    try {
        await createUser(userID, name, shopName, email);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserDetailsByEmail = async (req, res) => {
    const { email } = req.params; // Get the email from the request parameters
    try {
        const [user] = await getUserByEmail(email); // Fetch user by email
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { signup, getUserDetailsByEmail };

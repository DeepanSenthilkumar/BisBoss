const { createUser } = require('../models/User');

const signup = async (req, res) => {
    const { userID, name, shopName, email } = req.body;
    try {
        await createUser(userID, name, shopName, email);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { signup };

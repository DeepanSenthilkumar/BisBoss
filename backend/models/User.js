const db = require('../config/db');

const createUser = (userID, name, shopName, email) => {
    const query = 'INSERT INTO user (userID, name, shopName, email) VALUES (?, ?, ?, ?)';
    return db.promise().execute(query, [userID, name, shopName, email]);
};

const getUserByEmail = (email) => {
    const query = 'SELECT * FROM user WHERE email = ?';
    return db.promise().execute(query, [email]);
};


module.exports = { createUser, getUserByEmail };

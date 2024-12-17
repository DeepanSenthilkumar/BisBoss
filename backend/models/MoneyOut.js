const db = require('../config/db');

const createMoneyOut = (userID, payee, paidAmount, reason, paymentType, date, time) => {
    const query = `
        INSERT INTO moneyout (userID, payee, paidAmount, reason, paymentType, date, time)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    return db.promise().execute(query, [userID, payee, paidAmount, reason, paymentType, date, time]);
};

const getMoneyOutByUserAndDate = (userID, startDate, endDate = null) => {
    const query = endDate
        ? `SELECT * FROM moneyout WHERE userID = ? AND date BETWEEN ? AND ?`
        : `SELECT * FROM moneyout WHERE userID = ? AND date = ?`;
    const params = endDate ? [userID, startDate, endDate] : [userID, startDate];
    return db.promise().execute(query, params);
};

module.exports = { createMoneyOut, getMoneyOutByUserAndDate };

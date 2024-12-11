// const db = require('../config/db');

// const addSale = (userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time) => {
//     const query = `
//         INSERT INTO sales (userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     return db.promise().execute(query, [userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time]);
// };

// const getSalesData = (userID, startDate, endDate) => {
//     const query = `
//         SELECT * FROM sales 
//         WHERE userID = ? AND date BETWEEN ? AND ? 
//     `;
//     return db.promise().execute(query, [userID, startDate, endDate]);
// };

// module.exports = { addSale, getSalesData };


// const db = require('../config/db');

// // Function to add a sale to the database
// const addSale = (userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time) => {
//     const query = `
//         INSERT INTO sales (userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     return db.promise().execute(query, [userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time]);
// };

// // Function to get sales data for a specific user
// const getSalesDataByUser = (userID) => {
//     const query = `
//         SELECT * FROM sales
//         WHERE userID = ?
//     `;
//     return db.promise().execute(query, [userID]);
// };

// // Function to get sales data for a specific user and the current date
// const getSalesDataByUserAndDate = (userID, currentDate) => {
//     const query = `
//         SELECT * FROM sales
//         WHERE userID = ? AND date = ?
//     `;
//     return db.promise().execute(query, [userID, currentDate]);
// };

// // Function to get sales data for a specific user and a date range
// const getSalesDataByUserAndRange = (userID, startDate, endDate) => {
//     const query = `
//         SELECT * FROM sales
//         WHERE userID = ? AND date BETWEEN ? AND ?
//     `;
//     return db.promise().execute(query, [userID, startDate, endDate]);
// };

// module.exports = { addSale, getSalesDataByUser, getSalesDataByUserAndDate, getSalesDataByUserAndRange };



const db = require('../config/db');

// Add a sale
const addSale = (userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time) => {
    const query = `
        INSERT INTO sales (userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return db.promise().execute(query, [userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time]);
};

// Fetch aggregated data for a user
const getSalesAggregatesByUser = (userID) => {
    const query = `
        SELECT 
            COUNT(*) AS totalBills,
            SUM(totalBill) AS totalBillAmount,
            SUM(paidAmount) AS totalPayments,
            SUM(balance) AS totalDebits
        FROM sales
        WHERE userID = ?
    `;
    return db.promise().execute(query, [userID]);
};

// Fetch individual records for a user
const getSalesRecordsByUser = (userID) => {
    const query = `
        SELECT * FROM sales WHERE userID = ?
    `;
    return db.promise().execute(query, [userID]);
};

// Fetch aggregated data for a user in a date range
const getSalesAggregatesByRange = (userID, startDate, endDate) => {
    const query = `
        SELECT 
            COUNT(*) AS totalBills,
            SUM(totalBill) AS totalBillAmount,
            SUM(paidAmount) AS totalPayments,
            SUM(balance) AS totalDebits
        FROM sales
        WHERE userID = ? AND date BETWEEN ? AND ?
    `;
    return db.promise().execute(query, [userID, startDate, endDate]);
};

// Fetch individual records for a user in a date range
const getSalesRecordsByRange = (userID, startDate, endDate) => {
    const query = `
        SELECT * FROM sales WHERE userID = ? AND date BETWEEN ? AND ?
    `;
    return db.promise().execute(query, [userID, startDate, endDate]);
};

// Fetch aggregated data for a user on a specific date
const getSalesAggregatesByDate = (userID, date) => {
    const query = `
        SELECT 
            COUNT(*) AS totalBills,
            SUM(totalBill) AS totalBillAmount,
            SUM(paidAmount) AS totalPayments,
            SUM(balance) AS totalDebits
        FROM sales
        WHERE userID = ? AND date = ?
    `;
    return db.promise().execute(query, [userID, date]);
};

// Fetch individual records for a user on a specific date
const getSalesRecordsByDate = (userID, date) => {
    const query = `
        SELECT * FROM sales WHERE userID = ? AND date = ?
    `;
    return db.promise().execute(query, [userID, date]);
};

module.exports = {
    addSale,
    getSalesAggregatesByUser,
    getSalesRecordsByUser,
    getSalesAggregatesByRange,
    getSalesRecordsByRange,
    getSalesAggregatesByDate,
    getSalesRecordsByDate,
};

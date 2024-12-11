// const { addSale, getSalesData } = require('../models/Sales');

// const recordSale = async (req, res) => {
//     const { userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time } = req.body;
//     try {
//         await addSale(userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time);
//         res.status(201).json({ message: 'Sale recorded successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const getSales = async (req, res) => {
//     const { userID, startDate, endDate } = req.body;
//     try {
//         const [rows] = await getSalesData(userID, startDate, endDate);
//         res.status(200).json(rows);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = { recordSale, getSales };




// const { addSale, getSalesDataByUser, getSalesDataByUserAndDate, getSalesDataByUserAndRange } = require('../models/Sales');

// // Controller to record a sale
// const recordSale = async (req, res) => {
//     const { userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time } = req.body;

//     // Ensure no undefined values are passed into the database query
//     if ([userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time].includes(undefined)) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }

//     try {
//         // If the date is provided, ensure it's in the correct format (YYYY-MM-DD)
//         const formattedDate = new Date(date).toISOString().split('T')[0];

//         await addSale(userID, billNumber, totalBill, paidAmount, balance, paymentType, formattedDate, time);
//         res.status(201).json({ message: 'Sale recorded successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Controller to get sales data
// const getSales = async (req, res) => {
//     const { userID, startDate, endDate, date } = req.query;

//     // Ensure no undefined values are passed into the database query
//     if (!userID) {
//         return res.status(400).json({ error: 'userID is required' });
//     }

//     try {
//         // If no date range is provided, fetch sales for the specific user
//         if (!startDate && !endDate && !date) {
//             const [rows] = await getSalesDataByUser(userID);
//             return res.status(200).json(rows);
//         }

//         // If startDate and endDate are provided, fetch sales for the user within that range
//         if (startDate && endDate) {
//             const [rows] = await getSalesDataByUserAndRange(userID, startDate, endDate);
//             return res.status(200).json(rows);
//         }

//         // If a specific date is provided, fetch sales for the user on that date
//         if (date) {
//             const formattedDate = new Date(date).toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
//             const [rows] = await getSalesDataByUserAndDate(userID, formattedDate);
//             return res.status(200).json(rows);
//         }

//         // If only userID is provided, return all sales for that user
//         const [rows] = await getSalesDataByUser(userID);
//         return res.status(200).json(rows);

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = { recordSale, getSales };



const {
    addSale,
    getSalesAggregatesByUser,
    getSalesRecordsByUser,
    getSalesAggregatesByRange,
    getSalesRecordsByRange,
    getSalesAggregatesByDate,
    getSalesRecordsByDate,
} = require('../models/Sales');

// Record a sale
const recordSale = async (req, res) => {
    const { userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time } = req.body;

    if ([userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time].includes(undefined)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await addSale(userID, billNumber, totalBill, paidAmount, balance, paymentType, date, time);
        res.status(201).json({ message: 'Sale recorded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch sales data with aggregates and records
const getSalesWithAggregatesAndRecords = async (req, res) => {
    const { userID, startDate, endDate, date } = req.query;

    if (!userID) {
        return res.status(400).json({ error: 'userID is required' });
    }

    try {
        let aggregates, individualRecords;

        if (startDate && endDate) {
            // Date range filter
            const [aggResult] = await getSalesAggregatesByRange(userID, startDate, endDate);
            const [records] = await getSalesRecordsByRange(userID, startDate, endDate);
            aggregates = aggResult;
            individualRecords = records;
        } else if (date) {
            // Specific date filter
            const [aggResult] = await getSalesAggregatesByDate(userID, date);
            const [records] = await getSalesRecordsByDate(userID, date);
            aggregates = aggResult;
            individualRecords = records;
        } else {
            // Fetch all data for the user
            const [aggResult] = await getSalesAggregatesByUser(userID);
            const [records] = await getSalesRecordsByUser(userID);
            aggregates = aggResult;
            individualRecords = records;
        }

        res.status(200).json({ aggregates, records: individualRecords });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { recordSale, getSalesWithAggregatesAndRecords };

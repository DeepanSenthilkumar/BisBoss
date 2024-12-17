const { createMoneyOut, getMoneyOutByUserAndDate } = require('../models/MoneyOut');

const addMoneyOut = async (req, res) => {
    const { userID, payee, paidAmount, reason, paymentType, date, time } = req.body;

    if (!userID || !payee || !paidAmount || !paymentType || !date || !time) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        await createMoneyOut(userID, payee, paidAmount, reason, paymentType, date, time);
        res.status(201).json({ message: 'Money out record created successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMoneyOut = async (req, res) => {
    const { userID, date, startDate, endDate } = req.query;

    if (!userID || (!date && !startDate)) {
        return res.status(400).json({ error: 'userID and either date or startDate are required.' });
    }
    
    try {
        const [records] = await getMoneyOutByUserAndDate(
            userID,
            startDate || date,
            endDate || null
        );

        if (records.length > 0) {
            res.status(200).json({ records });
        } else {
            res.status(404).json({ message: 'No records found.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addMoneyOut, getMoneyOut };

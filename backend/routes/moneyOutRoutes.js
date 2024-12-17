const express = require('express');
const { addMoneyOut, getMoneyOut } = require('../controllers/moneyOutController');

const router = express.Router();

router.post('/add', addMoneyOut);
router.get('/fetch', getMoneyOut);

module.exports = router;

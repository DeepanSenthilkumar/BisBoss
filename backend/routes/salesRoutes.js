// const express = require('express');
// const { recordSale, getSales } = require('../controllers/salesController');
// const router = express.Router();

// router.post('/sale', recordSale);
// router.get('/sales', getSales);

// module.exports = router;


const express = require('express');
const { recordSale, getSalesWithAggregatesAndRecords } = require('../controllers/salesController');

const router = express.Router();

router.post('/sale', recordSale);
router.get('/sales/full-data', getSalesWithAggregatesAndRecords);

module.exports = router;

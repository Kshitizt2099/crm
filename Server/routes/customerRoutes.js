const express = require('express');
const { createCustomer } = require('../controllers/customerController');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/create', createCustomer);

module.exports = router;

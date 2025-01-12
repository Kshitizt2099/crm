const express = require('express');
const { raiseTicket, viewTickets } = require('../controllers/ticketController');
const { updateTicketStatus } = require('../controllers/ticketController');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/raise', authenticateJWT, raiseTicket);
router.get('/view', authenticateJWT, viewTickets);
router.put('/update-status', authenticateJWT, updateTicketStatus);

module.exports = router;

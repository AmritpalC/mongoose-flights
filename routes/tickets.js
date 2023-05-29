const express = require('express');
const router = express.Router();

// ? Controller
const ticketsCtrl = require('../controllers/tickets')

/* GET / flights/:id/tickets/new (new functionality - optionally display
    a dedicated form used to create a nested resource) */
router.get('/flights/:id/tickets/new', ticketsCtrl.new)

/* POST / flights/:id/tickets (create functionality 1:M) */
router.post('/flights/:id/tickets', ticketsCtrl.create)

// As not M:M - no associated POST routing required

module.exports = router;
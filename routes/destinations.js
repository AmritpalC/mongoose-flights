const express = require('express');
const router = express.Router();

// ? Controller
const destinationsCtrl = require('../controllers/destinations')

/* POST / destinations (create functionality) */
router.post('/flights/:id/destinations', destinationsCtrl.create)

module.exports = router;

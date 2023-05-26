const express = require('express');
const router = express.Router();

// ? Controller
const destinationsCtrl = require('../controllers/destinations')

/* GET home page. */
router.post('/flights/:id/destinations', destinationsCtrl.create)

module.exports = router;

const express = require('express');
const router = express.Router();

const flightsCtrl = require('../controllers/flights');

router.get('/', flightsCtrl.index);

router.get('flights/new', flightsCtrl.new);

// router.post('/', flightsCtrl.create);

module.exports = router;

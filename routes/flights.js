const express = require('express');
const router = express.Router();

const flightsCtrl = require('../controllers/flights');

router.get('/', flightsCtrl.index);

router.get('/:id', flightsCtrl.show);

router.get('/new', flightsCtrl.new);

router.post('/', flightsCtrl.create);

module.exports = router;

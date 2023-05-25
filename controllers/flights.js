const Flights = require('../models/flight')

async function index(req,res, next) {
    const allFlights = await Flights.find({})
    // console.log('allFlights ->', allFlights)
    res.render('flights/index', {
        title: 'Search Flights',
        flights: allFlights
    });
}

// ? GET flights/new

async function newFlight(req, res, next) {
    res.render('flights/new', {
        title: 'Add Flight'
    })
}

module.exports = {
    index, 
    new: newFlight
}
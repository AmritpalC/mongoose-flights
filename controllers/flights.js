const Flights = require('../models/flight')

async function index(req,res, next) {
    const allFlights = await Flights.find({})
    // console.log('allFlights ->', allFlights)
    res.render('flights/index', {
        title: 'Search Flights',
        flights: allFlights
    });
}

// console.log(Flights.find())


// function index(req, res, next) {
//     res.render('flights/index', {
//         title: 'Search Flights'
//     });
// }

module.exports = {
    index
}
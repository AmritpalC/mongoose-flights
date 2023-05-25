const Flight = require('../models/flight')

async function index(req, res, next) {
    const allFlights = await Flight.find({})
    console.log(allFlights[0])

    res.render('flights/index', {
        title: 'Search Flights',
        flights: allFlights
    });
}

// ? GET flights/:id
async function show(req, res, next) {
    try {
        const { id } = req.params
        const flight = await Flight.findById(id)
        res.render('flights/show', {
            title: 'Flight Information',
            flight
        })
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        next()
    }
}

// ? GET flights/new
async function newFlight(req, res, next) {
    res.render('flights/new', { title: 'Add Flight', errorMessage: '' })
}

// ? POST / flights
async function create(req, res, next) {
    try {
        // ? add whitespace removal functionality for flight number?
        const body = {
            ...req.body,
            // flightNo: req.body.flightNo.trim(),
        }
        const createdFlight = await Flight.create(body)
        console.log(createdFlight._id)
        res.redirect(`/flights/${createdFlight._id}`) // ? Will work once I get to lab 2 and implement show functionality for each flight no
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        res.render('flights/new', { title: 'Add Flight', errorMessage: err.message })
    }
}

module.exports = {
    index, 
    new: newFlight,
    create,
    show
}
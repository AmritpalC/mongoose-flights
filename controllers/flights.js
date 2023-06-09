const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

async function index(req, res, next) {
    const allFlights = await Flight.find({})
    // Using UTC timestamp (.getTime()) to sort dates as departs alone wasn't working as intended 
    allFlights.sort((a, b) => a.departs.getTime() - b.departs.getTime())
    console.log(allFlights[0])

    res.render('flights/index', {
        title: 'Search Flights',
        flights: allFlights
    });
}

// ? GET flights/:id
async function show(req, res, next) {
    const { id } = req.params
    try {
        const flight = await Flight.findById(id).exec()
        const tickets = await Ticket.find({ flight: flight._id }).exec()
                       
            res.render('flights/show', {
                title: 'Flight Information',
                flight,
                tickets
            })
            // })    deleted ) on next line
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        next(err)
    }
}

// ? GET flights/new
async function newFlight(req, res, next) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate, title: 'Add Flight', errorMessage: '' });
    // res.render('flights/new', { title: 'Add Flight', errorMessage: '' })
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
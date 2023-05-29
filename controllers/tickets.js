const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

async function newTicket(req, res) {
    const flightId = req.params.id
    const tickets = await Ticket.find({}).sort('name')
    const flight = await Flight.findById(flightId)
    res.render('tickets/new', { title: 'Add a ticket', tickets, flight })
}

async function create(req, res) {
    const flightId = req.params.id
    try {
        const ticketInfo = { ...req.body, flight: flightId }

        await Ticket.create(ticketInfo)
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
    }
    res.redirect(`/flights/${flightId}`)
}

module.exports = {
    new: newTicket,
    create,
}
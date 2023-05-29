const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

async function newTicket(req, res) {
    const flightId = req.params.id
    const tickets = await Ticket.find({}).sort('name')
    const flight = await Flight.findById(flightId)
    res.render('tickets/new', { title: 'Add a ticket', duplicateSeat: '', tickets, flight })
}

async function create(req, res) {
    const flightId = req.params.id
    const { seat }  = req.body
    try {
        // checking if seat is already taken - if so return an error to user
        const existingTicket = await Ticket.findOne({ flight: flightId, seat })
        if (existingTicket) {
            const duplicateSeat = 'Seat is already taken'
            return res.redirect(`/flights/${flightId}/tickets/new?errorMessage=${encodeURIComponent(duplicateSeat)}`)
        }
        const ticketInfo = { ...req.body, flight: flightId }
        await Ticket.create(ticketInfo)
        res.redirect(`/flights/${flightId}`)
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        res.redirect(`/flights/${flightId}/tickets/new`)
    }
}

module.exports = {
    new: newTicket,
    create,
}
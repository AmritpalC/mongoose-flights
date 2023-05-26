const Flight = require('../models/flight')

async function create(req, res, next) {
    const { id } = req.params
    try {
        const destination = { airport, arrival }
        const { airport, arrival } = req.body
        const flight = await Flight.findById(id)

        //push destinations info into flight
        flight.destinations.push(destination)

        // Save parent doc
        await flight.save()
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        res.render('flights/show', { title: 'Flight Information', errorMessage: err.message })
    }
    res.redirect(`/flights/${id}`)
}

module.exports = {
    create
}
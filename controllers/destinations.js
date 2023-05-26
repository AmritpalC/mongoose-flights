const Flight = require('../models/flight')

async function create(req, res, next) {
    const { id } = req.params
    try {
        const flight = await Flight.findById(id)
        const destination = { airport, arrival }
        const { airport, arrival } = req.body

        //push destinations info into flight
        flight.destinations.push(destination)

        // Save parent doc
        await flight.save()
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
    }
    res.redirect(`/flights/${id}`)
}

module.exports = {
    create
}

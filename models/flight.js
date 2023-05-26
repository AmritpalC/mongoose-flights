const mongoose = require('mongoose')

//? destinationSchema subdoc

const destinationSchema = new mongoose.Schema({
    airport: { type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'] },
    arrival: { type: Date }
})

const flightSchema = new mongoose.Schema({
    airline: { type: String, enum: ['American', 'Southwest', 'United'], required: true },
    airport: { type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: 'DEN' },
    flightNo: { type: Number, min: 10, max: 9999, required: true },
    departs: {type: Date, default: function() {
        const oneYearFromNow = new Date()
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
        return oneYearFromNow
    }},
    destinations: [destinationSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Flights', flightSchema)
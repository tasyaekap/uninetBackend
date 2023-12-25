const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    userId: {
        type: 'ObjectId'
    },
    clockedIn: {
        dateTime : {
            type: Date
        },
        coordinate: {
            long: {
                type: Number,
            },
            lat: {
                type: Number,
            },
        },
        ipAdress: {
            type: String,
        },
    },
    clockedOut: {
        dateTime : {
            type: Date
        },
        coordinate: {
            long: {
                type: Number,
            },
            lat: {
                type: Number,
            },
        },
        ipAdress: {
            type: String,
        },
    },
})

module.exports = mongoose.model('Absence', Schema)


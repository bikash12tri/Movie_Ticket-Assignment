const theaterModel = require('../models/theatersModel')
const movieModel = require('../models/movieModel')
const bookingModel = require('../models/bookingModel')

const bookTicket = async (req, res) => {
    try {
        let {userId, theaterId, movieId} = req.params
        let findTheater = await theaterModel.findById(theaterId)
        if (!findTheater) {
            return res.status(404).send({ status: false, message: 'Theater not found' })
        }
        let findMovie = await movieModel.findOne({_id: movieId, isOutDated: false})
        if (!findMovie) {
            return res.status(404).send({ status: false, message: 'Movie not found' })
        }
        let obj = {
            userId: userId,
            theaterId: theaterId,
            movieId: movieId,
            theater: findTheater.name,
            movieName: findMovie.name,
            time: req.body.time,
            duration: findMovie.runTime,
            price: req.body.price
        }
        req.body = {...(req.body), ...obj}
        let bookTicket = await bookingModel.create(req.body)
        return res.status(201).send({ status: true, msg: 'Ticket booked successfully', Ticket: bookTicket })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const rescheduleBooking = async (req, res) => {
    try {
        let {ticketId} = req.params
        let {time} = req.body
        let findTicket = await bookingModel.findByIdAndUpdate(ticketId, {time: time, updatedAt: new Date().toLocaleString()}, {new: true})
        if (!findTicket) {
            return res.status(404).send({ status: true, msg: 'Ticket not found'})
        }
        return res.status(200).send({ status: true, msg: 'timing reschuduled successfully', Ticket: findTicket })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {bookTicket, rescheduleBooking}
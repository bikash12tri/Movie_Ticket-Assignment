const express = require("express")
const router = express.Router()

const {createUser, login, fetchUser, fetchUserBySearch, fetchUserById, updateUser} = require('../controllers/userController')
const {createMovie, getMovies, searchMovieByName, updateMovies, deleteMovie} = require('../controllers/moviesController')
const {createTheater, getTheaters, searchTheaterByName, updateTheater} = require('../controllers/theatersController')
const {bookTicket, rescheduleBooking} = require('../controllers/bookTicketController')
const {authentication, authorization} = require('../middlewares/auth')

router.post('/createUser', createUser)
router.post('/login', login)
router.get('/fetchUser/:page', authentication, fetchUser)
router.get('/fetchUserById/:userId', authentication, fetchUserById)
router.get('/fetchUserBySearch/:search', authentication, fetchUserBySearch)
router.put('/updateUser/:userId', authentication, authorization, updateUser)

router.post('/createMovie', authentication, createMovie)
router.get('/getMovies', authentication, getMovies)
router.get('/searchMovieByName', authentication, searchMovieByName)
router.put('/updateMovies/:userId', authentication, authorization, updateMovies)
router.delete('/deleteMovie/:userId', authentication, authorization, deleteMovie)

router.post('/createTheater', authentication, createTheater)
router.get('/getTheaters', authentication, getTheaters)
router.get('/searchTheaterByName', authentication, searchTheaterByName)
router.put('/updateTheater/:userId', authentication, authorization, updateTheater)

router.post('/user/:userId/movie/:movieId/theater/:theaterId', authentication, bookTicket)
router.put('user/:userId/rescheduleBooking/:ticketId', authentication, authorization, rescheduleBooking)

router.all("/*", function (req, res) { 
    return res.status(400).send({ status: false, message: "invalid http request" });
});

module.exports = router
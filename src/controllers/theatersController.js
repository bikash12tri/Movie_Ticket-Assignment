const theaterModel = require('../models/theatersModel')

const createTheater = async (req, res) => {
    try {
        let {name, location, pin} = req.body
        req.body.userId = req.decodedToken.userId
        if (!name) {
            return res.status(400).send({ status: false, message: "Theater name is required" })
        }
        if (!location) {
            return res.status(400).send({ status: false, message: "Theater location is required" })
        }
        if (!pin) {
            return res.status(400).send({ status: false, message: "Pin code is required" })
        }
        let saveData = await theaterModel.create(req.body)
        return res.status(201).send({ status: false, msg: 'Theater created successfully', Theater: saveData})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const getTheaters = async (req, res) => {
    try {
        let {page} = req.query
        let findData = await theaterModel.find().select({_id:0, createdAt: 0, updatedAt: 0}).skip(2*(page-1)).limit(2)
        return res.status(200).send({ status: false, Theater: findData})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const searchTheaterByName = async (req, res) => {
    try {
        let search = ''
        if (req.query.search) {
            search = req.query.search
        }
        let findTheater = await theaterModel.find({name: {$regex: '.*'+search+'.*', $options: 'i' }}).select({_id:0, createdAt: 0, updatedAt: 0})
        if (!findTheater[0]) {
            return res.status(404).send({ status: false, msg: "Movie not found" })
        }
        return res.status(200).send({ status: false, Theater: findTheater})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const updateTheater = async (req, res) => {
    try {
        let {userId} = req.params
        let data = req.body
        data.updatedAt = new Date().toLocaleString()
        let updateData = await movieModel.findOneAndUpdate({userId: userId, isOutDated: false}, data, {new: true})
        return res.status(200).send({ status: false, msg: 'Movie updated successfully', Movie: updateData})
    } catch (error) {
        
    }
}

module.exports = {createTheater, getTheaters, searchTheaterByName, updateTheater}
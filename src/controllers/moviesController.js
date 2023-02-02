const movieModel = require('../models/movieModel')
const aws = require('../aws/aws')

const createMovie = async (req, res) => {
    try {
        let {userId} = req.decodedToken
        let files = req.files
        let {name, type, category, language, runTime, quality} = req.body
        if (!name) {
            return res.status(400).send({ status: false, message: "Movie name is required" })
        }
        if (!type) {
            return res.status(400).send({ status: false, message: "Movie type is required" })
        } else {
            if (['movie', 'show'].includes(type) == false) {
                return res.status(400).send({ status: false, message: "Type should be either movie or show" })
            }
        }
        if (!category) {
            return res.status(400).send({ status: false, message: "Movie category is required" })
        }
        if (!language) {
            return res.status(400).send({ status: false, message: "Movie language is required" })
        }
        if (!runTime) {
            return res.status(400).send({ status: false, message: "Movie Run time is required" })
        }
        if (!quality) {
            return res.status(400).send({ status: false, message: "Movie quality is required" })
        }
        req.body.userId = userId
        let uploadThumbnail = await aws.uploadThumbnail(files[0])
        req.body.image = uploadThumbnail
        let saveData = await movieModel.create(req.body)
        return res.status(201).send({ status: false, msg: 'Movie created successfully', Movie: saveData})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const getMovies = async (req, res) => {
    try {
        let {page} = req.query
        let findData = await movieModel.find({isOutDated: false}).select({_id:0, userId: 0, createdAt: 0, updatedAt: 0}).skip(2*(page-1)).limit(2)
        return res.status(200).send({ status: false, Movie: findData})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const searchMovieByName = async (req, res) => {
    try {
        let search = ''
        if (req.query.search) {
            search = req.query.search
        }
        let findMovie = await movieModel.find({name: {$regex: '.*'+search+'.*', $options: 'i' }, isOutDated: false}).select({_id:0, userId: 0, createdAt: 0, updatedAt: 0})
        if (!findMovie[0]) {
            return res.status(404).send({ status: false, msg: "Movie not found" })
        }
        return res.status(200).send({ status: false, Movie: findMovie})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const updateMovies = async (req, res) => {
    try {
        let {userId} = req.params
        let data = req.body
        data.updatedAt = new Date().toLocaleString()
        let updateData = await movieModel.findOneAndUpdate({userId: userId, isOutDated: false}, data, {new: true})
        return res.status(200).send({ status: false, msg: 'Movie updated successfully', Movie: updateData})
    } catch (error) {
        
    }
}

const deleteMovie = async (req, res) => {
    try {
        let {userId} = req.params
        req.body.outDatedAt = new Date().toLocaleString()
        let updateData = await movieModel.findOneAndUpdate({userId: userId, isOutDated: false}, {isOutDated: true}, {new: true})
        return res.status(200).send({ status: false, msg: 'Movie updated successfully', Movie: updateData})
    } catch (error) {
        
    }
}

module.exports = {createMovie, getMovies, searchMovieByName, updateMovies, deleteMovie}
const User = require('../models/User')
const { getAllServices, createServices, getOneServices, removeServices, updateServices, setFavoritesServices } = require('../services/user.services')
const catchError = require('../utils/catchError')
const jwt = require('jsonwebtoken')

const getAll = catchError(async(req, res) => {
    const results = await getAllServices()
    return res.status(200).json(results)
})

const create = catchError(async(req, res) => {
    const body = {...req.body, password: req.passwordHash}
    const result = await createServices(body)
    return res.status(201).json(result)
})

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const result = await getOneServices(id)
    if(!result) return res.sendStatus(404)
    return res.status(200).json(result)
})

const remove = catchError(async(req, res) => {
    const {id} =req.params
    const result = await removeServices(id)
    if(!result) return res.sendStatus(404)
    return res.sendStatus(204)
})

const update = catchError(async(req, res) => {
    const {id} = req.params
    const result = await updateServices(id, req.body)
    if(result[0]===0) return res.sendStatus(404)
    return res.json(result[1][0])
})

const login = catchError(async(req, res) => {
    const user = req.userLogin
    if(!user) return res.status(401).json({error:"Invalid credentials"})
    
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn: '1d'}
    )

    return res.json({user, token})
})

const logged = catchError(async(req,res) => {
    return res.json(req.user)
}) 

const setFavorites = catchError(async(req, res) => {
    const {id} = req.params
    const user = await User.findByPk(id)
    await user.setPosts(req.body)
    const posts = await user.getPosts()
    
    return res.json(posts)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logged,
    setFavorites
}
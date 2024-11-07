const bcrypt = require('bcrypt')
const { getUserServices } = require('../services/user.services')

const credentials = async (req, res, next) => {
    const {email, password} = req.body

    const user = await getUserServices(email)
    if(!user) res.status(401).json({error: "invalid"})

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) res.status(401).json({error: "invalid"})

    req.userLogin = user

    next()
}

module.exports = credentials
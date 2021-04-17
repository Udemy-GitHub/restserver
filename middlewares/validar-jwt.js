const User = require('../models/user')

const jwt = require('jsonwebtoken')

const jwtValidation = async ( req, res, next ) => {

    const token = req.header('token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY)

        const user = req.user = await User.findById(uid)

        if (!user) {
            return res.status(401).json({
                msg: 'Token inválido'
            })
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Token inválido'
            })
        }

        req.user = user;
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token inválido'
        })
    }


}

module.exports = {
    jwtValidation
}
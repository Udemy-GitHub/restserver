const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { generatejwt } = require('../helpers/generate-jwt')

const login = async (req, res) => {
 
    const { email, password } = req.body
    
    try {

        const user = await User.findOne({ email, status: true })
        
        if (!user) {
            return res.status(400).json({
                msg: 'El correo y/o contraseña no son correctos'
            })
        }

        const passwordValidation = bcryptjs.compareSync( password, user.password )

        if (!passwordValidation) {
            return res.status(400).json({
                msg: 'El correo y/o contraseña no son correctos'
            })
        }

        const token = await generatejwt( user.id )

        res.json({
          user,
          token
        })

    } catch (error) {
        log.error(error)
        return res.status(500).json({ 
            msg: 'Hable con el administrador'
        })
    }

    
}

module.exports = {
    login
}
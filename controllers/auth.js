const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { generatejwt } = require('../helpers/generate-jwt')
const { googleVerify } = require('../helpers/google-verify')

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

const googleSignIn = async (req, res) => {

    const { id_token } = req.body

    try {

        const { name, email, img } = await googleVerify(id_token)

        let user = await User.findOne({ email })

        if (!user) {

            const data = {
                name,
                email,
                password: ':)',
                img,
                google: true
            }

            user = new User(data)
            await user.save()

        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generatejwt( user.id )

        res.json({
            user,
            token
        })

    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }

}

module.exports = {
    login,
    googleSignIn
}
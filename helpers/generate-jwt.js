const jwt = require('jsonwebtoken')

const generatejwt = ( uid = '' ) => {

    return new Promise((resolve, reject) => {

        const payload = { uid }

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token ) => {

            if (err) {
                log.error(err)
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }

        })

    })

}

module.exports = {
    generatejwt
}
const Role = require('../models/role')
const User = require('../models/user');

const roleValidation = async (role = '') => {
    
    const roleExists = await Role.findOne({ role })
    if (!roleExists) {
        throw new Error(`El role ${ role } no está registrado en la BD`)
    }

}

const emailValidation = async (email = '') => {

    const emailExists = await User.findOne({ email })
        
    if (emailExists) {
        throw new Error(`El correo ${ email } ya está registrado`)
    }

}

const idValidation = async (id) => {

    const idExists = await User.findById( id )
    if (!idExists) {
        throw new Error(`El id ${ id } no existe`)
    }

}


module.exports = {
    roleValidation,
    emailValidation,
    idValidation
}
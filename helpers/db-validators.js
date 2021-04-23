// const Role = require('../models/role')
// const User = require('../models/user')
// const Category = require('../models/category')

const { Role, User, Category, Product } = require('../models')

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

const idCategoryValidation = async (id) => {

    const idExists = await Category.findById( id )
    if (!idExists) {
        throw new Error(`El id ${ id } no existe`)
    }

}

const idProductValidation = async (id) => {

    const idExists = await Product.findById( id )
    if (!idExists) {
        throw new Error(`El id ${ id } no existe`)
    }

}

const collectionValidation = (collection = '', collections = []) => {

    const collectionExists = collections.includes(collection)

    if (!collectionExists) {
        throw new Error(`La colección ${collection} no es permitida. Consulte las colecciones permitidas: ${collections}`)
    }

    return true

}

const documentValidation = async (collection = '', id = '') => {

    let model;

    switch (collection) {
        case 'products':
        
            model = await Product.findById(id)

            if (!model) {
                throw (`No existe un producto con el id ${id}`)
                
            }

            break
        case 'users':

            model = await User.findById(id)

            if (!model) {
                throw (`No existe un usuario con el id ${id}`)
            }

            break
        default:
            throw ('Se me olvidó validar esto')

    }

    return model

}

module.exports = {
    roleValidation,
    emailValidation,
    idValidation,
    idCategoryValidation,
    idProductValidation,
    collectionValidation,
    documentValidation
}
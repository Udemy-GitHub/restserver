const { ObjectId } = require('mongoose').Types

const { Category, Product, User } = require('../models')

const allowedCollections = [
    'categories',
    'products',
    'roles',
    'users'
]

const searchCategories = async ( term = '', res) => {

    const regex = new RegExp(term, 'i')

    const categories = await Category.find({ name: regex, status: true })

    res.json({
        results: categories   
    })

}

const searchProducts = async ( term = '', res) => {

    const regex = new RegExp(term, 'i')

    const products = await Product.find({ 
        $or: [ { name: regex }, { description: regex } ],
        $and: [ { status: true } ]
     }).populate('category', 'name')

    res.json({
        results: products   
    })

}

const searchUsers = async (term = '', res) => {

    const idMongoValidation = ObjectId.isValid(term)

    if (idMongoValidation) {
        const user = await User.findById(term)
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp(term, 'i')

    const users = await User.find( {
        $or: [ { name: regex }, { email: regex } ],
        $and: [ { status: true } ]
     } )

    res.json({
        results: users
    })

}

const search = async (req, res) => {

    const { collection, term } = req.params

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${allowedCollections}`
        })
    }

    switch (collection) {
        case 'categories':
            searchCategories(term, res)
            break
        case 'products':
            searchProducts(term, res)
            break
        case 'users':
            searchUsers(term, res)
            break
        default:
            res.status(500).json({
                msg: 'Se me olvidó hacer está búsqueda'
            })
    }

}

module.exports = {
    search
}
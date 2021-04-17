const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const getUsers = async (req, res) => {
    
    const { skip = 0, limit = 5 } = req.query
    const query = { status: true }

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(skip)).limit(Number(limit))
    ])

    res.json({
        total,
        users
    })

}

const putUsers = async (req, res) => {
    
    const { id } = req.params
    const { _id, password, google, email, ...user } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password, salt)
    }

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })

    res.json(updatedUser)

}

const postUsers = async (req, res) => {

    const { name, email, password, role } = req.body
    const user = new User( { name, email, password, role } )

    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    res.json({
        user
    })

}

const deleteUsers = async (req, res) => {
    
    const { id } = req.params
    
    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true })

    res.json({
        user
    })

}

const patchUsers = (req, res) => {
    res.json({
        msg: 'patch API'
    })
}

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
    patchUsers
}
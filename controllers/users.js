
const getUsers = (req, res) => {
    
    const { q } = req.query

    res.json({
        msg: 'get API',
        q
    })
}

const putUsers = (req, res) => {
    
    const { id } = req.params;

    res.json({
        msg: 'put API',
        id
    })
}

const postUsers = (req, res) => {
    
    const { name, age } = req.body

    res.json({
        msg: 'post API',
        name,
        age
    })
}

const deleteUsers = (req, res) => {
    res.json({
        msg: 'delete API'
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
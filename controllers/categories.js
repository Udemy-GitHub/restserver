const Category = require('../models/category')

const getCategories = async (req, res) => {
    
    const { skip = 0, limit = 5 } = req.query
    const query = { status: true }

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('user', 'name')
    ])

    res.json({
        total,
        categories
    })

}

const getCategory = async (req, res) => {
    
    const { id } = req.params

    const category = await Category.findById(id).populate('user', 'name')

    res.json({
        category
    })

}

const putCategories = async (req, res) => {
    
    const name = req.body.name.toUpperCase()

    const categoryDB = await Category.findOne({ name })

    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoría ${categoryDB.name}, ya existe`
        })
    }

    const { id } = req.params
    
    const data = { 
        name,
        user: req.user._id
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true })

    res.json(updatedCategory)

}

const postCategories = async (req, res) => {

    const name = req.body.name.toUpperCase()

    const categoryDB = await Category.findOne({ name })

    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoría ${categoryDB.name}, ya existe`
        })
    }

    const data = { 
        name,
        user: req.user._id
    }

    const category = new Category( data )

    await category.save()

    res.status(201).json({
        category
    })

}

const deleteCategories = async (req, res) => {
    
    const { id } = req.params
    
    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true })

    res.json({
        category
    })

}

module.exports = {
    getCategories,
    getCategory,
    putCategories,
    postCategories,
    deleteCategories
}
const Product = require('../models/product')

const getProducts = async (req, res) => {
    
    const { skip = 0, limit = 5 } = req.query
    const query = { status: true }

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('user', 'name')
            .populate('category', 'name')
    ])

    res.json({
        total,
        products
    })

}

const getProduct = async (req, res) => {
    
    const { id } = req.params

    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name')

    res.json({
        product
    })

}

const putProducts = async (req, res) => {
    
    const { status, user, ...body} = req.body
    
    if (body.name) {
        
        body.name = body.name.toUpperCase()
        
        const productDB = await Product.findOne({ name: body.name })
    
        if (productDB) {
            return res.status(400).json({
                msg: `El producto ${productDB.name}, ya existe`
            })
        }

    }

    const { id } = req.params
    
    const data = { 
        ...body,
        user: req.user._id
    }

    const updatedCategory = await Product.findByIdAndUpdate(id, data, { new: true })

    res.json(updatedCategory)

}

const postProducts = async (req, res) => {

    const { status, user, ...body} = req.body

    body.name = body.name.toUpperCase()

    const productDB = await Product.findOne( { name: body.name } )

    if (productDB) {
        return res.status(400).json({
            msg: `El producto ${productDB.name}, ya existe`
        })
    }

    const data = { 
        ...body,
        user: req.user._id
    }

    const product = new Product( data )

    await product.save()

    res.status(201).json({
        product
    })

}

const deleteProducts = async (req, res) => {
    
    const { id } = req.params
    
    const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true })

    res.json({
        product
    })

}

module.exports = {
    getProducts,
    getProduct,
    putProducts,
    postProducts,
    deleteProducts
}
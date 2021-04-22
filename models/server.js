const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        
        this.app = express()        
        this.port = process.env.PORT

        this.path = {
            auth: '/api/auth',
            search: '/api/search',
            categories: '/api/categories',
            users: '/api/users',
            products: '/api/products'
        }

        // this.usersPath = '/api/users'
        // this.authPath = '/api/auth'
        // this.categoriesPath = '/api/categories'

        this.conectarDB()

        this.middlewares()

        this.routes()

    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {

        this.app.use(cors())

        this.app.use(express.json())
        
        this.app.use(express.static('public'))
    
    }

    routes() {
        
        this.app.use(this.path.auth, require('../routes/auth'))
        this.app.use(this.path.search, require('../routes/search'))
        this.app.use(this.path.categories, require('../routes/categories'))
        this.app.use(this.path.users, require('../routes/users'))
        this.app.use(this.path.products, require('../routes/products'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }

}

module.exports = Server
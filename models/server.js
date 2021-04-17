const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        
        this.app = express()        
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'

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
        
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usersPath, require('../routes/users'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }

}

module.exports = Server
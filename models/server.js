const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io');
const Sockets = require('./socket');
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.server = http.createServer(this.app)

        this.io = socketio(this.server)
    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')))
        this.app.use(cors())
    }

    configSocket() {
        new Sockets( this.io )
    }

    execute() {
        this.middlewares()
        this.configSocket()
        this.server.listen(this.port, () => console.log(`Listening in port ${this.port}`))
    }

}

module.exports = Server
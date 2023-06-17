const mongoose = require('mongoose')

const countConnections = () => {
    return mongoose.connections.length
}

module.exports = {
    countConnections
}
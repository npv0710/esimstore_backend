const mongoose = require('mongoose')

const config = require('../configs');
const { countConnections } = require('../helpers/check.conection');

class MongoDb {
    constructor() {
        this.connect()
    }

    options = {
        maxPoolSize: 10,
        //useUnifiedTopology: true
    }

    connect() {
        mongoose.connect(config.db.mongoDbUri, this.options)
        .then(() => {
            console.log('Connection mongodb established');
            console.log('Number of connections: ' + countConnections());
        })
        .catch (err => console.log('Connect Db error: ', err))
    }

    static getInstance = () => {
        if (!MongoDb.instance) {
            MongoDb.instance = new MongoDb()
        }
        return MongoDb.instance
    }
}

const mongoDbInstance = MongoDb.getInstance()

module.exports = mongoDbInstance

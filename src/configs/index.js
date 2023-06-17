const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 8080,
        basePath: process.env.BASE_PATH || '/api/v1'
    },
    db: {
        mongoDbUri: process.env.DEV_MONGODB_URI || 'mongodb://localhost:27017/aliconcon'
    }
}

const pro = {

}

const config = { dev, pro }

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
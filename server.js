require('dotenv').config()

const config = require('./src/configs')

const app = require('./src/app')

console.log(config)

const PORT = config.app.port

const server = app.listen(PORT, () => {
    console.log('Server started and listening at port: ' + PORT);
})

process.on('SIGINT', () => {
    server.close(() => console.log('Exit server express'))
    process.exit()
})
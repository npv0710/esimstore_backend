const express = require('express')
const config = require('./configs')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const router = require('./routes')
const { NotFoundError } = require('./response/error/error.response')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

//init db
require('./dbs/mongodb')

app.use('/', router);

app.use((req, res, next) => {
    const err = new NotFoundError({
        message: 'Api endpoint not found'
    })

    next(err)
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    res.status(status).json({
        name: error.name,
        status: status,
        message: error.message
    })
})

module.exports = app

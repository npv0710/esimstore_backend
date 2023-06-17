'use strict'

const express = require('express')

const router = express.Router()

const accessRouter = require('./access/access.routes')

const config = require('../configs/index')

router.use(config.app.basePath, accessRouter)

router.get('', (req, res, next) => {
    const strCompress = 'Hello Guest'

    res.status(200).json({
        message: 'Welcome esim store api',
        metaData: strCompress
    })
})


module.exports = router


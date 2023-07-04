'use strict'

const express = require('express')
const accessController = require('../../controllers/access/access.controller')

const accessRouter = express.Router()

const { handlerError } = require('../../middleware/handler.error')
const { authentication } = require('../../utils/auth.utils')

accessRouter.post('/user/signin', handlerError(accessController.signin))
accessRouter.post('/user/signup', handlerError(accessController.signup))

accessRouter.use(authentication)

accessRouter.post('/user/logout', handlerError(accessController.logout))

module.exports = accessRouter
'use strict'

const express = require('express')
const AccessController = require('../../controllers/access/access.controller')

const accessRouter = express.Router()

const { handlerError } = require('../../middleware/handler.error')

accessRouter.post('/user/signin', handlerError(AccessController.signin))
accessRouter.post('/user/signup', handlerError(AccessController.signup))

module.exports = accessRouter
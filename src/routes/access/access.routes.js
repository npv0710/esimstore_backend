'use strict'

const express = require('express')
const accessController = require('../../controllers/access/access.controller')

const accessRouter = express.Router()

const { handlerError } = require('../../middleware/handler.error')

accessRouter.post('/user/signin', handlerError(accessController.signin))
accessRouter.post('/user/signup', handlerError(accessController.signup))

module.exports = accessRouter
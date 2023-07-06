'use strict'

const { HttpStatusCodes, SuccessResponseCode } = require('../../constants')

class SuccessResponse {
    constructor({
        message,
        statusCode = HttpStatusCodes.OK,
        sucessResponseCode = SuccessResponseCode.OK,
        metaData = {}
    }) {
        this.message = message ? message : sucessResponseCode
        this.status = statusCode,
        this.metaData = metaData
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class CreatedResponse extends SuccessResponse {
    constructor({
        message,
        statusCode = HttpStatusCodes.CREATED,
        sucessResponseCode = SuccessResponseCode.CREATED,
        metaData,
        options = {}
    }) {
        super({ message, statusCode, sucessResponseCode, metaData})
        this.options = options
    }
}

class SigninedResponse extends SuccessResponse {
    constructor({
        message,
        statusCode = HttpStatusCodes.OK,
        sucessResponseCode = SuccessResponseCode.OK,
        metaData,
        options = {}
    }) {
        super({ message, statusCode, sucessResponseCode, metaData })
        this.options = options
    }
}

class LogedOutSuccess extends SuccessResponse {
    constructor({
        message,
        statusCode = HttpStatusCodes.OK,
        sucessResponseCode = SuccessResponseCode.OK,
        metaData,
        options = {}
    }) {
        super({ message, statusCode, sucessResponseCode, metaData })
        this.options = options
    }
}

class RefreshTokenSuccess extends SuccessResponse {
    constructor({
        message,
        statusCode = HttpStatusCodes.OK,
        sucessResponseCode = SuccessResponseCode.OK,
        metaData,
        options = {}
    }) {
        super({ message, statusCode, sucessResponseCode, metaData })
        this.options = options
    }
}

module.exports = {
    CreatedResponse,
    SigninedResponse,
    LogedOutSuccess,
    RefreshTokenSuccess
}

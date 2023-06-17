'use strict'
const { HttpStatusCodes, ErrorNames } = require('../../constants')

class ErrorResponse extends Error {
    constructor({ name, status, message }) {
        super(message)
        this.name = name,
        this.status = status
    }
}

class BadRequestError extends ErrorResponse {
    constructor({
        name = ErrorNames.BAD_REQUEST,
        status = HttpStatusCodes.BAD_REQUEST,
        message = ''
    }) {
            super({ name, status, message })
    }
}

class NotFoundError extends ErrorResponse {
    constructor({
        name = ErrorNames.NOT_FOUND,
        status = HttpStatusCodes.NOT_FOUND,
        message = ''
    }) {
        super({ name, status, message })
    }
}

module.exports = {
    BadRequestError,
    NotFoundError
}
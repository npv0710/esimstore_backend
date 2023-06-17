const HttpStatusCodes = {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    CONFLICT: 409,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401
}

const ErrorNames = {
    FORBIDDEN: 'Forbidden',
    CONFLICT: 'Conflict',
    BAD_REQUEST: 'Bad Request',
    NOT_FOUND: 'Not Found',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    UNAUTHORIZED: 'Unauthorized'
}

const userRole = {
    USER: 'USER',
    MANAGER: 'MANAGER',
    ADMIN: 'ADMIN'
}

module.exports = {
    HttpStatusCodes,
    ErrorNames,
    userRole
}
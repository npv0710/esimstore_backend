const HttpStatusCodes = {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    CONFLICT: 409,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    OK: 200
}

const ErrorNames = {
    FORBIDDEN: 'Forbidden',
    CONFLICT: 'Conflict',
    BAD_REQUEST: 'Bad Request',
    NOT_FOUND: 'Not Found',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    UNAUTHORIZED: 'Unauthorized'
}

const UserRole = {
    USER: 'USER',
    MANAGER: 'MANAGER',
    ADMIN: 'ADMIN'
}

const SuccessResponseCode = {
    CREATED: 'Created',
    OK: 'Ok'
}

module.exports = {
    HttpStatusCodes,
    ErrorNames,
    UserRole,
    SuccessResponseCode
}
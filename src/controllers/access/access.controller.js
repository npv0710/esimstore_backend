const { BadRequestError } = require("../../response/error/error.response")
const AccessService = require("../../services/access.service")
const { CreatedResponse, SigninedResponse } = require("../../response/success/success.response")


class AccessController {
    signin  = async (req, res, next) => {
        new SigninedResponse({
            message: 'Signin successfully',
            metaData: await AccessService.signin(req.body)
        }).send(res)
    }

    signup = async(req, res, next) => {
        new CreatedResponse({
            message: 'User Created',
            metaData: await AccessService.signup(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()
const { BadRequestError } = require("../../response/error/error.response")
const AccessService = require("../../services/access.service")
const { CreatedResponse } = require("../../response/success/success.response")


class AccessController {
    signin  = async (req, res, next) => {
        throw new BadRequestError({ message: 'Parmas not valid'})
    }

    signup = async(req, res, next) => {
        new CreatedResponse({
            message: 'User Created',
            metaData: await AccessService.signup(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()
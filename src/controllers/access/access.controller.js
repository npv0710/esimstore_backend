const { BadRequestError } = require("../../response/error/error.response")
const bcrypt = require('bcrypt')
const AccessService = require("../../services/AccessService")


class AccessController {
    signin  = async (req, res, next) => {
        throw new BadRequestError({ message: 'Parmas not valid'})
    }

    signup = async(req, res, next) => {
        await AccessService.signup(req.body)
    }
}

module.exports = new AccessController()
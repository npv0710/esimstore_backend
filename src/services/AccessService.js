const { userRole } = require('../constants')
const userModel = require('../models/user.model')
const { BadRequestError } = require('../response/error/error.response')

class AccessService {
    static signup = async ({ username, email, password, mobile}) => {
        const user = await userModel.findOne({ username }).lean().exec()
        if (user) {
            throw new BadRequestError({ message: 'Username already registerd'})
        }

        const user2 = await userModel.findOne({ email }).lean().exec()
        if (user2) {
            throw new BadRequestError({ message : 'Email already registered!'})
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = userModel.create({
            username, email, password: passwordHash, mobile, roles: [userRole.USER]
        })

        console.log(newUser)
    }
}

module.exports = AccessService
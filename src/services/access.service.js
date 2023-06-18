const { UserRole } = require('../constants')
const userModel = require('../models/user.model')
const { BadRequestError } = require('../response/error/error.response')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const KeyTokenService = require('./keytoken.service')
const { createTokensPair } = require('../utils/auth.utils')
const { getInfoData } = require('../utils/getInfoData.utils')

class AccessService {
    static signup = async ({ username, email, password, mobile}) => {
        const user = await userModel.findOne({ username }).lean().exec()
        if (user) {
            throw new BadRequestError({ message: 'Username already registered'})
        }

        const user2 = await userModel.findOne({ email }).lean().exec()
        if (user2) {
            throw new BadRequestError({ message : 'Email already registered!'})
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            username, email, password: passwordHash, mobile, roles: [UserRole.USER]
        })

        if (newUser) {
            const publicKey = crypto.randomBytes(64).toString('hex')
            const privateKey = crypto.randomBytes(64).toString('hex')

            const publicKeyString = await KeyTokenService.createKeyToken({ userId: newUser._id, publicKey, privateKey })

            if (!publicKeyString) {
                return {
                    code: 'xxx',
                    message: 'Create public key string error'
                }
            }

            const tokens = await createTokensPair({ userId: newUser._id, email: newUser.email }, publicKey, privateKey)

            return {
                user: getInfoData({ fields: ['_id', 'username', 'email'], object: newUser } ),
                tokens: tokens
            }
        }
    }
}

module.exports = AccessService
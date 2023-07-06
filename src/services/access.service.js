const { UserRole } = require('../constants')
const userModel = require('../models/user.model')
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../response/error/error.response')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const KeyTokenService = require('./keytoken.service')
const { createTokensPair } = require('../utils/auth.utils')
const { getInfoData } = require('../utils/getInfoData.utils')
const { findUserByEmail } = require('./user.service')
const keytokenModel = require('../models/keytoken.model')
const { Types } = require('mongoose')

class AccessService {
    static handlerRefreshToken = async({ keyStore, user, refreshToken }) => {
        const {　userId, email } = user;

        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.deleteKeyByUserId(userId)
            throw new ForbiddenError('Something went wrong! Please　login again')
        }

        if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError('User not registered!')

        const userFound = await findUserByEmail({ email })
        if(!userFound) throw new AuthFailureError('User not registered')

        const tokens = await createTokensPair({ userId, email }, keyStore.publicKey, keyStore.privateKey)

        console.log('key store update in the service:')
        // console.log(keyStore)
        // console.log(typeof(keyStore))

        const keyStore2 = keytokenModel.findOne({ user: new Types.ObjectId( userId )})
        console.log(keyStore2)

        await keyStore2.update({
            $set: {
                refreshToken: tokens.refreshToken
            },
            $addToSet: {
                refreshTokenUsed: refreshToken
            }
        })

        return {
            user,
            tokens
        }
    }

    static logout = async({ keyStore }) => {
        const delKey = await KeyTokenService.removeById(keyStore._id)
        console.log('Key has just remove: ', delKey)
        return delKey
    }

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

    static signin = async ({ email, password, refreshToken = null }) => {
        const user = await findUserByEmail({ email })
        if (!user) throw new BadRequestError({ message: 'User not registered'})
        console.log('user login: ', user)
        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new BadRequestError({ message: 'Invalid Credentials'})

        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        const tokens = await createTokensPair({ userId: user._id, email: email}, publicKey, privateKey)

        await KeyTokenService.createKeyToken({ userId: user._id, publicKey, privateKey, refreshToken: tokens.refreshToken })

        return {
            user: getInfoData({ fields: ['_id', 'username', 'roles'], object: user}),
            tokens
        }

    }
}


module.exports = AccessService
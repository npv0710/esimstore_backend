'use strict'
const JWT = require('jsonwebtoken')
const { handlerError } = require('../middleware/handler.error')
const KeyTokenService = require('../services/keytoken.service')
const { AuthFailureError } = require('../response/error/error.response')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

const createTokensPair = async (payLoad, publicKey, privateKey) => {
    try {
        const accessToken = JWT.sign(payLoad, publicKey, {
            expiresIn: '1 day'
        })

        const refreshToken = JWT.sign(payLoad, privateKey, {
            expiresIn: '7 days'
        })

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) console.log('Verify token error')
            else console.log('Decode verify: ', decode)
        })
        return { accessToken, refreshToken }
    }catch(err) {
        console.log(err)
    }
}

const authentication = handlerError(async(req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new AuthFailureError({ message: 'Client Invalid. Please provide user id!' })

    const keyStore = await KeyTokenService.findUserById(userId)
    if(!keyStore) throw new AuthFailureError({ message: 'Not found key store' })

    console.log('key store of the user: ', keyStore)

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new AuthFailureError({ message: 'Access token required!' })

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        if (userId !== decodeUser.userId) throw new AuthFailureError({ message : 'Invalid user Id!' })

        req.keyStore = keyStore
        return next()
    }catch (err) {
        throw err
    }
})

module.exports = {
    createTokensPair,
    authentication
}






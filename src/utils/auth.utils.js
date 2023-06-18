'use strict'
const JWT = require('jsonwebtoken')

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

module.exports = {
    createTokensPair
}
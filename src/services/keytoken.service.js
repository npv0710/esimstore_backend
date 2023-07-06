const keyTokenModel = require('../models/keytoken.model')
const { Types } = require('mongoose')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            const filter = { user: userId }
            const update = { 
                publicKey, 
                privateKey, 
                refreshTokensUsed: [], 
                refreshToken: refreshToken
            }
            const options = {
                upsert: true,
                new: true
            }
            const keyToken = await keyTokenModel.findOneAndUpdate(filter, update, options)
            console.log('key token serviec: ' + keyToken)
            return keyToken ? keyToken.publicKey : null
        }catch (err) {
            console.log(err)
            return err
        }
    }

    static findByUserId = async userId => {
        return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) }).lean()
    }

    static deleteKeyByUserId = async userId => {
        return keyTokenModel.deleteOne({ user: Types.ObjectId(userId)})
    }

    static removeById = async id => {
        return await keyTokenModel.deleteOne({ _id : id })
    }
}

module.exports = KeyTokenService
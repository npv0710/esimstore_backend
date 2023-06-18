const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const filter = { user: userId }
            const update = { 
                publicKey, 
                privateKey, 
                refreshTokensUsed: [], 
                refreshToken: null
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
}

module.exports = KeyTokenService
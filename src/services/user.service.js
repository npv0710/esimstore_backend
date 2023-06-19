'use strict'
const userModel = require('../models/user.model')

const findUserByEmail = async ({ email, select = {
    email: 1,
    password: 1,
    name: 1, 
    status: 1,
    roles: 1
} }) => {
    return await userModel.findOne({ email })
    .select(select).lean().exec()
}
module.exports = {
    findUserByEmail
}
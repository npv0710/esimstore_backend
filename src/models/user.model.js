'use strict'

const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 150
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 150
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    roles: {
        type: Array,
        default: ['user']
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, userSchema)

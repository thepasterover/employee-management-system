const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    categories: [String]
})

module.exports = mongoose.model('Admin', AdminSchema)
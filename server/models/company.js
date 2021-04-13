const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
        type: String
    },
    categories: [{
        type: String
    }],
    admin: {
        type: Schema.Types.ObjectId
    },
    employees: [{
        type: Schema.Types.ObjectId
    }]
})

module.exports = mongoose.model('Company', companySchema)
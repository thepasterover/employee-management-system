const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desg: {
        type: String
    },
    attendance: {
        type: String,
        default: '10%'
    }
})

module.exports = mongoose.model('Employee', employeeSchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
    date: {
        type: Date
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
})

module.exports = mongoose.model('Work', WorkSchema)
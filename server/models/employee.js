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
    works: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Work'
        }
    ]
})

module.exports = mongoose.model('Employee', employeeSchema)

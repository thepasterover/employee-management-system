const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    salary: {
        type: Number,
    },
    month: {
        type: String,
    },
    type: {
        type: String
    }
})

module.exports = mongoose.model("Salary", SalarySchema)
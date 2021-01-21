const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    employee: {
        type: String,
    },
    salary: {
        type: Number,
    },
    month: {
        type: Date,
    },
    type: {
        type: String
    }
})

module.exports = mongoose.model("Salary", SalarySchema)
const Employee = require('../models/employee')
const Salary = require('../models/salary')

exports.getEmployees = async(req, res, next) => {
    try{
        const employees = await Employee.find()
        res.json({
            employees
        })
    } catch(err) {
        console.log(err)
    }
}

exports.addEmployee = async(req, res, next) => {
    try {
        const employee = await Employee.create({
            date: req.body.date,
            name: req.body.name,
            desg: req.body.desg,
        })
        res.json({
            message: 'Employee Added'
        })
    } catch(err) {
        console.log(err)
    }
}

exports.editEmployee = async(req, res, next) => {
    try {
        await Employee.findByIdAndUpdate(req.body.id, {
            date: req.body.date,
            name: req.body.name,
            desg: req.body.desg,
            attendance: req.body.attendance
        })
        res.json({
            message: 'Employee Edited'
        })
    } catch(err) {
        console.log(err)
    }
}

exports.delEmployee = async(req, res, next) => {
    try {
        await Employee.findByIdAndDelete(req.body.id)
        res.json({
            message: 'Employee deleted'
        })
    } catch(err) {
        console.log(err)
    }
}


exports.getSalaries = async(req, res, next) => {
    try {
        let salaries = await Salary.find().populate('employee', 'name -_id')
        res.json({
            salaries
        })
    } catch(err) {
        console.log(err)
    }
}

exports.addSalary = async(req, res, next) => {
    try {
        await Salary.create({
            date: req.body.date,
            salary: req.body.salary,
            month: req.body.month,
            type: req.body.type,
            employee: req.body.employee
        })
    } catch(err) {
        console.log(err)
    }
}
const Employee = require('../models/employee')
const Salary = require('../models/salary')
const Attendance = require('../models/attendance')
const AttendanceDay = require('../models/attendanceDay')

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

exports.getEmployee = async(req, res, next) => {
    try {
        employee = await Employee.findById(req.params.id)
        res.json({
            employee
        })
    } catch(err){

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

exports.delSalary = async(req, res, next) => {
    try {
        await Salary.findByIdAndDelete(req.body.id)
        res.json({
            message: 'Salary deleted'
        })
    } catch(err) {
        console.log(err)
    }
}

exports.getAttendances = async(req, res, next) => {
    try {
        let attendance = await Attendance.findOne({year_month: req.query.year_month})
        .populate({
            path: 'days', 
            select: { 'employees': {$elemMatch: {empId: req.params.id}}}
        })
        // attendance = attendance.days.filter(a => {
        //     a.employees.filter(e => e.empId.toString() == '5fef20f37677200be4a13d1b')
        // })
        res.json(attendance)
    } catch(err) {
        console.log(err)
    }
}

exports.updateAttendance = async(req, res, next) => {
    try {
        console.log(req.body.id)
        let attendanceDay = await AttendanceDay.findOne({'employees._id':req.body.id})
            .select({ 'employees': {$elemMatch: {_id: req.body.id}}})
        console.log(attendanceDay)
        attendanceDay.employees.forEach((emp) => {
            emp.status = req.body.status
        })
        await attendanceDay.save()
        res.json({
            message: 'Status Updated'
        })
    } catch(err) {
        console.log(err)
    }
}

exports.createOneTimeAttendances = async(req, res, next) => {
    try{
        let attendance = await Attendance.create({
            year_month: '2021-01'
        })
        let employees = await Employee.find().select('_id')
        for(let i=1; i<=31; i++){
            let attendanceDay = await AttendanceDay.create({
                day: i,
            })
            for(let emp of employees){
                let tempObj = {
                    empId: emp,
                }
                attendanceDay.employees.push(tempObj)
            }
            await attendanceDay.save()
            attendance.days.push(attendanceDay)
            await attendance.save()
        }
        console.log("Hello")
        res.json(employees)
        
    } catch(err) {
        console.log(err)
    }
}
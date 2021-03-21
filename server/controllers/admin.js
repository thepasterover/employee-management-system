const moment = require('moment')

const Employee = require('../models/employee')
const Salary = require('../models/salary')
const Attendance = require('../models/attendance')
const AttendanceDay = require('../models/attendanceDay')
const Work = require('../models/work')
const Admin = require('../models/admin')

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
            email: (req.body.name).toLowerCase().replace(" ", "")
        })

        let cm = moment().format('YYYY-MM')
        let attendance = await Attendance.findOne({year_month: cm})
    
        for(let d of attendance.days){
            let attendancedays = await AttendanceDay.findById(d)
            attendancedays.employees.push({
            empId: employee
            })
            await attendancedays.save()
        }

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
            email: req.body.email,
            status: req.body.status
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
        let attendances =  await Attendance.find()
        
        for(let a of attendances){
            for(let day of a.days) {
                let attendancedays = await AttendanceDay.findById(day)
                attendancedays.employees = attendancedays.employees.filter(e => e.empId.toString() != req.body.id.toString())
                await attendancedays.save()
            }
        }

        // for(let w of employee.works){
        //     await Work.findByIdAndDelete(w)
        // }
        
        res.json({
            message: 'Employee deleted'
        })
    } catch(err) {
        console.log(err)
    }
}

exports.getEmployee = async(req, res, next) => {
    try {
        employee = await Employee.findById(req.params.id).populate('salaries')
        res.json({
            employee
        })
    } catch(err){

    }
}


exports.getSalaries = async(req, res, next) => {
    try {
        let salaries = await Salary.find()
        res.json({
            salaries
        })
    } catch(err) {
        console.log(err)
    }
}

exports.addSalary = async(req, res, next) => {
    try {
        const employee = await Employee.findById(req.body.employee)
        const salary = await Salary.create({
            date: req.body.date,
            salary: req.body.salary,
            month: req.body.month,
            type: req.body.type,
            employee: employee,
            employee_name: employee.name
        })
        employee.salaries.push(salary)
        await employee.save()

        res.json({
            message: 'Salary Added'
        })
    } catch(err) {
        console.log(err)
    }
}

exports.delSalary = async(req, res, next) => {
    try {
        await Salary.findByIdAndDelete(req.body.id)
        await Employee.findOneAndUpdate({salaries: {$in: [req.body.id]}}, {$pull: { salaries :{ $in : req.body.id}}})
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
        let flag
        if(attendance){
            for(let a of attendance.days){
                if(a.employees.length < 1){
                    flag = true
                    break
                } 
            }
        }
        if(flag){
            attendance = null
        }
        res.json(attendance)
    } catch(err) {
        console.log(err)
    }
}

exports.updateAttendance = async(req, res, next) => {
    try {
        let attendancedays = await AttendanceDay.findOne({'employees._id':req.body.id})
            .select({ 'employees': {$elemMatch: {_id: req.body.id}}})
        
        attendancedays.employees.forEach((emp) => {
            emp.status = req.body.status
        })
        await attendancedays.save()
        res.json({
            message: 'Status Updated'
        })
    } catch(err) {
        console.log(err)
    }
}

exports.getWorkByDay = async(req, res, next) => {
    try{
        let works = await Work.aggregate([
            { $group : {
                _id : { category: '$category', date: '$date'},
                count: { $sum: '$quantity' },
                },
            },
            { $sort: { _id: 1 }}
        ])
        res.json(works)
    } catch(err) {
        console.log(err)
    }
}

exports.getAllWorks = async(req, res, next) => {
    try {
        let works = await Work.find()
        res.json({
            works
        })
    } catch(err) {
        console.log(err)
    }
}

exports.getWorksById = async(req, res, next) => {
    try {
        let works = await Work.find({employee: req.params.id}) //Employee.findById(req.params.id).populate('works').select('name works -_id')
        res.json({
            works
        })
    } catch(err) {
        console.log(err)
    }
}

exports.addWork = async(req, res, next) => {
    try {
        let work = await Work.create({
            date: req.body.date,
            quantity: req.body.quantity,
            price: req.body.price,
            category: req.body.category,
            employee: req.body.employee,
        })
        // await Employee.findByIdAndUpdate(
        //     req.body.employee, {$push: {works: work}}
        // )
        
        res.json({
            message: 'Work Added'
        })
    } catch(err) {
        console.log(err)
    }
}


exports.delWork = async(req, res, next) => {
    try {

        await Work.findByIdAndDelete(req.body.id)
        
        res.json({
            message: 'Work deleted'
        })
    } catch(err) {
        console.log(err)
    }
}

exports.addCategory = async(req, res, next) => {
    try {
        await Admin.findByIdAndUpdate(req.id, {
            $push: {categories: req.body.category}
        })
        res.json({
            message: "Category Added"
        })
    } catch(err) {
        console.log(err)
    }
}

exports.delCategory = async (req, res, next) => {
    try {
        await Admin.findByIdAndUpdate(req.id, {
            $pull: {categories: req.body.category}
        })
        res.json({
            message: "Category Deleted"
        })
    } catch(err) {
        console.log(err)
    }
}






///////////////////////////////////////////////////

exports.createOneTimeAttendances = async(req, res, next) => {
    try{
        let attendance = await Attendance.create({
            year_month: '2021-03'
        })
        let employees = await Employee.find().select('_id')
        for(let i=1; i<=31; i++){
            let attendancedays = await AttendanceDay.create({
                day: i,
            })
            for(let emp of employees){
                let tempObj = {
                    empId: emp,
                }
                attendancedays.employees.push(tempObj)
            }
            await attendancedays.save()
            attendance.days.push(attendancedays)
            await attendance.save()
        }
        console.log("Hello")
        res.json(attendance)
        
    } catch(err) {
        console.log(err)
    }
}

exports.getDates = async(req, res, next) => {
    try{
        let employee = await Employee.findById('6009c16f4be2090818142ee3')
        for(let w of employee.works){
            await Work.findByIdAndDelete(w)
        }
        
        res.json({
            employee
        })
    } catch(err) {
        console.log(err)
    }   
}

// let days = moment(cm, 'YYYY-MM').daysInMonth()
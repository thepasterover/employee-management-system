const moment = require('moment')

const Employee = require('../models/employee')
const Salary = require('../models/salary')
const Attendance = require('../models/attendance')
const AttendanceDay = require('../models/attendanceDay')
const Work = require('../models/work')

exports.getSalaries = async(req, res, next) => {
    try {
        let salaries = await Salary.find({employee: req.id})
        res.json({
            salaries
        })
    } catch(err) {
        console.log(err)
    }
}


exports.getCardsData = async(req, res, next) => {
    try {
        let currentMonthSalary = 0
        let currentMonthAdvance = 0
        let lastMonthSalary = 0
        let lastMonthAdvance = 0
        let salaryGrowth = 0
        let advanceGrowth = 0

        let currentMonthWork = 0
        let lastMonthWork = 0
        let workGrowth = 0

        let presentDays = 0

        let month = moment().format('M')
        let salaries = await Salary.find({
            $and:[
                { "$expr": { "$eq": [{ "$month": "$month" }, parseInt(month)]}},
                { "$expr": { "$eq": ['$employee', req.id]}}
            ]
        })
        let lastMonthSalaries = await Salary.find({
            $and:[
                { "$expr": { "$eq": [{ "$month": "$month" }, parseInt(month)-1]}},
                { "$expr": { "$eq": ['$employee', req.id]}},
            ]
        })

        for(let salary of salaries){
            if(salary.type.toLowerCase() == 'salary'){
                currentMonthSalary += salary.salary
            } else {
                currentMonthAdvance += salary.salary
            }
        }

        for(let salary of lastMonthSalaries){
            if(salary.type.toLowerCase() == 'salary'){
                lastMonthSalary += salary.salary
            } else {
                lastMonthAdvance += salary.salary
            }
        }

        salaryGrowth = currentMonthSalary - lastMonthSalary
        advanceGrowth = currentMonthAdvance - lastMonthAdvance

        // Work Sort

        let works = await Work.aggregate([
            {$group: {
                _id: { month: {$month: '$date'} },
                total: { $sum : { $multiply: [ '$price', '$quantity' ] } }
            }},
            {$sort: { month: -1}}
        ])
        for(let w of works){
            if(w._id.month == parseInt(month)){
                currentMonthWork = w.total
            } else if(w._id.month == parseInt(month) - 1){
                lastMonthWork = w.total
            }
        }
        workGrowth = currentMonthWork - lastMonthWork

        // Attendance Sort

        let formattedMonth = moment().format('YYYY-MM')
        let attendance = await Attendance.findOne({
            year_month: formattedMonth
        }).populate('days')
        if(attendance){
            for(let d of attendance.days){
                for (let e of d.employees){
                    if(e.empId.toString() === req.id.toString() && e.status.toLowerCase() === 'present'){
                        presentDays += 1
                    }
                }
            }
        }

        res.json({
            currentMonthSalary,
            currentMonthAdvance,
            salaryGrowth,
            advanceGrowth,
            currentMonthWork,
            workGrowth,
            presentDays
        })
    } catch(err) {
        console.log(err)
    }
}


exports.getWorkChart = async() => {
    try {
        let works = await Work.find({employee: req.id})
        res.json(
            works
        )
    } catch(err) {
        console.log(err)
    }
}
const Employee = require('../models/employee')
const Salary = require('../models/salary')
const Attendance = require('../models/attendance')
const AttendanceDay = require('../models/attendanceDay')
const Work = require('../models/work')

exports.getSalaries = async(req, res, next) => {
    try {
        let salaries = await Salary.find({employee: '604e4745bd66670f08b48848'})
        res.json({
            salaries
        })
    } catch(err) {
        console.log(err)
    }
}

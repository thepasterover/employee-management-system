const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')
const auth = require('../middlewares/admin')

router.get('/employees', adminController.getEmployees)

router.get('/employees/:id', adminController.getEmployee)

router.post('/employees/add', adminController.addEmployee)

router.post('/employees/edit', adminController.editEmployee)

router.post('/employees/delete', adminController.delEmployee)

router.get('/salary', adminController.getSalaries)

router.post('/salary/add', adminController.addSalary)

router.post('/salary/delete', adminController.delSalary)

router.get('/salary/:employee/:month', adminController.getSalaryByMonth)

router.post('/attendance/update', adminController.updateAttendance)

// router.get('/attendance/temp', adminController.createOneTimeAttendances)

router.get('/attendance/:id', adminController.getAttendances)


router.post('/work/add', adminController.addWork)

router.post('/work/delete', adminController.delWork)

router.get('/work/:id', adminController.getWorks)

router.get('/test', adminController.getDates)

module.exports = router

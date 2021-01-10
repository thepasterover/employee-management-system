const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

router.get('/employees', adminController.getEmployees)

router.get('/employees/:id', adminController.getEmployee)

router.post('/employees/add', adminController.addEmployee)

router.post('/employees/edit', adminController.editEmployee)

router.post('/employees/delete', adminController.delEmployee)

router.get('/salary', adminController.getSalaries)

router.post('/salary/add', adminController.addSalary)

router.post('/salary/delete', adminController.delSalary)

router.post('/attendance/update', adminController.updateAttendance)

router.get('/attendance/:id', adminController.getAttendances)

// router.get('/attendance/temp', adminController.createOneTimeAttendances)

module.exports = router

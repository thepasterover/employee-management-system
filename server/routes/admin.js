const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

router.get('/employees', adminController.getEmployees)

router.post('/employees/add', adminController.addEmployee)

router.post('/employees/edit', adminController.editEmployee)

router.post('/employees/delete', adminController.delEmployee)

router.get('/salary', adminController.getSalaries)

router.post('/salary/add', adminController.addSalary)

module.exports = router

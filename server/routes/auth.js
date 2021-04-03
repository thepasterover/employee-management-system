const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')

const isAdmin = require('../middlewares/admin')
const isEmployee = require('../middlewares/employee')

router.post('/admin', authController.adminLogin)

router.get('/admin/me', isAdmin, authController.adminMe)

router.post('/employee', authController.employeeLogin)

router.get('/employee/me', isEmployee, authController.employeeMe)

module.exports = router
const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

router.get('/employees', adminController.getEmployees)

router.post('/employees/add', adminController.addEmployee)

module.exports = router

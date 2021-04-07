const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employee')


router.get('/salary', employeeController.getSalaries)

router.get('/category', employeeController.getCategories)

router.get('/home/cards', employeeController.getCardsData)

router.get('/home/chart', employeeController.getWorkChart)

router.get('/home/attendance', employeeController.getAttendance)

module.exports = router
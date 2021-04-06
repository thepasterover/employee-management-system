const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employee')


router.get('/salary', employeeController.getSalaries)

router.get('/home/cards', employeeController.getCardsData)

module.exports = router
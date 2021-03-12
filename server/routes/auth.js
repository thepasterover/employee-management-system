const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.post('/admin', authController.adminLogin)

router.get('/admin/me', authController.adminMe)


module.exports = router
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const isAdmin = require('../middlewares/admin')

router.post('/admin', authController.adminLogin)

router.get('/admin/me',isAdmin ,authController.adminMe)


module.exports = router
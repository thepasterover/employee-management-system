const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const CustomError = require('../error')

const Admin = require('../models/admin')
const Employee = require('../models/employee')
const Work = require('../models/work')


exports.adminLogin = async(req, res, next) => {
    try{
        let email = req.body.email
        let password = req.body.password
        
        let user = await Admin.findOne({email: email})
        if(!user){
            throw new CustomError("User not found! Check your credentials", 401)
        }
        let match = await bcrypt.compare(password, user.password)
        let token
        if(match){
            token = jwt.sign({ data: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })
        } else {
            throw new CustomError("Incorrect Password", 401)
        }
        res.json(
            token
        )
    } catch(err) {
        next(err)
    }
}


exports.adminMe = async(req, res, next) => {
    try{
        let user = await Admin.findById(req.id)
        res.json({user: user})
    } catch(err){
        console.log(err)
    }
}

exports.employeeLogin = async(req, res, next) => {
    try {
        let email = req.body.email
        let password = req.body.password
        let user = await Employee.findOne({email: email}).orFail(
            new CustomError("User not found! Check your credentials", 401)
        )

        let match = await bcrypt.compare(password, user.password)
        let token
        if(match){
            token = jwt.sign({ data: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })
        } else {
            throw new CustomError("Incorrect Password", 401)
        }

        res.json(
            token
        )
    } catch(err) {
        next(err)
    }
}

exports.employeeMe = async(req, res, next) => {
    try {
        let employee = await Employee.findById(req.id).populate('salaries').orFail(
            new CustomError('Employee not found', 404)
        )
        let user = {
            employee: employee,
        }
        res.json({user: user})
    } catch(err) {
        next(err)
    }
}

exports.changePasswordEmployee = async(req, res, next) => {
    try {
        if(req.body.token){
            let newPass = req.body.password
            let confirmPass = req.body.confPassword
			let id = null
            try {
				let decodedToken = await jwt.verify(
					req.body.token,
					process.env.JWT_SECRET
				)
				id = decodedToken.data
			} catch (err) {
				throw new CustomError('Not Authorized', 403)
			}
            if (newPass != confirmPass) {
				throw new CustomError("Password doesn't match", 400)
			}
            
            let hash = bcrypt.hashSync(req.body.password, 10)
            await Employee.findByIdAndUpdate(id, {
                password: hash
            }).orFail( new CustomError('Employee not found', 404) )
            res.json({
                message: 'Password reset successfully! You will be redirected to homepage soon',
                flag: true
            })
        } else {
			throw new CustomError('Token not found', 403)
		}
    } catch(err) {
        next(err)
    }
}

exports.changePasswordAdmin = async(req, res, next) => {
    try {
        if(req.body.token) {
            let newPass = req.body.password
            let confirmPass = req.body.confPassword
            let id = null
            try {
				let decodedToken = await jwt.verify(
					req.body.token,
					process.env.JWT_SECRET
				)
				id = decodedToken.data
			} catch (err) {
				throw new CustomError('Token Expired or Not Authorized', 403)
			}
            if (newPass != confirmPass) {
				throw new CustomError("Password doesn't match", 400)
			}
            let hash = bcrypt.hashSync(req.body.password, 10)
            await Admin.findByIdAndUpdate(id, {
                password: hash
            }).orFail('Admin not found!', 404)
            res.json({
                message: 'Password reset successfully! You will be redirected to homepage soon',
                flag: true
            })
        } else {
            throw new CustomError('Token not found', 403)
        }
    } catch(err) {
        next(err)
    }
}
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const CustomError = require('../error')

const Admin = require('../models/admin')

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


const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Admin = require('../models/admin')

exports.adminLogin = async(req, res, next) => {
    try{
        let email = req.body.email
        let password = req.body.password
        
        let user = await Admin.findOne({email: email})
        // let match = await bcrypt.compare(password, user.password)
        let token
        //if(match){
            token = jwt.sign({ data: user._id }, process.env.JWT_SECRET)
        //}
        res.json(
            token
        )
    } catch(err) {
        console.log(err)
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


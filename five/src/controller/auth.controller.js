const jwt = require(`jsonwebtoken`)
const userModel = require(`../model/user.model`)

async function registerUser(req,res) {
    const {username , email , password} = req.body

    const isUserAlreadyExist = await userModel.findOne({
        email
    })

    if (isUserAlreadyExist){
        return res.status(401).json({
            message: "User Already Exist"
        })
    }

    const user = await userModel.create({
        username , email , password
    })

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User Created Successfully",
        user,
        token
    })
}

async function getUser(req,res) {
    const users = req.body
    const result = await userModel.find({
        users
    })
    res.status(200).json({
        message: "Data Fetced Successfully",
        result
    })
}

module.exports = {registerUser, getUser}
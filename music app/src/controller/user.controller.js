const jwt = require(`jsonwebtoken`)
const bcrypt = require(`bcrypt`)
const userModel = require("../model/user.model")

async function registerUser(req,res) {
    const {username , email , password , role = "user" } = req.body
    
    const isUserAlreedyExist = await userModel.findOne({
    $or:[
        {username}, 
        {email}    
    ]
    })
    
    if(isUserAlreedyExist){
        return res.status(409).json({
            message:"This username or email already exist in database"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User Registered Successfully",
        user
    })
}

async function loginUser(req,res) {
    const {username , email , password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(401).json({
            message:"Invalid Username or Email"
        })
    }

    const isPasswordValid = bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Password is Invalid"
        })
    }

const token = jwt.sign({
        id: user._id,
        role: user.role 
    },process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message:"User LoggedIn Successfully",
        user
    })
}

async function logoutUser(req,res) {
    res.clearCookie(`token`)
    res.status(200).json({
        message:"User Logged out Successfully"
    })
}



module.exports = {registerUser, loginUser , logoutUser}
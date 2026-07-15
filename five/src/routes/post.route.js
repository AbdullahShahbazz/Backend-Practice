const express = require("express");
const router = express.Router();
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

router.post("/create", async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne({
            _id: decoded._id
        })
        console.log(user);
    }

    catch(err){
        return res.status(401).json({
            message:"Token is invalid"
        })
    }
    res.send("Post Created Successfully")
});

module.exports = router;
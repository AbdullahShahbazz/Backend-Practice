const authController = require(`../controller/auth.controller`)

const express = require(`express`)
const router = express.Router()

router.post("/register", authController.registerUser)
router.get("/get-user", authController.getUser)

module.exports = router
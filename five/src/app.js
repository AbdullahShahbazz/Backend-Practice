const express = require(`express`)
const app = express()

const cookieParser = require(`cookie-parser`)

app.use(cookieParser())

const authRoute = require(`./routes/auth.route`)
const postRoute = require(`./routes/post.route`)

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/auth", postRoute)


module.exports = app
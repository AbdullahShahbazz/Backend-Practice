const express = require(`express`)
const authRoutes = require(`./routes/user.route`)
const authMusic = require(`../src/routes/music.route`)
const cookieParser = require(`cookie-parser`)


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/music', authMusic)

module.exports = app

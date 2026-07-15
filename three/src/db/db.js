const mongoose = require(`mongoose`)

async function connectDB() {

    await mongoose.connect("mongodb+srv://backend:QmBhzdNFy8Ohci7G@backend-test-cluster.6ddssoa.mongodb.net/halley")

    console.log("Connected to DB")
}

module.exports = connectDB



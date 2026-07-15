const express = require(`express`)
const postModel = require(`./model/post.model`)
const multer = require(`multer`)
const uploadFile = require(`./services/storage.service`)

const app = express()

const upload = multer({storage:multer.memoryStorage()})


app.use(express.json())


app.post('/create-post', upload.single("image"), async (req,res) => {
    console.log(req.body);
    console.log(req.file);

    const result = await uploadFile(req.file.buffer)

    const posts = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })
    
    res.status(201).json({
        message:"Post Created successfully",
        posts
    })

})

app.get("/posts",async (req,res) => {
    const posts = await postModel.find()

    return res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
}
)

module.exports = app
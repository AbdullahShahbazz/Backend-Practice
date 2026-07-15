const express = require(`express`)
const noteModel = require(`../models/note.model`)

const app = express()
app.use(express.json()) // middleware

app.post("/notes", async (req, res) => {
  const data = req.body
  await noteModel.create({
    title: data.title,
    description: data.description
  })

  res.status(201).json({
    message: "Note Created successfully"
  })
})

app.get("/notes", async (req, res) => {

  const notes = await noteModel.find() // find return array

  // const notes = await noteModel.find({
  //   title: "test title"
  // })

  // const notes = await noteModel.findOne({
  //   title:"test title",

  // })


  res.status(200).json({
    message: "Notes fetched successfully",
    notes: notes
  })
})


app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id
  await noteModel.findOneAndDelete({
    _id: id
  })
  res.status(200).json({
    message: "Note deleted successfully"
  })
})

app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id
  const description = req.body.description

  await noteModel.findOneAndUpdate({ _id: id }, { description: description })

  res.status(200).json({
    message: "Note updated successfully"
  })
})



module.exports = app
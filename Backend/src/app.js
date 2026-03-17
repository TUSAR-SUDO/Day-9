const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors")
const path = require("path")

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static("./public"))

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;

    // Save the created note in a variable
    const note = await noteModel.create({
        title,
        description
    });

    res.status(201).json({
        message: "Note created successfully",
        note: note   // or just note
    });
});

app.get('/api/notes',async (req,res)=>{
    const notes= await noteModel.find()

    res.status(200).json({
        message:"Notes fetched Successfully",
        notes
    })
})

app.delete('/api/notes/:id',async (req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"Notes deleted successfully"
    })
})
app.patch('/api/notes/:id',async (req,res)=>{
    const id = req.params.id
    const {description}=req.body

    await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"Updated Successfully"
    })

})

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})
module.exports = app;
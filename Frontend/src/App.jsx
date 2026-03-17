import { useState, useEffect } from 'react'
import axios from "axios"

function App() {

  const [notes, setnotes] = useState([])

  function fetchNotes(){
    axios.get("https://day-9-fh77.onrender.com/api/notes")
      .then((res) => {
        setnotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e){
    e.preventDefault()

    const {title , description}= e.target.elements
    console.log(title.value,description.value)

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then(res=>{
      console.log(res.data)

      fetchNotes()
    })
  
  }

  function handleDeleteNote(noteId){
    axios.delete("https://day-9-fh77.onrender.com/api/notes/"+noteId)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
    
  }

  return (
    <>
    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='enter title'/>
      <input name='description' type="text" placeholder='Enter Descrpition'/>
      <button>Create Note</button>
    </form>


      <div className='notes'>
        {
          notes.map((note) => {
            return (
              <div className='note' key={note._id}>
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                <button onClick={()=>{
                  handleDeleteNote(note._id)
                }} >Delete</button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
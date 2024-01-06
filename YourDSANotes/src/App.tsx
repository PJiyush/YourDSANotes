import { useEffect, useState } from 'react';
import './App.css'

import AddNoteWrapper from './components/AddNoteWrapper'
import RowWrapper from './components/RowWrapper'
import {NotesProvider} from './context'

interface dataObject {
  id: number,
  titleLink: string,
  codeSnippet: string,
  approch: string,
  rating: number,

}

function App() {
  // localStorage.setItem('dsaNotes', JSON.stringify([]))
  const [notes, setNotes] = useState<dataObject[]>([]);
  const addNote = (note:dataObject)=>{
    setNotes((oldNotes)=>{
      return [...oldNotes, {...note, id: Date.now()}]
    })
  }
  useEffect(()=>{
    console.log("useEffect is called");
    console.log(localStorage.getItem('dsaNotes'));
    const notesList:dataObject[] = JSON.parse(localStorage.getItem('dsaNotes')!) || [];
    console.log("notesList is",notesList);
    setNotes((oldNotes)=>{
      return [...oldNotes, ...notesList]})
    console.log('set notes are working or not',notes);
    
  },[])

  useEffect(()=>{
    console.log("another useEffect is called");
    console.log(notes);
    localStorage.setItem('dsaNotes', JSON.stringify(notes))
    console.log("after setting value",localStorage.getItem('dsaNotes'));
  },[notes])

  return (
    <NotesProvider value={{notes, addNote}}>
    <div className=' bg-primaryCol  h-lvh ' >
      <div className='bg-transparent text-8xl text-slate-200 ml-4' >
        Your DSA
        <div>Notes <span className='text-rose-600' >; </span> </div>
      </div>
      <div className="sections bg-transparent  flex justify-center">
      <div className=' mr-4 mt-40' >
        <AddNoteWrapper  />
      </div>
      <RowWrapper/>
      </div>
    </div>
    </NotesProvider>
  )
}

export default App

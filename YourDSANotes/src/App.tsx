import { useEffect, useState } from 'react';
import './App.css'

import AddNoteWrapper from './components/AddNoteWrapper'
import RowWrapper from './components/RowWrapper'
import { NotesProvider } from './context'
import { FiltersProvider } from './context/';
import FilterBtns from './components/FilterBtns';

interface dataObject {
  id: number,
  titleLink: string,
  codeSnippet: string,
  approch: string,
  rating: number,

}

function App() {
  const [notes, setNotes] = useState<dataObject[]>([]);
  const [filt, setFilt] = useState<string>('All');
  const addNote = (note: dataObject) => {
    setNotes((oldNotes) => {
      return [...oldNotes, { ...note, id: Date.now() }]
    })
  }
  const updateNote = (id: number, newNote: dataObject) => {
    setNotes((oldNotes) => {
      return oldNotes.map((note) => {
        if (note.id === id) return newNote;
        else return note;
      })
    })
  }
  const deleteNote = (id: number) => {
    setNotes((oldNotes) => {
      return oldNotes.filter((note) => {
        return note.id !== id;
      })
    })
  }
  
  useEffect(() => {
    const notesList: dataObject[] = JSON.parse(localStorage.getItem('dsaNotes')!) || [];
    setNotes((oldNotes) => {
      return [...oldNotes, ...notesList]
    })
    
  }, [])

  useEffect(() => {
    localStorage.setItem('dsaNotes', JSON.stringify(notes))
  }, [notes])

  return (
    <NotesProvider value={{ notes, addNote, updateNote, deleteNote }}>
      <FiltersProvider value={{filt, setFilt}}>
      <div className=' bg-primaryCol  h-lvh ' >
        <div className='bg-transparent text-8xl text-slate-200 ml-4' >
          Your DSA
          <div>Notes <span className='text-rose-600' >; </span> </div>
        </div>
        <div className="sections bg-transparent  flex justify-center">
          <div className=' mr-4 mt-40' >
            <AddNoteWrapper />
          </div>
          <RowWrapper />
          <div className='mt-40 ml-4' >
            <FilterBtns />
            </div>
        </div>
      </div>
      </FiltersProvider>
    </NotesProvider>
  )
}

export default App

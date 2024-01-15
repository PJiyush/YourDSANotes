import { useEffect, useState } from 'react';
import './App.css'

import AddNoteWrapper from './components/AddNoteWrapper'
import RowWrapper from './components/RowWrapper'
import { NotesProvider } from './context'
import { FiltersProvider } from './context/';
import FilterBtns from './components/FilterBtns';
import { MakeItUnique } from './helpers/MakeItUnique';

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

  const [filt, setFilt] = useState<string>('All');


  // useEffect(() => {
  //   console.log("useEffect is called");
  //   console.log(localStorage.getItem('dsaNotes'));
  //   const notesList: dataObject[] = JSON.parse(localStorage.getItem('dsaNotes')!) || [];
  //   console.log("notesList is", notesList);
  //   setNotes((oldNotes) => {
  //     return [...oldNotes, ...notesList]
  //   })
  //   // setNotes(notesList)
  //   console.log('set notes are working or not', notes);

  // },[])

  // useEffect(() => {
  //   console.log("another useEffect is called");
  //   console.log(notes);
  //   console.log("printing unique notes", MakeItUnique(notes));
  //   if(notes.length>0) setNotes(MakeItUnique(notes));
  //   localStorage.setItem('dsaNotes', JSON.stringify(notes))
  //   console.log("after setting value", localStorage.getItem('dsaNotes'));
  // }, [notes.length])

  // useEffect(()=>{

  // },[notes])

  // this would run only first time
  useEffect(() => {
    console.log("local storage is ", localStorage.getItem('dsaNotes'));
    const storedValue = localStorage.getItem('dsaNotes');
    try {
      const notesList: dataObject[] = JSON.parse(storedValue!) || [];
      console.log("notesList is", notesList);
  
      setNotes((oldNotes) => [...oldNotes, ...notesList]);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, []);
  
  // this would run everytime notes array changes
  useEffect(()=>{
    console.log("I am going to run everytime notes array changes");
    console.log("notes array is", notes);
    localStorage.setItem('dsaNotes', JSON.stringify(MakeItUnique(notes)))
  },[notes])

  return (
    <NotesProvider value={{ notes, addNote, updateNote, deleteNote }}>
      <FiltersProvider value={{ filt, setFilt }}>
        <div className=' bg-primaryCol  h-lvh z-10 relative' >
        <div className='bg-emerald-700/60 h-96 w-96 blur-[320px] z-0 absolute top-[-250px] left-[56px]' ></div>
        <div className='bg-emerald-700/60 h-96 w-96 blur-[320px] z-0 absolute top-[180px] left-[1040px]' ></div>
        <div className='bg-emerald-700/60 h-80 w-80 blur-[400px] z-0 absolute top-[290px] left-[140px]' ></div>
          <div className='bg-transparent text-8xl text-slate-200 ml-4 z-20' >
            Your DSA
            <div>Notes <span className='text-emerald-600' >; </span> </div>
          </div>
          <div className="sections bg-transparent  flex justify-center z-40 relative">
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

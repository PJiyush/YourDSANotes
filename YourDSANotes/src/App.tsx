import { useEffect } from 'react';
import './App.css'

import AddNoteWrapper from './components/AddNoteWrapper'
import RowWrapper from './components/RowWrapper'

function App() {
  // localStorage.setItem('dsaNotes', JSON.stringify([]))
  let notesList = JSON.parse(localStorage.getItem('dsaNotes')!) || [];
  return (
    // <div className=' bg-gradient-to-b from-slate-900 to-slate-800 h-lvh' >
    <div className=' bg-primaryCol  h-lvh ' >
      <div className='bg-transparent text-8xl text-slate-200 ml-4' >
        Your DSA
        <div>Notes <span className='text-rose-600' >; </span> </div>
      </div>
      <div className="sections bg-transparent  flex justify-center">
      <div className=' mr-4 mt-40' >
        <AddNoteWrapper  />
      </div>
      <RowWrapper notesList={notesList} />
      </div>
    </div>
  )
}

export default App

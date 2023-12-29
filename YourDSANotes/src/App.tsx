import './App.css'
import { ScrollArea } from './components/ScrollableDiv'
import Row from './components/Row'
import AddNoteWrapper from './components/AddNoteWrapper'

function App() {
  return (
    // <div className=' bg-gradient-to-b from-slate-900 to-slate-800 h-lvh' >
    <div className=' bg-primaryCol  h-lvh ' >
      <div className='bg-transparent text-8xl text-slate-200 ml-4' >
        Your DSA
        <div>Notes <span className='text-rose-600' >; </span> </div>
      </div>
      <div className="sections bg-transparent  flex justify-center">
      <div className=' mr-4 mt-40' >
        <AddNoteWrapper/>
      </div>
      <ScrollArea className="h-[400px] w-4/6 rounded-md border p-4 mt-32 shadow-2xl bg-primaryCol border-transparent  ">
        <Row ratingId={1} titleLink='https://leetcode.com/problems/median-of-two-sorted-arrays/description/'/>
        <Row ratingId={1} titleLink='https://www.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1?page=1&sortBy=submissions'/>
        <Row ratingId={1} titleLink='https://www.codingninjas.com/studio/problems/set-matrix-zeros_3846774?topList=striver-sde-sheet-problems&problemListRedirection=true'/>
        <Row ratingId={1} titleLink='https://leetcode.com/problems/median-of-two-sorted-arrays/description/'/>
        <Row ratingId={1} titleLink='https://www.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1?page=1&sortBy=submissions'/>
        <Row ratingId={1} titleLink='https://www.codingninjas.com/studio/problems/set-matrix-zeros_3846774?topList=striver-sde-sheet-problems&problemListRedirection=true'/>
      </ScrollArea>
      </div>
    </div>
  )
}

export default App

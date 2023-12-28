import './App.css'
import { ScrollArea } from './components/ScrollableDiv'
import Row from './components/Row'
function App() {
  return (
    <div className=' bg-gradient-to-b from-rose-100 to-rose-300 ' >
      <div className="sections bg-transparent h-lvh flex justify-center">
      <ScrollArea className="h-[400px] w-4/5 rounded-md border p-4 mt-56 shadow-2xl bg-gradient-to-b from-rose-200 to-rose-300 border-rose-400 ">
        <Row ratingId={1} titleLink='https://leetcode.com/problems/median-of-two-sorted-arrays/description/'/>
        <Row ratingId={1} titleLink='https://www.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1?page=1&sortBy=submissions'/>
        <Row ratingId={1} titleLink='https://www.codingninjas.com/studio/problems/set-matrix-zeros_3846774?topList=striver-sde-sheet-problems&problemListRedirection=true'/>
      </ScrollArea>
      </div>
    </div>
  )
}

export default App

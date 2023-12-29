import React from "react"
import { ScrollArea } from './ScrollableDiv'
import Row from './Row'

interface dataObject {
    titleLink: string,
    codeSnippet: string,
    approch: string,
    rating: number,
}

interface RowWrapperProps {
    data: dataObject[],
}

const RowWrapper:React.FC<RowWrapperProps> = (props)=>{
    const {notesList} = props;
    console.log("talking about this na",notesList);
    return(
        <ScrollArea className="h-[400px] w-4/6 rounded-md border p-4 mt-32 shadow-2xl bg-primaryCol border-transparent  ">
            {/* <Row ratingId={1} titleLink='https://leetcode.com/problems/median-of-two-sorted-arrays/description/'/>
            <Row ratingId={1} titleLink='https://www.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1?page=1&sortBy=submissions'/>
            <Row ratingId={1} titleLink='https://www.codingninjas.com/studio/problems/set-matrix-zeros_3846774?topList=striver-sde-sheet-problems&problemListRedirection=true'/>
            <Row ratingId={1} titleLink='https://leetcode.com/problems/median-of-two-sorted-arrays/description/'/>
            <Row ratingId={1} titleLink='https://www.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1?page=1&sortBy=submissions'/>
            <Row ratingId={1} titleLink='https://www.codingninjas.com/studio/problems/set-matrix-zeros_3846774?topList=striver-sde-sheet-problems&problemListRedirection=true'/> */}
            {notesList.map((note: dataObject)=>{
                return(
                    <Row ratingId={note.rating} titleLink={note.titleLink}/>
                )
            })}
        </ScrollArea>
    )
}

export default RowWrapper
import React, { useContext } from "react"
import { ScrollArea } from './ScrollableDiv'
import Row from './Row'
import { NotesContext } from "@/context"
import { FiltersContext } from "@/context/FiltersContext"

interface dataObject {
    id: number,
    titleLink: string,
    codeSnippet: string,
    approch: string,
    rating: number,
}

const RowWrapper:React.FC = ()=>{
    const {notes} = React.useContext(NotesContext)!;
    const {filt} = useContext(FiltersContext)!;
    return(
        <ScrollArea className="h-[400px] w-4/6 rounded-md border p-4 mt-32 shadow-2xl bg-primaryCol/70 border-transparent  ">
            {filt === 'All'? notes.map((note: dataObject)=>{
                return(
                    <Row id={note.id} ratingId={note.rating} titleLink={note.titleLink} key={note.id}/>
                )
            }):notes.map((note: dataObject)=>{
                if(note.rating === parseInt(filt)) return <Row id={note.id} ratingId={note.rating} titleLink={note.titleLink} key={note.id}/>
                else return null;
            })}
        </ScrollArea>
    )
}

export default RowWrapper
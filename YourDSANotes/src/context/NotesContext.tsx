import { useContext } from "react"
import { createContext } from "react"


interface dataObject {
    id: number,
    titleLink: string,
    codeSnippet: string,
    approch: string,
    rating: number,
}

interface dataObjectContext{
    notes:dataObject[],
    addNote:(note:dataObject)=>void
    updateNote:(id:number,note:dataObject)=>void
}

export const NotesContext = createContext<dataObjectContext|null>(null)

export const useNotes = ()=>{
    return useContext(NotesContext)
}

export const NotesProvider = NotesContext.Provider


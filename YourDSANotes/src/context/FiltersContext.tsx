import { useContext } from "react"
import { createContext } from "react"

interface filters{
    filt:string,
    setFilt: (value:string)=>void
}

export const FiltersContext = createContext<filters|null>(null)

export const useFilters = ()=>{
    return useContext(FiltersContext)
}

export const FiltersProvider = FiltersContext.Provider

import { useContext } from "react"
import { createContext } from "react"

interface utils{
    drawerOpen: boolean,
    setDrawerOpen: (value:boolean)=>void
}

export const UtilsContext = createContext<utils|null>(null)

export const useUtils = ()=>{
    return useContext(UtilsContext)
}

export const UtilsProvider = UtilsContext.Provider

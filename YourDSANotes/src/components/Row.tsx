import React, { useContext, useEffect, useState } from "react";
import { Button } from "./Buttons";
import { extractTitle } from "@/helpers/ExtractTitle";
import WrapperDrawer from "./WrapperDrawer";
import { NotesContext, UtilsProvider } from "@/context";
import { MdDelete, MdOpenInNew  } from "react-icons/md";
interface RowProps {
    id: number,
    ratingId: number,
    title?: string,
    titleLink: string,
}

const Row: React.FC<RowProps> = (props) => {
    const {ratingId, titleLink, id } = props;
    const [rating, setRating] = useState<number>(ratingId)
    const [open, setOpen] = useState<boolean>(false)
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
    const {deleteNote} = useContext(NotesContext)!;
    const openClick = ()=>{
        setOpen(true);
    }
    useEffect(()=>{
        if(open){
            setDrawerOpen(true)
        }
        setOpen(false)
    },[open])

    const deleteThisNote = ()=>{
        deleteNote!(id);
    }
    return(
        <UtilsProvider value={{drawerOpen, setDrawerOpen}}>
        <div className=" bg-primaryCol-50  h-16 flex mt-2 rounded-md shadow-md justify-between" >
            <div className="flex gap-20 ml-8">
            <div className="">
                <Button variant={"myButton"}  className="h-8 w-16 text-xl mt-4">
                    {rating}
                </Button>
            </div>
            <div className=" mt-3 ">
                <a href={titleLink} className="text-white text-2xl" target="_blank" rel="noreferrer">
                    {extractTitle(titleLink).length > 30 ? extractTitle(titleLink).slice(0,30) + "..." : extractTitle(titleLink)}
                </a>
            </div>
            </div>
            <div className="mt-4 w-32 flex justify-between  mr-4">
                <Button variant={"myButton"}  className="text-xl" onClick={openClick}>
                <MdOpenInNew />
                </Button>
                {/* <p className="bg-red-200">{id}</p> */}
                <Button variant="secondary" className="text-xl hover:bg-red-500" onClick={deleteThisNote} ><MdDelete /></Button>
                {drawerOpen && <WrapperDrawer id={id}/>}
            </div>
        </div>
        </UtilsProvider>
    )
}

export default Row;
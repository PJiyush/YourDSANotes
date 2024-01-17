import React, { useContext, useState } from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
} from '@/components/expandDrawer';
import { Button } from '@/components/Buttons';
import {NotesContext, UtilsContext} from '@/context'
import { extractTitle } from '@/helpers/ExtractTitle';
import { Textarea } from './TextArea';
import { MdOutlineDone } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";

type YourComponentProps = {
    id:number,
}


const YourComponent = (props:YourComponentProps) => {
    const [edit, setEdit] = useState(false);
    const { drawerOpen, setDrawerOpen }  = React.useContext(UtilsContext)!;
    const {notes, updateNote } = useContext(NotesContext)!;
    const index = notes.findIndex((note)=> note.id === props.id);
    const {id, titleLink, codeSnippet, approch, rating} = notes[index];
    const [codeSnippetState, setCodeSnippetState] = useState(codeSnippet);
    const [approchSnippetState, setApprochSnippetState] = useState(approch);
    const [isCopied, setIsCopied] = useState(false);

    const handleCloseDrawer = () => {
        setDrawerOpen(false)
    };
    const toggleEdit = ()=>{
        setEdit((edit)=>!edit);
    }
    const updateCodeSnippet = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setCodeSnippetState(e.target.value);
        console.log("code snippet is",e.target.value);
    }
    const updateApproachSnippet = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setApprochSnippetState(e.target.value);
        console.log("approach snippet is",e.target.value);
    }
    const handleSave = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        console.log("save button is clicked");
        notes[index].codeSnippet = codeSnippetState;
        notes[index].approch = approchSnippetState;
        updateNote(id,notes[index]);
        console.log('finally ',notes)
        toggleEdit();
        handleCloseDrawer();
    }
    const handleCopy =(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        console.log("copy button is clicked");
        navigator.clipboard.writeText(titleLink);
        navigator.vibrate(200)
        setIsCopied(true);
        setTimeout(()=>{
            setIsCopied(false);
        },2000)
    }
    const updateRating = ()=>{
        if(edit) updateNote(id,{...notes[index], rating: (rating+1)%6})
    }

    return (
        <Drawer open={drawerOpen} onClose={handleCloseDrawer} >
            <DrawerContent className=' bg-zinc-950 text-emerald-600 h-2/3 border-emerald-600 '>
                <DrawerHeader className='flex justify-between gap-9'>
                    <div>
                    <DrawerTitle className='text-2xl'>{extractTitle(titleLink)}</DrawerTitle>
                    <DrawerDescription>
                        {titleLink}
                        <Button variant="secondary" className='hover:bg-emerald-700 hover:text-white delay-75 ml-4 text-sm border border-emerald-700 hover:border-white' onClick={handleCopy}>{isCopied? <MdOutlineDone/>:<FaRegCopy /> }</Button>
                    </DrawerDescription>
                    </div>
                    <div>
                    <Button variant={'myButton'} className='bg-emerald-800/20 w-28 h-14 my-auto text-3xl text-white border-white border' onClick={updateRating}>{rating}</Button>
                    </div>
                </DrawerHeader>
                <div className='flex h-2/3 content-between gap-8 px-3'>
                {edit ? <Textarea value={codeSnippetState} className='h-full bg-emerald-950/80 text-lg text-white'onChange={updateCodeSnippet} /> : <Textarea value={codeSnippet} className='h-full bg-emerald-950/30 text-lg text-emerald-400' />}
                {edit ? <Textarea value={approchSnippetState} className='h-full bg-zinc-800 text-lg text-yellow-100' onChange={updateApproachSnippet} /> : <Textarea value={approch} className='h-full bg-zinc-950 text-lg text-slate-300' />}
                </div>
                <DrawerFooter className='' >
                    <div className="flex justify-between gap-8">
                    {/* <Button variant="outline" onClick={handleCloseDrawer}>
                        Cancel
                    </Button> */}
                    <Button variant="destructive" className='w-1/2 bg-emerald-700 hover:bg-emerald-600 text-lg' onClick={toggleEdit}>
                        {edit ? 'Close edit mode':'Start edit mode'}
                    </Button>
                    <Button variant="destructive" className='w-1/2 bg-emerald-700 hover:bg-emerald-600 text-lg' onClick={handleSave}>
                        Save
                    </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default YourComponent;

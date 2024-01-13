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
    const handleSave = (e: React.ChangeEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        console.log("save button is clicked");
        notes[index].codeSnippet = codeSnippetState;
        notes[index].approch = approchSnippetState;
        updateNote(id,notes[index]);
        console.log('finally ',notes)
        toggleEdit();
        handleCloseDrawer();
    }
    const handleCopy =(e:React.ChangeEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        console.log("copy button is clicked");
        navigator.clipboard.writeText(titleLink);
        navigator.vibrate(200)
        setIsCopied(true);
        setTimeout(()=>{
            setIsCopied(false);
        },2000)
    }
    return (
        <Drawer open={drawerOpen} onClose={handleCloseDrawer}>
            <DrawerContent className=' bg-primaryCol text-rose-600 h-2/3 border-pink-600'>
                <DrawerHeader>
                    <DrawerTitle className='text-2xl'>{extractTitle(titleLink)}</DrawerTitle>
                    <DrawerDescription>
                        {titleLink}
                        <Button variant="secondary" className='' onClick={handleCopy}>{isCopied?'Copied':'copy'}</Button>
                    </DrawerDescription>
                </DrawerHeader>
                <div className='flex h-2/3 content-between gap-8 px-3'>
                {edit ? <Textarea value={codeSnippetState} className='h-full bg-purple-800'onChange={updateCodeSnippet} /> : <Textarea value={codeSnippet} className='h-full bg-pink-300' />}
                {edit ? <Textarea value={approchSnippetState} className='h-full bg-purple-800' onChange={updateApproachSnippet} /> : <Textarea value={approch} className='h-full bg-pink-300' />}
                </div>
                <DrawerFooter >
                    <div className="flex content-between gap-32">
                    <Button variant="outline" onClick={handleCloseDrawer}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={toggleEdit}>
                        Edit
                    </Button>
                    <Button variant="destructive" onClick={handleSave}>
                        Save
                    </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default YourComponent;

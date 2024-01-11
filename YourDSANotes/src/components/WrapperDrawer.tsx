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
    console.log("props is",props);
    // const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [edit, setEdit] = useState(false);
    const { drawerOpen, setDrawerOpen }  = React.useContext(UtilsContext)!;
    console.log("drawerOpen is",drawerOpen);
    
    const {notes, updateNote } = useContext(NotesContext)!;
    const index = notes.findIndex((note)=> note.id === props.id);
    const {id, titleLink, codeSnippet, approch, rating} = notes[index];

    const [codeSnippetState, setCodeSnippetState] = useState(codeSnippet);
    const [approchSnippetState, setApprochSnippetState] = useState(approch);

    const handleCloseDrawer = () => {
        // setIsDrawerOpen(false);
        setDrawerOpen(false)
    };
    const toggleEdit = ()=>{
        setEdit((edit)=>!edit);
    }
    const updateCodeSnippet = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        // i have to do it with the help of state
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
        // i have to update the notes array
        notes[index].codeSnippet = codeSnippetState;
        notes[index].approch = approchSnippetState;
        updateNote(id,notes[index]);
        console.log('finally ',notes)
    }
    return (
        <Drawer open={drawerOpen} onClose={handleCloseDrawer}>
            <DrawerContent className='bg-blue-400 h-2/3'>
                <DrawerHeader>
                    <DrawerTitle>{extractTitle(titleLink)}</DrawerTitle>
                    <DrawerDescription>{titleLink}</DrawerDescription>
                </DrawerHeader>
                <div className='flex h-2/3 content-between gap-8 px-3'>
                <Textarea value={codeSnippetState} className='h-full'onChange={updateCodeSnippet} />
                <Textarea value={approchSnippetState} className='h-full' onChange={updateApproachSnippet} />
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

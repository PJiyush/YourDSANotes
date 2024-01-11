import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/AddNote'

import {Textarea} from '@/components/TextArea'
import { Button } from "./Buttons";
import { useState } from 'react';
import { useNotes } from '../context'

interface dataObject {
    id: number,
    titleLink: string,
    codeSnippet: string,
    approch: string,
    rating: number,

}

const AddNoteWrapper: React.FC = ()=>{
    let data:dataObject = {
        id:0,
        titleLink: '',
        codeSnippet: '',
        approch: '',
        rating: 1,
    }
    // useState hooks
    const [rating, setRating] = useState<number>(1);
    const [titleLink, setTitleLink] = useState<string>('');
    const [codeSnippet, setCodeSnippet] = useState<string>('');
    const [approch, setApproch] = useState<string>('');


    // event handlers
    const handleRatingClick = ()=>{
        setRating((rating)=>{
            if(rating === 5) return 1;
            return rating + 1;
        })
    }
    const handleTitleLinkChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setTitleLink(e.target.value);
        // console.log(titleLink);
    }
    const handleCodeSnippetChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setCodeSnippet(e.target.value);
        // console.log(codeSnippet);
    }
    const handleApprochChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setApproch(e.target.value);
        // console.log(approch);
    }
    const {addNote, notes } = useNotes()!;
    

    const handleSubmit = (e: React.ChangeEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        let flag: boolean = false;
        data = {
            id:Date.now(),
            titleLink: titleLink,
            codeSnippet: codeSnippet,
            approch: approch,
            rating: rating,
        }
        notes.forEach((note)=>{
            if(note.titleLink === data.titleLink){
                console.log('Note already exists');
                alert('Note already exists');
                flag = true;
                return;
            }
        })
        if(!flag) addNote!(data);
        setRating(1);
        setTitleLink('');
        setCodeSnippet('');
        setApproch('');
    }
    const handleDownload = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        const link = document.createElement('a');
        link.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes));
        // link.download = "dsaNotes.json";
        const tempDate = new Date();
        link.download = `dsaNotes-${tempDate.getDate()}-${tempDate.getMonth()+1}-${tempDate.getHours()}-${tempDate.getMinutes()}.json`
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return(
        <Dialog >
            <div className='flex flex-col gap-4' >
                <DialogTrigger className='bg-rose-600 h-16 w-32 text-2xl text-white rounded-md hover:bg-rose-500 shadow-md shadow-gray-950'>Add Note</DialogTrigger>
                <Button className='bg-rose-600 w-36 h-16 text-lg text-white rounded-md hover:bg-rose-500 shadow-md' onClick={handleDownload}>Download Notes</Button>
            </div>
        <DialogContent  className=' bg-primaryCol-50 h-4/6 border-rose-600 border-4 w-4/6'  >
        <DialogHeader>
            <DialogTitle className='text-xl text-slate-200 ' >Add a New Note</DialogTitle>
            <div className='flex flex-row' >
                <Button variant={"myButton"}  className="h-12 mr-4 mt-2 text-xl w-24" onClick={handleRatingClick}>
                    {rating}
                </Button>
                <div className='h-12 mt-2 w-full '>
                    <Textarea className='border-rose-600 resize-none h-full text-slate-200 text-xl' placeholder='paste the question link here (https://.../problems/..)' onChange={handleTitleLinkChange} />
                </div>
            </div>
            <div className='flex ' >
                <div className='h-80 w-3/6 mt-3 '>
                    <Textarea className='resize-none h-full bg-slate-950 text-yellow-200 text-lg  border-rose-600 border-2' spellCheck='false' onChange={handleCodeSnippetChange} />
                </div>
                <div className='h-64 ml-8 mt-3 w-[500px]'>
                    <Textarea className='resize-none h-full text-xl text-slate-200 border-rose-600 border-2' spellCheck='false' onChange={handleApprochChange} />
                    <div className=' justify-evenly '>
                        <Button className="h-12 ml-2 mr-8 mt-2 text-xl w-32 bg-slate-100 text-gray-800">
                            Delete
                        </Button>
                        <Button className="h-12 mr-8 mt-2 text-xl w-32 bg-slate-100 text-gray-800">
                            Share
                        </Button>
                        <Button className="h-12  mt-2 text-xl w-32 bg-rose-600 hover:bg-rose-500" onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </DialogHeader>
        </DialogContent>
    </Dialog>
    )
}

export default AddNoteWrapper;
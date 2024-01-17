import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/AddNote'

import {Textarea} from '@/components/TextArea'
import { Button } from "./Buttons";
import { useContext, useEffect, useState } from 'react';
import { NotesContext, NotesProvider } from '@/context';
import { IoClose } from "react-icons/io5";
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
    const forPlaceHolder = 
    `#include <bits/stdc++.h>
    using namespace std;
    int main(){
        int t;
        cin>>t;
        while(t--){
            int n;
            cin>>n;
            cout<<n<<endl;
            }
    return 0;
    }`


    // useState hooks
    const [rating, setRating] = useState<number>(1);
    const [titleLink, setTitleLink] = useState<string>('');
    const [codeSnippet, setCodeSnippet] = useState<string>('');
    const [approch, setApproch] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isTitleLinkCorrect, setIsTitleLinkCorrect] = useState<boolean>(false);
    useEffect(()=>{
        (titleLink.search('problems/')>0) ? setIsTitleLinkCorrect(true) : setIsTitleLinkCorrect(false);
    },[titleLink])

    // event handlers
    const handleRatingClick = ()=>{
        setRating((rating)=>{
            if(rating === 5) return 1;
            return rating + 1;
        })
    }
    const handleTitleLinkChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setTitleLink(e.target.value);
    }
    const handleCodeSnippetChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setCodeSnippet(e.target.value);
        
    }
    const handleApprochChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setApproch(e.target.value);
    
    }
    const {addNote, notes, deleteNote} = useContext(NotesContext)!
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
        const tempDate = new Date();
        link.download = `dsaNotes-${tempDate.getDate()}-${tempDate.getMonth()+1}-${tempDate.getHours()}-${tempDate.getMinutes()}.json`
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        console.log('Inside Input',e.target.files);
        const file = e.target.files![0];
        const reader = new FileReader();
        hndleAllDelete();
        reader.onload = ()=>{
            const txts = reader.result;
            const tempNotes = JSON.parse(txts as string);
            console.log(tempNotes);
            
            tempNotes.forEach((note:dataObject)=>{
                addNote!(note)
            })
        }
        reader.readAsText(file)
    }

    const hndleAllDelete = ()=>{
        notes.forEach((note)=>{
            deleteNote!(note.id)
        })
    }


    return(
        <Dialog open={isDialogOpen} >
            <div className='flex flex-col gap-4 ' >
                <Button className='bg-emerald-700 h-16 w-36 text-lg text-white rounded-md hover:bg-emerald-500 shadow-md shadow-gray-950' onClick={()=>setIsDialogOpen(!isDialogOpen)}>Add Note</Button>
                <Button className='bg-emerald-700 w-36 h-16 text-lg text-white rounded-md hover:bg-emerald-500 shadow-md shadow-gray-950' onClick={handleDownload}>Download Notes</Button>
                <label htmlFor="inptField" className="relative cursor-pointer ">
                    <div className="bg-emerald-700 text-white h-16 w-36 text-lg px-4 py-4 shadow-md shadow-gray-950 rounded-md">Upload Notes</div>
                    <input type="file" className="hidden" title="input" onChange={handleInput} id="inptField"/> 
                </label>
                <Button className='bg-emerald-700 w-36 h-16 text-lg text-white rounded-md hover:bg-emerald-500 shadow-md shadow-gray-950' onClick={hndleAllDelete}>Delete all</Button>
            </div>
        <DialogContent  className=' bg-zinc-950 h-4/6 border-emerald-600 border-4 w-4/6'  >
        <DialogHeader>
            <div className="flex justify-between">
            <DialogTitle className='text-2xl text-slate-200 ' >Add a New Note</DialogTitle>
            <div className='rounded-[50%] border-[4px] border-zinc-950 delay-75 cursor-pointer hover:border-emerald-700 h-10 w-10 flex align-middle justify-center'>
            <IoClose className='text-emerald-600 mt-1 text-2xl ' onClick={()=>setIsDialogOpen(!isDialogOpen)}/>
            </div>
            </div>
            <div className='flex flex-row' >
                <Button variant={"myButton"}  className="h-12 mr-4 mt-2 text-xl w-24" onClick={handleRatingClick}>
                    {rating}
                </Button>
                <div className='h-12 mt-2 w-full '>
                    <Textarea className='border-emerald-600 resize-none h-full text-slate-200 text-xl' placeholder='paste the question link here (https://.../problems/..)' onChange={handleTitleLinkChange} />
                </div>
            </div>
            <div className='flex ' >
                <div className='h-80 w-3/6 mt-3 '>
                    <Textarea placeholder={forPlaceHolder} className='resize-none h-full bg-emerald-950/30 text-yellow-200 text-lg  border-emerald-600 border-2' spellCheck='false' onChange={handleCodeSnippetChange} />
                </div>
                <div className='h-64 ml-8 mt-3 w-[500px]'>
                    <Textarea placeholder='running a for loop to print all values' className='resize-none h-full text-xl text-slate-200 border-emerald-600 border-2' spellCheck='false' onChange={handleApprochChange} />
                    <div className=' justify-evenly ' onClick={()=>setIsDialogOpen(!isDialogOpen)}>
                        {isTitleLinkCorrect ?<Button className="h-12  mt-2 text-xl w-full bg-emerald-600 hover:bg-emerald-500" onClick={handleSubmit}>
                            Save
                        </Button>:<Button className="h-12  mt-2 text-xl w-full bg-emerald-600 hover:bg-emerald-500" onClick={()=>alert('Please enter a valid link')}>
                            Save
                        </Button>}
                    </div>
                </div>
            </div>
        </DialogHeader>
        </DialogContent>
    </Dialog>
    )
}

export default AddNoteWrapper;
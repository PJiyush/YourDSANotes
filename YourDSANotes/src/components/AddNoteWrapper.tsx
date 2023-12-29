import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/AddNote'

import {Textarea} from '@/components/TextArea'
import { Button } from "./Buttons";

const AddNoteWrapper: React.FC = ()=>{
    return(
        <Dialog >
        <DialogTrigger className='bg-rose-600 h-16 w-32 text-2xl text-white rounded-md hover:bg-rose-500'>Add Note</DialogTrigger>
        <DialogContent  className=' bg-primaryCol-50 h-4/6 border-rose-600 border-4 w-4/6' >
        <DialogHeader>
            <DialogTitle className='text-xl text-slate-200 ' >Add a New Note</DialogTitle>
            <div className='flex flex-row' >
                <Button variant={"myButton"}  className="h-12 mr-4 mt-2 text-xl w-24">
                    2
                </Button>
                <div className='h-12 mt-2 w-full '>
                    <Textarea className='border-rose-600 resize-none h-full text-slate-200 text-xl' placeholder='paste the question link here (https://.../problems/..)' />
                </div>
            </div>
            <div className='flex ' >
                <div className='h-80 w-3/6 mt-3 '>
                    <Textarea className='resize-none h-full bg-slate-950 text-yellow-200 text-lg  border-rose-600 border-2' spellCheck='false' />
                </div>
                <div className='h-64 ml-8 mt-3 w-[500px]'>
                    <Textarea className='resize-none h-full text-xl text-slate-200 border-rose-600 border-2' spellCheck='false' />
                    <div className=' justify-evenly '>
                        <Button className="h-12 ml-2 mr-8 mt-2 text-xl w-32 bg-slate-100 text-gray-800">
                            Delete
                        </Button>
                        <Button className="h-12 mr-8 mt-2 text-xl w-32 bg-slate-100 text-gray-800">
                            Share
                        </Button>
                        <Button className="h-12  mt-2 text-xl w-32 bg-rose-600 hover:bg-rose-500">
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
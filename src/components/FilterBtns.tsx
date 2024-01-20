import React from 'react'
import { Button } from './Buttons'
import { useFilters } from '@/context'

function FilterBtns() {
    const {filt, setFilt} = useFilters()!
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>)=>{
        setFilt(e.currentTarget.innerText);
    }
    return (
        <div className='flex flex-col gap-4 text-white mt-[-10px]'>
            {Array(5).fill(0).map((_,index)=>{
                return(
                    <Button variant="myButton" className='bg-pink-400 w-32 h-12 text-xl' onClick={handleClick} key={index+1} style={parseInt(filt)===(index+1)?{backgroundColor:'#059669'}:{backgroundColor:'#121212'}}>{index+1}</Button>
                )
            })}
            <Button variant="myButton" className='bg-pink-400 w-32 h-12 text-xl' onClick={handleClick} style={parseInt(filt)?{backgroundColor:'#121212'}:{backgroundColor:'#059669'}}>All</Button>
        </div>
    )
}

export default FilterBtns
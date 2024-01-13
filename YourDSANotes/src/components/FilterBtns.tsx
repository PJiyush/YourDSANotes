import React from 'react'
import { Button } from './Buttons'
import { useFilters } from '@/context'

function FilterBtns() {
    const {filt, setFilt} = useFilters()!
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>)=>{
        setFilt(e.currentTarget.innerText);
    }
    return (
        <div className='flex flex-col gap-4'>
            {Array(5).fill(0).map((_,index)=>{
                return(
                    <Button variant="myButton" className='bg-pink-400 w-32 h-12' onClick={handleClick} key={index+1} style={parseInt(filt)===(index+1)?{backgroundColor:'#ffffff'}:{backgroundColor:'#121212'}}>{index+1}</Button>
                )
            })}
            <Button variant="myButton" className='bg-pink-400 w-32 h-12' onClick={handleClick} style={parseInt(filt)?{backgroundColor:'#121212'}:{backgroundColor:'#ffffff'}}>All</Button>
        </div>
    )
}

export default FilterBtns
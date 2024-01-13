import React, { useContext } from 'react'
import { Button } from './Buttons'
import { useFilters } from '@/context'

function FilterBtns() {
    const {filt, setFilt} = useFilters()!
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>)=>{
        setFilt(e.currentTarget.innerText);
    }
    console.log("filter is", typeof filt);
  return (
    <div className='flex flex-col gap-4'>
        {Array(5).fill(0).map((_,index)=>{
            return(
                <Button variant="myButton" className='bg-pink-400 w-32 h-12' onClick={handleClick}>{index+1}</Button>
            )
        })}
        <Button variant="myButton" className='bg-pink-400 w-32 h-12' onClick={handleClick}>All</Button>
    </div>
  )
}

export default FilterBtns
import React, { useContext } from 'react'
import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./Select"
import { FiltersContext } from '@/context/FiltersContext'


function FilterBtn() {
    const { setFilt } = useContext(FiltersContext)!;
    const [selectedValue, setSelectedValue] = useState('All');

    const handleSelectChange = (value:string) => {
      setSelectedValue(value);
    };
  
    return (
    <Select onChange={(value: string) => handleSelectChange(value)} value={selectedValue}>
        <SelectTrigger className="w-[180px] bg-pink-600 text-white text-2xl">
          <SelectValue placeholder={selectedValue} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="2">2</SelectItem>
        </SelectContent>
      </Select>
    );
}

export default FilterBtn
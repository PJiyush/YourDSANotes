import React, { useState } from "react";
import { Button } from "./Buttons";
import { extractTitle } from "@/helpers/ExtractTitle";
import{ HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/HoverCard'

interface RowProps {
    ratingId: number,
    title?: string,
    titleLink: string,
}

const Row: React.FC<RowProps> = (props) => {
    const {ratingId, titleLink, } = props;
    const [rating, setRating] = useState<number>(ratingId)
    const handleRatingClick = ()=>{
        setRating((rating)=>{
            if(rating === 5) return 1;
            return rating + 1;
        })
    }
    return(
        <div className=" bg-primaryCol-50  h-16 flex mt-2 rounded-md shadow-md" >
            <Button variant={"myButton"}  className="h-8 w-16 mt-4 ml-2 text-xl" onClick={handleRatingClick}>
                {rating}
            </Button>
            <div className="mt-3 ml-8">
                <a href={titleLink} className="text-black" target="_blank" rel="noreferrer">
                    <HoverCard>
                        <HoverCardTrigger className="text-rose-100 bg-transparent text-3xl">
                        {extractTitle(titleLink).length > 25 ? extractTitle(titleLink).slice(0,25) + "..." : extractTitle(titleLink)}
                        </HoverCardTrigger>
                        <HoverCardContent className="text-black bg-pink-400">
                            <div className="text-black ">
                                {extractTitle(titleLink)}
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </a>
            </div>
            <Button variant={"myButton"}  className="text-xl float-right">
                expand
            </Button>
        </div>
    )
}

export default Row;
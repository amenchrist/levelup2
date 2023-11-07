import React, { useState } from 'react';
import ListItem from './ListItem';
import Scroll from './Scroll';
import { MISSIONS, DETAILS } from '../constants';
import { useParams } from 'react-router-dom';
import { useMyStore } from '../store';

export default function List() {

    const title = useParams().category;
    let content = useMyStore(store => store[title.toLowerCase()]);
    let view, listItems;
    
    if(content){
        listItems = content.map((entry,i) => {
            return <ListItem item={content[i]} key={content[i].id}/>
        })
    }

    const [ sortedContent, setSortedContent ] = useState(content);
    const [ sort, setSort ] = useState(false);

    function swapOrder(list, i, direction){
        console.log("changing order")
        if (direction === "UP" && list[i].order !== 0){
            console.log(list[i])
            list[i-1].order++;
            list[i].order--;
        } else if (direction === "DOWN" && list[i].order !== list.length - 1){
            console.log(list[i])
            list[i+1].order--;
            list[i].order++;
        }
        content = content.sort((a,b) => a.order - b.order)
        setSortedContent(content);
    }


    switch(title){
        case MISSIONS:
            if (view === DETAILS){
                if (sort === true){
                    return (
                        <div>
                            <button className='pb2' onClick={()=>{setSort(false)}}>SAVE ORDER</button>
                            <Scroll>
                                {content.map((entry,i) => {
                                    return (
                                        <div className='pb2'>
                                            <p className='white fw7 b tc' onClick={()=> swapOrder(sortedContent, i, "UP") }>^</p>
                                            <ListItem item={sortedContent[i]} key={sortedContent[i].id}/>
                                            <p className='white fw5 tc' onClick={()=> swapOrder(sortedContent, i, "DOWN") }>v</p>
                                        </div>
                                    )
                                })}
                            </Scroll>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <button className='pb2' onClick={()=>{setSort(true)}}>CHANGE ORDER</button>
                            <Scroll>
                                {listItems}
                            </Scroll>
                        </div>
                    )
                }
            } else {
                return (
                    <div className='h-100'>
                        <Scroll>
                            {listItems}
                        </Scroll>
                    </div>
                )
            }
        default:
            return (
                <>
                    <p className='white'>Total: {content.length}</p>
                    <Scroll>
                        {listItems}
                    </Scroll>
                </>
            );
    }
}

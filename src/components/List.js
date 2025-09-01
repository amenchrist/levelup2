import React, { useEffect, useRef, useState, forwardRef } from 'react';
import ListItem from './ListItem';
import Scroll from './Scroll';
import { MISSIONS, DETAILS } from '../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useMyStore } from '../store';
import { Grid, Typography } from '@mui/material';
import NewItemButton from './NewItemButton';

export default function List() {

    const category = useParams().category.toLowerCase();
    let content = useMyStore(store => store[category.toLowerCase()]);
    const { player } = useMyStore();
    let view, listItems;

    const navigate = useNavigate();

    const targetRef = useRef(null);

    useEffect(() => {
        if (targetRef.current) {
        targetRef.current.scrollIntoView({
            behavior: 'auto',
            block: 'center',
        });
        }
    }, []); // runs once on mount
    
    if(content){
        listItems = content.map((entry,i) => {

            if(category === 'events'){
                //From the list of entries, find the first event that ends later than the current time
                const currentTime = new Date();
                //if the entry before it ends before the current time and the current entry ends after current time
                if (content[i-1] && new Date(content[i-1].scheduledEndDate) < currentTime && new Date(content[i].scheduledEndDate) > currentTime){
                    return <ListItem component="li" item={content[i]} key={content[i].id} ref={targetRef} highlight />
                }
            }

            return <ListItem component="li" item={content[i]} key={content[i].id}/>
        })
    }

    

    useEffect(() => {
        const targetItem = document.getElementById("current");
        if (targetItem) {
            console.log("Scrolling to current event:", content.find(event => event.id === "current"));
            targetItem.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [content]);

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

    function ListContainer({children}) {
        return (
            <div className='h-100 pa2'>
                <Grid container justifyContent="space-between" >
                    <Grid item sx={{padding: '5px 0 5px 0', color: 'white'}}>
                    <Typography variant='p' >Discipline Streak: {player.streak} Days</Typography>
                    </Grid>
                    <Grid item sx={{padding: '5px 0 5px 0', color: 'white'}}>
                    <Typography variant='p' >Exp: {player.exp}</Typography>
                    </Grid>
                </Grid>
                <hr/>
                <div className='h-90 pa1'>
                    <div className='h-100 w-100 center pa1'>
                        {/* <h1 className='tc b gold ma0 pb2'>{category}</h1> */}
                        <h2 className='tc b gold f3'>{category.split().toSpliced(0,1,category[0].toUpperCase(), category.slice(1))}</h2>
                        <div className=' h-80 '>
                        {children}
                        </div>
                        <div className='h-10 flex w-100 content-end pa2'>
                            {/* <NewItemButton /> */}
                        </div>
                    </div>
                </div>
            </div>   
        )
    }

    const coreCategories = ['inbox', 'tasks', 'missions', 'events', 'references']
    let collection = "";
    switch(category){
        case "tasks":
            collection = "task";
            break;
        case "missions":
            collection = "mission";
            break;
        case "events":
            collection = "event";
            break;
        case "references":
            collection = "reference";
            break;
        default:
            collection = "inbox";
    }

    switch(category){
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
                <ListContainer>
                    <p className='white'>Total: {content?.length}</p>
                    <Scroll>
                        {listItems}
                    </Scroll>
                    <br />
                    {coreCategories.includes(category)? 
                    <Grid item sx={{border: '2px solid white', padding: '5px 7px', color: 'white', textAlign: 'center' }} onClick={() => navigate(`/new/${collection}`)} >
                        <Typography variant='p'>Add new +</Typography>
                    </Grid>: <></>}
                </ListContainer>
                </>
            );
    }
}

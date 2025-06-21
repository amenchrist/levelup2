import React from 'react';
import { COMPLETED, PROCESSED, INBOX, TRASH, REFERENCES, MISSIONS, TASKS,  SOMEDAY, EVENTS, TODAY, MISSION_TASKS, TASK, MISSION, DAILY,  } from '../constants';
import NewItemButton from '../components/NewItemButton';
import ItemDetails from '../components/ItemDetails';
import TaskDetails from '../components/TaskDetails';
import MissionDetails from '../components/MissionDetails';
import BackButton from '../components/BackButton';
import PrevItemButton from '../components/PrevItemButton';
import NextItemButton from '../components/NextItemButton';
import ReferenceDetails from '../components/ReferenceDetails';
import TrashButton from '../components/TrashButton';
import CompletedItemDetails from '../components/CompletedItemDetails';
import TrashedItemDetails from '../components/TrashedItemDetails';
import EventDetails from '../components/EventDetails';
import { useParams } from 'react-router-dom';
import { useMyStore } from '../store';
import { Grid, Typography } from '@mui/material';


export default function Details( { touchFunction, updateExp, missionID  }){
    
    const itemID = useParams().id;
    const category = useParams().category.toUpperCase();
    const content = useMyStore(store => store[category.toLowerCase()]);
    const { player } = useMyStore();

    // FIND ITEM
    let item = {}, prev, next;
    const id = itemID;

    if(content){
        for (let i=0; i<content.length; i++){
        
            if (content[i].id === id){
                item = content[i];
    
                // ASSIGN THE PREV AND NEXT ITEM IDS
                i === 0 ? prev = content[i].id : prev = content[i-1].id;
                i === (content.length-1) ? next = content[i].id : next = content[i+1].id;
            }
    
        }
    }

    function DetailsContainer({children, category}) {
      return (
        <>
        <div className='w-100 h-100 center br1 pa2 bw2 ba b--black-10'>
          <Grid container justifyContent="space-between" >
            <Grid item sx={{padding: '5px 0 5px 0', color: 'white'}}>
              <Typography variant='p' >Discipline Streak: 0 Days</Typography>
            </Grid>
            <Grid item sx={{padding: '5px 0 5px 0', color: 'white'}}>
              <Typography variant='p' >Exp: {player.exp}</Typography>
            </Grid>
          </Grid>
          <hr/>
          <div className='flex justify-between items-center h-15'>
            <BackButton id={0} />
            <h2 className='tc b gold f3'>{category}</h2>
            <TrashButton id={itemID} category={category} />
          </div>
          <div className='h-70'>
              {children}
          </div>
          <div className='flex justify-between self-end h-15'>
              <PrevItemButton  prevID={prev} currentID={itemID} />
              <NextItemButton nextID={next} currentID={itemID}/>
          </div>
                
        </div>
        </>
        )
    }
    // CHOOSE DETAILS FORMAT FOR DIFFERENT LIST OR ITEM TYPES
    switch(true) {
        case category === MISSIONS:
            return (
                <DetailsContainer category={category} >
                    <MissionDetails mission={item} id={itemID} updateExp={updateExp}/>
                </DetailsContainer>
            )
        case category === TASKS:
            return (
                <DetailsContainer category={category} >
                    <TaskDetails id={itemID} />
                </DetailsContainer>
            )
        case category === MISSION_TASKS:
            return (
                <DetailsContainer category={category} >
                    <TaskDetails id={itemID} />
                </DetailsContainer>
            )
        case category === INBOX:
            return (
                <DetailsContainer category={category} >
                    <ItemDetails id={itemID} />
                </DetailsContainer>
            )
        case category === PROCESSED:
            return (
                <DetailsContainer category={category} >
                    <h5 className='white b pb2'>Name: {item.name}</h5>
                    <h5 className='white pb2'>Processed: {(new Date(item.processedDate)).toLocaleString()} </h5>
                </DetailsContainer>
            )
        case category === REFERENCES:
            return (
                <DetailsContainer category={category} >
                    <ReferenceDetails id={itemID} reference={item} />
                </DetailsContainer>
            )
        case category === EVENTS:
            return (
                <DetailsContainer category={category} >
                    <EventDetails id={itemID} item={item} />
                </DetailsContainer>
            )
        case category === COMPLETED:
            return (
                <DetailsContainer category={category} >
                    <CompletedItemDetails item={item} MissionsList={content}/>
                </DetailsContainer>
            )
        case category === TRASH:
        return (
            <DetailsContainer category={category} >
                <TrashedItemDetails item={item} />
            </DetailsContainer>
        )
        case category === TODAY || category === SOMEDAY:
            if (item.type === TASK){
                return (
                    <DetailsContainer category={TASK} >
                        <TaskDetails id={itemID} />
                    </DetailsContainer>
                )
            } else if (item.type === MISSION) {
                return (
                    <DetailsContainer category={MISSION} >
                        <MissionDetails mission={item} updateExp={updateExp}/>
                    </DetailsContainer>
                )
            }
            break;
        case category === DAILY:
            return (
                <DetailsContainer category={category} >
                    <TaskDetails id={itemID} />
                </DetailsContainer>
            )
        default:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10 pb2'>
                    <BackButton />
                    <h1 className='tc b white'>Error</h1>
                    <p>Item Not Found</p>
                    <NewItemButton touchFunction={touchFunction} />
                </div>        
            )
    }
}

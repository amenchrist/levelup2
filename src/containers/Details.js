import React from 'react';
import { REFERENCE, COMPLETED, PROCESSED, INBOX, TRASH, REFERENCES, MISSIONS, TASKS, CALENDAR, SOMEDAY, WAITING_FOR, EVENTS, TODAY, ASAP, MISSION_TASKS, TASK, MISSION, EVENT, DAILY, DONE } from '../constants';
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


export default function Details( { touchFunction, updateExp, missionID  }){
    
    const itemID = useParams().id;
    const title = useParams().category.toUpperCase();
    const content = useMyStore(store => store[title.toLowerCase()]);


    // //SPECIAL CONDITION FOR MISSION'S LIST
    // if(title === MISSION_TASKS) {

    //     content = getTasks(getMission(parseInt(missionID)), tasks);

    //     function getMission(projID){
    //         console.log("proj id: ", projID)
    //         let proj = {};
    //         for (let x=0; x < missions.length; x++){
    //             if (missions[x].id === projID){
    //                 proj = missions[x];
    //             }
    //         }
    //         console.log("proj = ", proj)
    //         return proj;
            
    //     }
    //     function getTasks(mission, TaskList){
    //         console.log("proj tasks: ", mission.taskList)
    //         let tasks = [];
    //         if(mission.taskList.length !== 0){
    //             for(let i=0; i<mission.taskList.length; i++){
    //                 for(let j=0; j<TaskList.length; j++){
    //                     if(mission.taskList[i] === TaskList[j].id ){
    //                         tasks.push(TaskList[j]);
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //         console.log(tasks);
    //         return tasks;
    //     }
    // }


    // FIND ITEM
    let item = {}, prev, next;
    const id = itemID;

    for (let i=0; i<content.length; i++){
        
        if (content[i].id === id){
            item = content[i];

            // ASSIGN THE PREV AND NEXT ITEM IDS
            i === 0 ? prev = content[i].id : prev = content[i-1].id;
            i === (content.length-1) ? next = content[i].id : next = content[i+1].id;
        }

    }

    function DetailsContainer({children, category}) {
        return (
            <div className='w-100 h-100 center br1 pa2 bw2 ba b--black-10'>
                <div className='flex justify-between items-center'>
                    <BackButton id={0} />
                    <TrashButton title={category} />
                </div>
                <h2 className='tc b gold f3'>{category}</h2>
                <div className='h-70'>
                    {children}
                </div>
                <div className='flex justify-between self-end'>
                    <PrevItemButton  prevID={prev} currentID={itemID} />
                    <NextItemButton nextID={next} currentID={itemID}/>
                </div>
                
            </div>
        )
    }
    // CHOOSE DETAILS FORMAT FOR DIFFERENT LIST OR ITEM TYPES
    switch(true) {
        case title === MISSIONS:
            return (
                <DetailsContainer category={title} >
                    <MissionDetails mission={item} updateExp={updateExp}/>
                </DetailsContainer>
            )
        case title === TASKS:
            return (
                <DetailsContainer category={title} >
                    <TaskDetails id={itemID} />
                </DetailsContainer>
            )
        case title === MISSION_TASKS:
            return (
                <DetailsContainer category={title} >
                    <TaskDetails id={itemID} />
                </DetailsContainer>
            )
        case title === INBOX:
            return (
                <DetailsContainer category={title} >
                    <ItemDetails id={itemID} />
                </DetailsContainer>
            )
        case title === PROCESSED:
            return (
                <DetailsContainer category={title} >
                    <h5 className='white b pb2'>Name: {item.name}</h5>
                    <h5 className='white pb2'>Processed: {(new Date(item.processedDate)).toLocaleString()} </h5>
                </DetailsContainer>
            )
        case title === REFERENCES:
            return (
                <DetailsContainer category={title} >
                    <ReferenceDetails id={itemID} reference={item} />
                </DetailsContainer>
            )
        case title === EVENTS:
            return (
                <DetailsContainer category={title} >
                    <EventDetails id={itemID} item={item} />
                </DetailsContainer>
            )
        case title === COMPLETED:
            return (
                <DetailsContainer category={title} >
                    <CompletedItemDetails item={item} MissionsList={content}/>
                </DetailsContainer>
            )
        case title === TRASH:
        return (
            <DetailsContainer category={title} >
                <TrashedItemDetails item={item} />
            </DetailsContainer>
        )
        case title === TODAY || title === SOMEDAY:
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
        case title === DAILY:
            return (
                <DetailsContainer category={title} >
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

import React from 'react';
import { REFERENCE, COMPLETED, PROCESSED, INBOX, TRASH, REFERENCES, MISSIONS, TASKS, CALENDAR, SOMEDAY, WAITING_FOR, EVENTS, TODAY, ASAP, MISSION_TASKS, TASK, MISSION, EVENT } from '../constants';
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


export default function Details( { touchFunction, updateExp, selectAnother, changeItemID, previousItemID, previousTitle, missionID  }){
    
    const itemID = useParams().id;
    const title = useParams().category.toUpperCase();

    const {missions, tasks, inbox } = useMyStore()
    let content;
    

    switch(title){
        case MISSIONS:
            content = missions;
        break;
        case TASKS:
            content = tasks;
        break;
        case INBOX:
            content = inbox;
        break;
        default:
            content = inbox.concat(missions, tasks)

    }


    //SPECIAL CONDITION FOR MISSION'S LIST
    if(title === MISSION_TASKS) {

        content = getTasks(getMission(parseInt(missionID)), tasks);

        function getMission(projID){
            console.log("proj id: ", projID)
            let proj = {};
            for (let x=0; x < missions.length; x++){
                if (missions[x].id === projID){
                    proj = missions[x];
                }
            }
            console.log("proj = ", proj)
            return proj;
            
        }
        function getTasks(mission, TaskList){
            console.log("proj tasks: ", mission.taskList)
            let tasks = [];
            if(mission.taskList.length !== 0){
                for(let i=0; i<mission.taskList.length; i++){
                    for(let j=0; j<TaskList.length; j++){
                        if(mission.taskList[i] === TaskList[j].id ){
                            tasks.push(TaskList[j]);
                            break;
                        }
                    }
                }
            }
            console.log(tasks);
            return tasks;
        }
    }

    //console.log("content list from details: ", content)

    // FIND ITEM
    let item = {};
    let prev;
    let next;
    const id = parseInt(itemID);

    for (let i=0; i<content.length; i++){
        //console.log("entering loop. Iteration: ", i)
        
        if (parseInt(content[i].id) === id){
            item = content[i];
            //console.log("item from loop: ", item)

            // ASSIGN THE PREV AND NEXT ITEM IDS
            i === 0 ? prev = content[i].id : prev = content[i-1].id;
            i === (content.length-1) ? next = content[i].id : next = content[i+1].id;
        }

    }
    // CHOOSE DETAILS FORMAT FOR DIFFERENT LIST OR ITEM TYPES
    switch(title) {
        case MISSIONS:
            return (
                <div className='w-100 h-100 center br1 pa2 bw2 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton title={MISSION} />
                    </div>
                    <h2 className='tc b gold f3'>MISSION</h2>
                    <div className='h-70'>
                        <MissionDetails mission={item} touchFunction={touchFunction} updateExp={updateExp}/>
                    </div>
                    <div className='flex justify-between self-end'>
                        <PrevItemButton  prevID={prev} currentID={itemID} />
                        <NextItemButton nextID={next} currentID={itemID}/>
                    </div>
                    
                </div>
            )
        case TASKS:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10 content-between '>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton title={TASK} />
                    </div>
                    <h2 className='tc b gold f3'>TASK</h2>
                    <div className='h-70'>
                        <TaskDetails id={parseInt(itemID)} />
                    </div>
                    <div className='flex justify-between self-end'>
                        <PrevItemButton  prevID={prev} currentID={itemID} />
                        <NextItemButton  nextID={next} currentID={itemID} />
                    </div>
                </div>
            )
        case MISSION_TASKS:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10 content-between '>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton title={MISSION_TASKS} />
                    </div>
                    <h2 className='tc b gold f3'>MISSION TASKS</h2>
                    <TaskDetails id={parseInt(itemID)} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton prevID={prev} currentID={itemID} />
                        <NextItemButton nextID={next} currentID={itemID} />
                    </div>
                </div>
            )
        case INBOX:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton title={INBOX} />
                    </div>
                    <h2 className='tc b gold f3'>Inbox Item</h2>
                    <div className='h-60'>
                        <ItemDetails id={parseInt(itemID)} touchFunction={touchFunction} selectAnother={selectAnother} prevID={prev} nextID={next} />
                    </div>
                </div>        
            )
        case PROCESSED:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton title={PROCESSED} />
                    </div>
                    <h2 className='tc b gold f3'>PROCESSED</h2>
                        <h5 className='white b pb2'>Name: {item.name}</h5>
                        <h5 className='white pb2'>Processed: {(new Date(item.processedDate)).toLocaleString()} </h5>
                        {/* <h5 className='white pb2'>Status: {item.status} </h5> */}
                    <div className='flex justify-between self-end'>
                        <PrevItemButton prevID={prev} currentID={itemID} />
                        <NextItemButton nextID={next} currentID={itemID} />
                    </div>
                </div>        
            )
        case REFERENCES:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton title={REFERENCE} />
                    </div>
                    <h1 className='tc b gold'>REFERENCE</h1>
                    <ReferenceDetails id={parseInt(itemID)} reference={item} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton  prevID={prev} currentID={itemID} />
                        <NextItemButton  nextID={next} currentID={itemID} />
                    </div>
                </div>
            )
        case EVENTS:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton title={EVENTS} />
                    </div>
                    <h1 className='tc b gold'>EVENT</h1>
                    <EventDetails id={parseInt(itemID)} item={item} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>
            )
        case SOMEDAY:
            if (item.type === TASK){
                console.log("someday item is a task")
                return (
                    <div className='h-100 w-100 center br1 ba b--black-10 content-between '>
                        <div className='flex justify-between items-center'>
                            <BackButton id={0} />
                            <TrashButton />
                        </div>
                        <h2 className='tc b gold f3'>TASK</h2>
                        <TaskDetails id={parseInt(itemID)} />
                        <div className='flex justify-between self-end'>
                            <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                            <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                        </div>
                    </div>
                )
            } else if (item.type === MISSION) {
                console.log("someday item is this mission = ", item)
                return (
                    <div className='w-100 h-100 center br1 pa2 ba b--black-10'>
                        <div className='flex justify-between items-center'>
                            <BackButton id={0} />
                            <TrashButton />
                        </div>
                        <h2 className='tc b gold f3'>MISSION</h2>
                        <MissionDetails mission={item} touchFunction={touchFunction} updateExp={updateExp}/>
                        <div className='flex justify-between self-end'>
                            <PrevItemButton selectAnother={changeItemID} prevID={prev} currentID={itemID} />
                            <NextItemButton selectAnother={changeItemID} nextID={next} currentID={itemID} />
                        </div>
                        
                    </div>
                )
            }
            break;
        case COMPLETED:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10 content-between '>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
                    <h2 className='tc b gold f3'>COMPLETED</h2>
                    <CompletedItemDetails item={item} MissionsList={missions}/>
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>
            );
        case TRASH:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10 content-between '>
                    <div className='flex justify-between'>
                        <BackButton id={0} />
                    </div>
                    <h2 className='tc b gold f3'>TRASHED</h2>
                    <TrashedItemDetails item={item} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>
            );
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

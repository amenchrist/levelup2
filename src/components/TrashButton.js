import React, { useEffect, useState } from 'react';
import trashCan from '../assets/trash1600.png';
import { INBOX, MISSIONS, REMOVE, TASKS, REFERENCES, SOMEDAY, ADD, PROCESSED, COMPLETED, MISSION_TASKS, EVENTS, UPDATE, DONE, PAUSED, TASK, MISSION, EVENT, TODAY, DAILY, REFERENCE } from '../constants';
import { inboxFilter, pushChanges } from '../functions';
import { useMyStore } from '../store';
import { useNavigate, useParams } from 'react-router-dom';

export default function TrashButton({ shipItems, changeNav, id }) {

    const { category } = useParams();
    const title = category.toUpperCase();
    const currentList = useMyStore(store => store[title.toLowerCase()]);
    const { updateItem, updateTask, updateMission, updateEvent, updateReference, setDbUpdatePending, inbox, setInbox, updateTrash, trash } = useMyStore();

    const navigate = useNavigate();

    let  indx, currentItem, list;

    // const InboxItems = inbox;
    // const MissionsList = missions;
    // const TaskList = tasks;
    // const References = references;
    // const Events = events;
    // const SomedayList = tasks.concat(missions);
    // const Completed = tasks.concat(missions).filter( e => e.status === DONE);


    // switch(true) {
    //     case title === MISSIONS:
    //         currentList = MissionsList;
    //         list = "Missions";
    //     break;
    //     case (title === TASKS || title === PROCESSED) || (title === TODAY || title === DAILY ) || title === MISSION_TASKS :
    //         currentList = TaskList;
    //         list = "Tasks";
    //     break;
    //     case title === INBOX:
    //         currentList = InboxItems;
    //         list = "Inbox";
    //     break;
    //     case title === REFERENCES:
    //         currentList = References;
    //         list = "References";
    //     break;
    //     case title === EVENTS:
    //         currentList = Events;
    //         list = "Events";
    //     break;
    //     case title === SOMEDAY:
    //         currentList = SomedayList;
    //     break;
    //     case title === COMPLETED:
    //         currentList = Completed;
    //     break;
    //     default:
    // }

    for (let i=0; i<currentList.length; i++){

        if (currentList[i].id === id){
            currentItem = currentList[i];
            indx = i;
            break;
        }

    }

    console.log("current trash item: ", currentItem)


    function trashItem() {
        console.log('trash button clicked');
        console.log("current trash item: ", currentItem)
        if (currentItem.status === "ACTIVE"){currentItem.status = PAUSED }
        currentItem.isTrashed = true;
        currentItem.trashedDate = new Date().toISOString().substr(0, 10);

        switch(title){
            case INBOX:
                updateItem(currentItem);
            break
            case TASK:
                updateTask(currentItem)
            break
            case MISSION:
                updateMission(currentItem)
            break
            case EVENT:
                updateEvent(currentItem)
            break
            case REFERENCE:
                updateReference(currentItem)
            break
            default:            
        }
        setDbUpdatePending(currentItem)
        
        navigate(`/${category}`);
    }


    return (
        <div>
            <img src={trashCan} alt='trash icon' className='h2' onClick={() => {trashItem()}} />
        </div>
    )
}
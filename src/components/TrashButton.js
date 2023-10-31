import React from 'react';
import trashCan from '../assets/trash1600.png';
import { INBOX, MISSIONS, REMOVE, TASKS, REFERENCES, SOMEDAY, ADD, PROCESSED, COMPLETED, MISSION_TASKS, EVENTS, UPDATE, DONE, PAUSED, TASK, MISSION, EVENT } from '../constants';
import { pushChanges } from '../functions';
import { useMyStore } from '../store';
import { useParams } from 'react-router-dom';

export default function TrashButton({ shipItems, changeNav, db, ID }) {

    const { inbox, missions, tasks , references, events } = useMyStore()
    const title = useParams().category.toUpperCase()

    const InboxItems = inbox;
    const MissionsList = missions;
    const TaskList = tasks;
    const References = references;
    const Events = events;
    const SomedayList = tasks.concat(missions)
    const Completed = tasks.concat(missions).filter( e => e.status === DONE)

    

    let currentList, indx, currentItem, list;

    switch(title) {
        case MISSIONS:
            currentList = MissionsList;
            list = "Missions";
        break;
        case TASKS:
            currentList = TaskList;
            list = "Tasks";
        break;
        case INBOX:
            currentList = InboxItems;
            list = "Inbox";
        break;
        case REFERENCES:
            currentList = References;
            list = "References";
        break;
        case EVENTS:
            currentList = Events;
            list = "Events";
        break;
        case SOMEDAY:
            currentList = SomedayList;
        break;
        case PROCESSED:
            currentList = TaskList;
            list = "Tasks";
        break;
        case COMPLETED:
            currentList = Completed;
        break;
        case MISSION_TASKS:
            currentList = TaskList;
            list = "Tasks";
        break;
        default:
    }

    for (let i=0; i<currentList.length; i++){

        if (currentList[i].id === parseInt(ID)){
            currentItem = currentList[i];
            indx = i;
            break;
        }

    }

    //Change Nav to List
    const nav = {
        title: title,
        view: "LIST",
        ID: 0
    }

    function trashItem() {
        console.log('trash button clicked');
        console.log("current trash item: ", currentItem)
        if (currentItem.status === "ACTIVE"){currentItem.status = PAUSED }
        switch (currentItem.type){
            case TASK:
                list = "Tasks";
            break;
            case MISSION:
                list = "Missions";
            break;
            case EVENT:
                list = "Events";
            break;
            default:
        }
        currentItem.isTrashed = true;
        currentItem.trashedDate = new Date().toISOString().substr(0, 10);;

        //amendList(REMOVE, currentList, currentItem, indx);
        //Trash.unshift(currentItem);
        pushChanges(UPDATE, currentItem, list, shipItems);
        // amendList(ADD, Trash, currentItem, indx);
        changeNav(nav);
    }


    return (
        <div>
            <img src={trashCan} alt='trash icon' className='h2' onClick={() => {trashItem()}} />
        </div>
    )
}
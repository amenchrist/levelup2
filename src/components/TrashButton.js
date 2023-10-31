import React from 'react';
import trashCan from '../assets/trash1600.png';
import { INBOX, MISSIONS, REMOVE, TASKS, REFERENCES, SOMEDAY, ADD, PROCESSED, COMPLETED, MISSION_TASKS, EVENTS, UPDATE, DONE, PAUSED, TASK, MISSION, EVENT, TODAY, DAILY } from '../constants';
import { pushChanges } from '../functions';
import { useMyStore } from '../store';
import { useParams } from 'react-router-dom';

export default function TrashButton({ shipItems, changeNav, db, ID }) {

    const title = useParams().category.toUpperCase()
    const currentList = useMyStore(store => store[title.toLowerCase()]);
    
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
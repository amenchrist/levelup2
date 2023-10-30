import React from 'react';
import { MISSION, TASK, INBOX_ITEM, TASKS, DONE, COMPLETED, DETAILS, MISSIONS, INBOX, TRASH, CALENDAR, MISSION_TASKS, SOMEDAY, EVENT, EVENTS, REFERENCES, REFERENCE, PROCESSED } from '../constants';
import { displayDays } from '../functions';


export default function ListItem( { touchFunction, item, title }){
    
    let nextTitle;

    switch(true){
        case item.type === MISSION && !item.isTrashed:
            //console.log("trash log  ",item)
            title === SOMEDAY ? nextTitle = SOMEDAY : nextTitle = MISSIONS;
            //let days = parseInt(Math.floor(total_hours / 24));
            //let days = (item.dueDate / (1000*60*60*24)) % 7;
            //console.log('days: ', days);
            return (
                <div className='ba pa2 listItem w-100 flex justify-between h-20 items-center b--grey min-h-50' title={item.isTrashed ? TRASH : nextTitle} data-view={DETAILS}  id={item.id} onClick={touchFunction}>
                    <div className='w-80 '>
                        <p className='fw7 b white pb2'>{item.name}</p>
                        <p className='fw3 white'>{displayDays(item.dueDate)}, Tasks: {item.taskList.length}</p>
                    </div>
                    <div>
                        <p className='gold fw7 b'>EXP</p>
                    </div>
                </div>
            )
        case item.type === TASK && !item.isTrashed:
            item.status === DONE ? nextTitle = COMPLETED : nextTitle = TASKS;
            if(title === MISSIONS){nextTitle = MISSION_TASKS};
            if(title === SOMEDAY){
                nextTitle = SOMEDAY;
                return (
                    <div className='ba pa2 listItem w-100 flex justify-between items-center b--grey min-h-50' data-view={DETAILS}  title={nextTitle} id={item.id} onClick={touchFunction}>
                        <div className='w-80'>
                        <p className='fw7 b white pb2'>{item.name}</p>
                        {/* <p className='fw3 white'>{title === CALENDAR ? new Date(item.dueDate).toDateString() : item.requiredContext}</p> */}
                        <p className='fw3 white'>NO DATE SET</p>
                        </div>
                        <div>
                            <p className='gold fw7 b'>{item.status}</p>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className='ba pa2 listItem w-100 flex justify-between items-center b--grey min-h-50' data-view={DETAILS}  title={nextTitle} id={item.id} onClick={touchFunction}>
                        <div className='w-80'>
                        <p className='fw7 b white pb2'>{item.name}</p>
                        {/* <p className='fw3 white'>{title === CALENDAR ? new Date(item.dueDate).toDateString() : item.requiredContext}</p> */}
                        <p className='fw3 white'>{displayDays(item.dueDate)}</p>
                        </div>
                        <div>
                            <p className='gold fw7 b'>{item.status}</p>
                            
                        </div>
                    </div>
                )
            }
        case item.type === EVENT && !item.isTrashed:
            nextTitle = EVENTS;
            console.log(nextTitle);
            return (
                <div className='ba pa2 listItem w-100 flex justify-between items-center b--grey min-h-50' data-view={DETAILS}  title={nextTitle} id={item.id} onClick={touchFunction}>
                    <div className='w-80'>
                    <p className='fw7 b white pb2'>{item.name}</p>
                    <p className='fw3 white'>{new Date(item.date).toDateString()}</p>
                    </div>
                    <div>
                        <p className='gold fw7 b'>REM</p>
                    </div>
                </div>
            )
        case item.type === REFERENCE && !item.isTrashed:
        nextTitle = REFERENCES;
            return (
                <div className='ba pa2 listItem w-100 flex justify-between items-center b--grey min-h-50' data-view={DETAILS}  title={nextTitle} id={item.id} onClick={touchFunction}>
                    <div className='w-80'>
                    <p className='fw7 b white pb2'>{item.name}</p>
                    {/* <p className='fw3 white'>{new Date(item.dueDate).toDateString()}</p> */}
                    </div>
                    <div>
                        <p className='gold fw7 b'>REF</p>
                    </div>
                </div>
            )
        case item.status === PROCESSED && !item.isTrashed:
        nextTitle = PROCESSED;
            return (
                <div className='ba pa2 listItem w-100 flex justify-between items-center b--grey min-h-50' data-view={DETAILS}  title={nextTitle} id={item.id} onClick={touchFunction}>
                    <div className='w-80'>
                    <p className='fw7 b white pb2'>{item.name}</p>
                    <p className='fw3 white'>{new Date(item.processedDate).toDateString()}</p>
                    </div>
                    <div>
                        <p className='gold fw7 b'>PROCESSED</p>
                    </div>
                </div>
            )
        case item.type === INBOX_ITEM && !item.isTrashed:
            return (
                <div className='ba pa2 listItem w-100 flex justify-between h-20 items-center b--grey min-h-50' 
                title={item.isTrashed ? TRASH : INBOX} data-view={DETAILS}  id={item.id} onClick={touchFunction}>
                    <div className='w-80'>
                    <p className='fw7 b white pb2'>{item.name}</p>
                    <p className='fw3 white'>Entered: {(new Date(item.entryDate)).toLocaleString()}</p>
                    </div>
                    <div className='pa2' >
                        <p className='fw7 b bg-white pa2'>PROCESS</p>
                    </div>
                </div>
            )
        case item.isTrashed:
            return (
                <div className='ba pa2 listItem w-100 flex justify-between h-20 items-center b--grey min-h-50' 
                title={TRASH} data-view={DETAILS}  id={item.id} onClick={touchFunction}>
                    <div className='w-80'>
                    <p className='fw7 b white pb2'>{item.name}</p>
                    <p className='fw3 white'>DELETED: {(new Date(item.trashedDate)).toLocaleString()}</p>
                    </div>
                    <div className='pa2' >
                        <p className='fw7 b bg-white pa2'>{item.type}</p>
                    </div>
                </div>
            )
        default:
            return (
                <div className='bb' title='new item' onClick={touchFunction}>
                    <h3>Enter New Item</h3>
                </div>
            )
    }
}

import React from 'react';
import { MISSION, TASK, INBOX_ITEM, TASKS, DONE, COMPLETED, DETAILS, MISSIONS, INBOX, TRASH, CALENDAR, MISSION_TASKS, SOMEDAY, EVENT, EVENTS, REFERENCES, REFERENCE, PROCESSED } from '../constants';
import { displayDays } from '../functions';
import { useNavigate, useParams } from 'react-router-dom';


export default function ListItem( { item, title }){
    
    let nextTitle;
    const navigate = useNavigate();
    const { category } = useParams();

    function ListWrapper({ children, suffix }) {
        return (
            <div className='ba pa2 listItem w-100 flex justify-between h-20 items-center b--grey min-h-50' onClick={() => navigate(`/${category}/${item.id}`)}>
                <div className='w-80 '>
                    <p className='fw7 b white pb2'>{item.name}</p>
                    {children}
                </div>
                <div>
                    <p className='gold fw7 b'>{suffix}</p>
                </div>
            </div>
        )
    } 

    // console.log(item)
    
    switch(true){
        case item.type === MISSION && !item.isTrashed:
            title === SOMEDAY ? nextTitle = SOMEDAY : nextTitle = MISSIONS;
            return (
                <ListWrapper suffix={'EXP'} >
                    <p className='fw3 white'>{displayDays(item.dueDate)}, Tasks: {item.taskList.length}</p>
                </ListWrapper>
            )
        case item.type === TASK && !item.isTrashed:
            if(title === SOMEDAY){
                nextTitle = SOMEDAY;
                return (
                    <ListWrapper suffix={item.status} >
                        <p className='fw3 white'>NO DATE SET</p>
                    </ListWrapper>
                )
            } else {
                return (
                    <ListWrapper suffix={item.status} >
                        <p className='fw3 white'>{displayDays(item.dueDate)}</p>
                    </ListWrapper>
                )
            }
        case item.type === EVENT && !item.isTrashed:
            nextTitle = EVENTS;
            console.log(nextTitle);
            return (
                <ListWrapper suffix={'REM'} >
                    <p className='fw3 white'>{new Date(item.date).toDateString()}</p>
                </ListWrapper>
            )
        case item.type === REFERENCE && !item.isTrashed:
        nextTitle = REFERENCES;
            return (
                <ListWrapper suffix={'REF'} >
                    <p className='fw3 white'>{new Date(item.date).toDateString()}</p>
                </ListWrapper>
            )
        case item.status === PROCESSED && !item.isTrashed:
        nextTitle = PROCESSED;
            return (
                <ListWrapper suffix={'PROCESSED'} >
                    <p className='fw3 white'>{new Date(item.processedDate).toDateString()}</p>
                </ListWrapper>
            )
        case item.type === INBOX_ITEM && !item.isTrashed:
            return (
                <ListWrapper suffix={'PROCESS'} >
                    <p className='fw3 white'>Entered: {(new Date(item.entryDate)).toLocaleString()}</p>
                </ListWrapper>
            )
        case item.isTrashed:
            return (
                <ListWrapper suffix={item.type} >
                    <p className='fw3 white'>DELETED: {(new Date(item.trashedDate)).toLocaleString()}</p>
                </ListWrapper>
            )
        default:
            return (
                <div className='bb' title='new item' onClick={() => {}}>
                    <h3>Enter New Item</h3>
                </div>
            )
    }
}

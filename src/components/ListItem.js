import React, { forwardRef } from 'react';
import { MISSION, TASK, INBOX_ITEM,  MISSIONS, SOMEDAY, EVENT, EVENTS, REFERENCES, REFERENCE, PROCESSED } from '../constants';
import { displayDays } from '../functions';
import { useNavigate, useParams, } from 'react-router-dom';
import dayjs from 'dayjs';


const ListItem = forwardRef( ({ item, title, highlight }, ref ) => {

    let nextTitle;
    const navigate = useNavigate();

    let { category } = useParams();
    if(category === undefined){
      category = item.collection + 's'
    } 

    const duration = item.scheduledEndDate? dayjs(`${item.scheduledEndDate}`).diff(dayjs(`${item.scheduledDate}`), 'minute') > 60 ? 
              dayjs(`${item.scheduledEndDate}`).diff(dayjs(`${item.scheduledDate}`), 'minute') / 60 + ' hrs' : 
              dayjs(`${item.scheduledEndDate}`).diff(dayjs(`${item.scheduledDate}`), 'minute') + ' mins' : '0 mins';

    function ListWrapper({ children, suffix }) {
        return (
            <div ref={ref} style={{ backgroundColor: highlight ? 'midnightblue' : 'transparent' }} 
              className='ba pa2 listItem w-100 flex justify-between h-25 items-center b--grey min-h-50' 
              onClick={() => navigate(`/${category}/${item.id}`)}
              >
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
              const date = dayjs(item.scheduledDate).format('YYYY-MM-DD')
                return (
                  <ListWrapper suffix={item.priority} >
                      <p className='fw3 white pb2'>{dayjs(`${date} ${item.scheduledTime}`).format('dddd, MMMM DD @ hh:mm a')}</p>
                      <p className='fw3 white'>Duration: {duration}</p>

                  </ListWrapper>
                )
            }
        case item.type === EVENT && !item.isTrashed:
            nextTitle = EVENTS;
            
            return (
              <ListWrapper suffix={'REM'} >
                <p className='fw3 white pb2'>{dayjs(`${item.scheduledDate}`).format('dddd, MMMM DD @ hh:mm a')}</p>
                <p className='fw3 white'>Duration: {duration} </p>
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
})

export default ListItem
import React, { useState, useEffect } from 'react';
import { DAILY, EVENTS, MONTHLY, NONE, UPDATE, WEEKLY, YEARLY } from '../constants';
import { amendList } from '../functions';
import DatePicker from './DatePicker';
import { useParams } from 'react-router-dom';
import { useMyStore } from '../store';
import dayjs from 'dayjs';
import { Box, Grid, TextField } from '@mui/material';
import FormDialog from './Dialog';
import Player from '../classes/Player';


export default function EventDetails({ shipItems, db, exp }) {

    const id = useParams().id;
    const { events, updateItem } = useMyStore();
    const player = useMyStore(store => new Player(store.player));

    const [openDialog, setOpenDialog] = useState(false);
    const [openScheduledDateDialog, setOpenScheduledDateDialog] = useState(false);

    let item = {};

    for (let i=0; i<events.length; i++){

        if (events[i].id === id){
            item = events[i];
           break;
        }
    }

    const [ name, setName ] = useState(item.name);
    const [ date, setDate ] = useState(item.scheduledDate);
    const [ scheduledEndDate, setScheduledEndDate ] = useState(item.scheduledEndDate);
    const [ time, setTime ] = useState(dayjs(item.time).format('hh:mm'));
    const [ location, setLocation ] = useState(item.location);
    const [ frequency, setFrequency ] = useState(item.frequency);
    const [ note, setNote ] = useState(item.note);

    useEffect(() => {
        setName(item.name);
        setDate(item.scheduledDate);
        setScheduledEndDate(item.scheduledEndDate)
        setTime(dayjs(item.time).format('hh:mm'));
        setLocation(item.location);
        setFrequency(item.frequency);
        setNote(item.note);
        
    }, [ item.name, item.scheduledDate, item.time, item.location, item.frequency, item.note, item.scheduledEndDate])

    function updateDB( obj, property, newVal) {

        if (obj[property] !== newVal){
            // console.log(`old value (${obj[property]}) !== new value (${newVal})`)
            obj[property] = newVal;

            updateItem(obj)
            updateItem(player.updateExp(1))
            
        }
    }

    function saveDate(date){
        updateDB( item, "date", date )
    }

    const DateAndTimePicker = () => {
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField required fullWidth type="date" id="date" label="Date" value={dayjs(date).format('YYYY-MM-DD')} onChange={(e) => setDate(dayjs(`${e.target.value} ${time}`).toDate().toString())} />
            </Grid>
            <Grid item xs={12} sm={6} >
                <TextField required fullWidth type="time" id="time" label="Time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Grid>
          </Grid>
        )
      }

      function updateScheduledDate(){
        const newDate = dayjs(`${date}`).toDate().toString()
        updateDB( item, "time", time );
        updateDB( item, "scheduledDate", newDate );
      }

    return (
        <div className='' >
            <div>
                <div className='w-100 pa2 pb3' >
                    {/* <h3 className='fw7 b white pb2'>{task.name}</h3>
                    <h4 className='fw1 white'>{task.location}</h4> */}

                    <input type='text' onChange={(e)=> {setName(e.target.value);} } onBlur={() => { updateDB(item, "name", name ) } } 
                    value={name} className='bn fw9 b white bg-transparent' />

                    <div className='w-100flex justify-between'>
                    <h5 className='fw3 white pb1' onClick={() => setOpenScheduledDateDialog(true)}>Starts: {dayjs(`${date}`).format('dddd, MMMM DD @ hh:mm a')} </h5>
                    <h5 className='fw3 white pb1' onClick={() => setOpenScheduledDateDialog(true)}>Ends: {dayjs(`${scheduledEndDate}`).format('dddd, MMMM DD @ hh:mm a')} </h5>
                  <FormDialog open={openScheduledDateDialog} setOpen={setOpenScheduledDateDialog} 
                    title={'Scheduled Date'} msg={'When would you like to do this task?'} Content={<DateAndTimePicker />} actionText={'Save'} action={updateScheduledDate}
                    />
                  {/* <h5 className='fw3 white pb2'>Time: {task.scheduledTime} </h5> */}
                </div>
                {/* <div className='w-100 pb3 flex justify-between'>
                    <DatePicker item={item} date updateFunc={saveDate} />
                 </div> */}
                </div>

                <div className='w-100 pl2 pb3'>
                    <input type='text' onChange={(e)=> {setLocation(e.target.value);} } 
                        onBlur={() =>{ updateDB(item, "location", location ) }} 
                        value={location} className='fw1 white bn bg-transparent' />
                    {/* <h5 className='fw3 white'>Mission: </h5>
                    <h4 className='fw5 white' onClick={() => {
                        if(task.associatedMissionID != 0){changeNavigation(task.associatedMissionID, MISSIONS)}}} >{associatedMission.name}</h4> */}
                </div>
                {/* <input className=' fw4 white bg-transparent pa2 mb1' id='time' type='time' value={time} onChange={(e) => {setTime(e.target.value); console.log(time)}} onBlur={() => { updateDB(item, "time", time ) } }/> */}
                {/* <div className='w-100 pl2 pb3'>
                    <label className='fw4 white' htmlFor="frequency" >Frequency:</label>
                    <select className=' fw4 white bg-transparent mb1' id="priority" value={frequency} onChange={(e)=> setFrequency(e.target.value)} onBlur={() => { updateDB(item, "frequency", frequency ) } }>
                        <option value={frequency} disabled>{frequency}</option>
                        <option value={NONE}>ONE-TIME</option>
                        <option value={DAILY}>DAILY</option>
                        <option value={WEEKLY}>WEEKLY</option>
                        <option value={MONTHLY}>MONTHLY</option>
                        <option value={YEARLY}>YEARLY</option>
                    </select>
                </div> */}
                <div className='pa2'>
                    {/* <p className='fw3 white'>{task.note}</p> */}
                    <textarea rows="4" cols="45" onChange={(e)=> {setNote(e.target.value);} } onBlur={ () =>{ updateDB(item, "note", note )}} value={note} className='fw3 white bn bg-transparent' />
                </div>
            </div>
        </div>
    );
    
    return (
        <div className='' >
            <div>
                <div className='w-100 pa2 pb3' >
                    {/* <h3 className='fw7 b white pb2'>{item.name}</h3> */}
                    <input type='text' 
                    className='bn fw7 b white bg-transparent'
                    value={name} 
                    onChange={(e)=> {setName(e.target.value);} } 
                    onBlur={() => {updateDB(item, "name", name )} }  
                    />
                    <h4 className='fw1 white'>{item.type}</h4>
                </div>
                <div className='w-100 pl2 pb3'>
                    <h5 className='fw3 white'>Date: </h5>
                    <DatePicker item={item} dueDate={item.date} updateFunc={saveDate}/>
                </div>
                <h5 className='bb b--white pa2 fw3 white b' >NOTE</h5>
                <div className='pa2'>
                    <textarea rows="4" cols="45" 
                    onChange={(e)=> {setNote(e.target.value);} } 
                    onBlur={ () =>{ updateDB(item, "note", note )}} 
                    value={note} 
                    className='fw3 white bn bg-transparent' />
                </div>
            </div>
        </div>
    )
}

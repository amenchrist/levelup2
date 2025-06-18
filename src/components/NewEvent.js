import React, { useState } from 'react';
import { ADD, DAILY, DETAILS, EVENTS, MONTHLY, NONE, WEEKLY, YEARLY } from '../constants';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from '@mui/material';
import {  Event } from '../classes/Event';
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Player from '../classes/Player';
import { rescheduleAll } from '../functions';

export default function NewEvent({ item, processorSubmit }) {

    const { addItem, updateItem } = useMyStore();
    const player = useMyStore(store => new Player(store.player));
    const navigate = useNavigate();

    let today = new Date().toISOString().substr(0, 10);

    const [ name, setName ] = useState(() => item? item.name : '');
    const [ date, setDate ] = useState(dayjs().format('YYYY-MM-DD'));
    const [ time, setTime ] = useState(dayjs().format('HH:mm'));
    const [ endDate, setEndDate ] = useState(dayjs().format('YYYY-MM-DD'));
    const [ endTime, setEndTime ] = useState('');
    const [ location, setLocation ] = useState("");
    const [ frequency, setFrequency ] = useState("");
    const [ note, setNote ] = useState('');
    const [ duration, setDuration ] = useState('');

    const [ recurring, setRecurring ] = useState(false);
    const [ reEndDate, setReEndDate ] = useState(dayjs().format('YYYY-MM-DD'));

    const frequencyOptions = [ {value: 'DAILY', label: 'Daily'}, {value: 'WEEKLY', label: 'Weekly'}, {value: 'MONTHLY', label: 'Monthly'} ];

    function submitNewItem(event) {
        event.preventDefault();

        const startDate = dayjs(`${date} ${time}`).toDate();
        const createEvent = (start) => {
            const end = new Date(start.toString()).getTime()+(duration*60000);
            let e = new Event(
                {
                    name, scheduledDate: start, 
                    time, location, frequency: recurring? frequency : '', 
                    scheduledEndDate: dayjs(end).toDate().toString(),
                });
            addItem(e);
            processorSubmit()
            return e
        }

        // let e = new Event(
        //     {
        //         name, scheduledDate: startDate, 
        //         time, location, frequency, 
        //         scheduledEndDate: dayjs(end).toDate().toString(),
        //     });
        // addItem(e);
        
        // if (frequency === DAILY ){
        //     const recurrenceLimit = 5;
        //     for (let i=1; i<=recurrenceLimit; i++){
        //         let nextDate = dayjs(`${date} ${time}`).add(i, 'day').toDate().toString();
        //         let nextEnd = dayjs(`${endDate} ${endTime}`).add(i, 'day').toDate().toString();

        //         const e1 =  {name, scheduledDate: nextDate, scheduledEndDate: nextEnd, time, location, frequency};
        //         addItem({...new Event(e1)});
        //     }
        // }

        if(recurring){
            const start = dayjs(`${date} ${time}`).toDate();
            const current = dayjs(`${date} ${time}`).toDate();
            const end = dayjs(`${reEndDate} ${time}`).toDate();
      
            const dates = [];
            while (current <= end){
              switch(frequency){
                // case 'DAILY':
                //   if(current.getDay() === start.getDay()){
                //     dates.push(dayjs(new Date(current)).format('YYYY-MM-DD'))
                //   }
                // //   current.setDate(current.getDate()+ 1)
                // console.log(current.getDate())
                //   break;
                case 'WEEKLY':
                  if(current.getDay() === start.getDay()){
                    dates.push(dayjs(new Date(current)).toDate())
                  }
                  current.setDate(current.getDate()+ 1)
                  break;
                case 'MONTHLY':
                  //SAME Day EVERY MONTH
                  if(current.getDate() === start.getDate()){
                    dates.push(dayjs(new Date(current)).toDate())
                  }
                  current.setMonth(current.getMonth() + 1);
                  current.setDate(1);
                  break;
                default:
                  //Every day till end date
                  dates.push(dayjs(new Date(current)).toDate())
                  current.setDate(current.getDate()+ 1)
              }
            }
      
            // console.log(dates)
            dates.forEach(d => {
              createEvent(d)
            } )

            navigate(`/Events`);
      
          } else {
            const e = createEvent(startDate)
            navigate(`/Events/${e.id}`);
          }

        if(item){
            // processorSubmit(e.id)
        }
        updateItem(player.updateExp(5))
        
        
        rescheduleAll(updateItem);
    }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc b gold f3'>NEW EVENT</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={EVENTS}>
                <input className='pa2 mb1' autoFocus type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <label className='fw4 white' htmlFor="date" >Start Date:</label>
                <input className='pa2 mb1' id='date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                <label className='fw4 white' htmlFor="time" >Start Time:</label>
                <input className='pa2 mb1' id='time' type='time' value={time} onChange={(e) => {setTime(e.target.value)}} />

                <label className='fw4 white' htmlFor="duration" >Duration (mins):</label>
                <input className='pa2 mb1' id='duration' type='number' min={1} value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} />

                <label className='fw4 white' htmlFor="location" >Location:</label>
                <input className='pa2 mb1' type='text' placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                <Grid item xs={12} >
                  <FormControlLabel control={<Checkbox onChange={() => setRecurring(!recurring)} checked={recurring} sx={{color: 'white'}} /> }  label="Recurring" sx={{color: 'white'}} />
                </Grid>
                { !recurring? <></> :
                <>
                  <Grid item xs={12} sm={6} >
                    <label className='fw4 white' htmlFor="frequency" >Frequency:</label>
                    <TextField required={recurring} fullWidth select value={frequency} onChange={(e) => setFrequency(e.target.value)} sx={{color: 'white', bgcolor: 'white', mb: 2}} >
                      {frequencyOptions.map((e,i) => (
                        <MenuItem key={i} value={e.value} sx={{textColor: 'white', mb: 2}}>{e.value}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} >
                    <label className='fw4 white' htmlFor="frequency" >End Date:</label>
                    <TextField required fullWidth type="date" value={reEndDate} onChange={(e) => setReEndDate(e.target.value)} sx={{bgcolor: 'white', mb: 2}} />
                  </Grid>
                </>              
                }
                {/* <Grid item xs={12} >
                <TextField required fullWidth label="Watch Link" id="watch-link" value={watchLink} onChange={(e) => setWatchLink(e.target.value)}/>
                </Grid> */}
                {/* <label className='fw4 white' htmlFor="frequency" >Frequency:</label> */}
                {/* <select className='pa2 mb1' id="priority" value={frequency} onChange={(e)=> setFrequency(e.target.value)}>
                    <option value="" disabled >Frequency</option>
                    <option value={NONE} defaultValue>ONE-TIME</option>
                    <option value={DAILY}>DAILY</option>
                    <option value={WEEKLY}>WEEKLY</option>
                    <option value={MONTHLY}>MONTHLY</option>
                    <option value={YEARLY}>YEARLY</option>
                </select> */}
                <textarea className='pa2 mb1' placeholder='Note' value={note} onChange={(e) => setNote(e.target.value)} />
                <input className='pa2 mb1'type='submit' value='submit' />
            </form>
        </div>
    )
}

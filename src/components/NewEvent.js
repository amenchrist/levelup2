import React, { useState } from 'react';
import { ADD, DAILY, DETAILS, EVENTS, MONTHLY, NONE, WEEKLY, YEARLY } from '../constants';
import {  Event } from '../classes/Event';
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Player from '../classes/Player';

export default function NewEvent({ item, processorSubmit }) {

    const { addItem, updateItem } = useMyStore();
    const player = useMyStore(store => new Player(store.player));
    const navigate = useNavigate();

    let today = new Date().toISOString().substr(0, 10);

    const [ name, setName ] = useState(() => item? item.name : '');
    const [ date, setDate ] = useState(dayjs().format('YYYY-MM-DD'));
    const [ time, setTime ] = useState(dayjs().format('hh:mm'));
    const [ endDate, setEndDate ] = useState(dayjs().format('YYYY-MM-DD'));
    const [ endTime, setEndTime ] = useState('');
    const [ location, setLocation ] = useState("");
    const [ frequency, setFrequency ] = useState("");
    const [ note, setNote ] = useState('');



    function submitNewItem(event) {
        event.preventDefault();

        let e = new Event(
            {
                name, date: dayjs(`${date} ${time}`).toDate().toString(), 
                time, location, frequency, 
                scheduledEndDate: dayjs(`${endDate} ${endTime}`).toDate().toString(),
            });
        addItem(e);
        console.log(e)
        
        if (frequency === DAILY ){
            const recurrenceLimit = 5;
            for (let i=1; i<=recurrenceLimit; i++){
                let nextDate = dayjs(`${date} ${time}`).add(i, 'day').toDate().toString();
                let nextEnd = dayjs(`${endDate} ${endTime}`).add(i, 'day').toDate().toString();

                const e1 =  {name, date: nextDate, scheduledEndDate: nextEnd, time, location, frequency};
                addItem({...new Event(e1)});
            }
        } 

        if(item){
            processorSubmit(e.id)
        }
        updateItem(player.updateExp(5))

        navigate(`/Events/${e.id}`);
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
                
                <label className='fw4 white' htmlFor="date" >End Date:</label>
                <input className='pa2 mb1' id='date' type='date' min={today} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <label className='fw4 white' htmlFor="time" >End Time:</label>
                <input className='pa2 mb1' id='time' type='time' value={endTime} onChange={(e) => {setEndTime(e.target.value)}} />

                <label className='fw4 white' htmlFor="location" >Location:</label>
                <input className='pa2 mb1' autoFocus type='text' placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                <label className='fw4 white' htmlFor="frequency" >Frequency:</label>
                <select className='pa2 mb1' id="priority" value={frequency} onChange={(e)=> setFrequency(e.target.value)}>
                    {/* <option value="" disabled >Frequency</option> */}
                    <option value={NONE} defaultValue>ONE-TIME</option>
                    <option value={DAILY}>DAILY</option>
                    <option value={WEEKLY}>WEEKLY</option>
                    <option value={MONTHLY}>MONTHLY</option>
                    <option value={YEARLY}>YEARLY</option>
                </select>
                <textarea className='pa2 mb1' placeholder='Note' value={note} onChange={(e) => setNote(e.target.value)} />
                <input className='pa2 mb1'type='submit' value='submit' />
            </form>
        </div>
    )
}

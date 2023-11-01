import React, { useState } from 'react';
import { ADD, DAILY, DETAILS, EVENTS, MONTHLY, NONE, WEEKLY, YEARLY } from '../constants';
import {  Event } from '../classes';
import { pushChanges, convertDateToMilliseconds  } from '../functions';
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { uploadNewEvent } from '../api';


export default function NewEvent({ updateExp, shipItems, changeNav, db }) {

    const { addEvent } = useMyStore();
    const navigate = useNavigate();

    let today = new Date().toISOString().substr(0, 10);

    const [ name, setName ] = useState('');
    const [ date, setDate ] = useState(today);
    const [ time, setTime ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ frequency, setFrequency ] = useState("");
    const [ note, setNote ] = useState('');



    function submitNewItem(event) {
        event.preventDefault();
        
        let e = new Event( name, date, time, location, frequency );
        console.log(e);
        addEvent(e);
        uploadNewEvent(e)
        // updateExp(5);

        navigate(`/Events/${e.id}`);
    }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc b gold f3'>NEW EVENT</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={EVENTS}>
                <input className='pa2 mb1' autoFocus type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <label className='fw4 white' htmlFor="date" >Date:</label>
                <input className='pa2 mb1' id='date' type='date' min={today} value={date} onChange={(e) => setDate(e.target.value)} />
                <label className='fw4 white' htmlFor="time" >Time:</label>
                <input className='pa2 mb1' id='time' type='time' value={time} onChange={(e) => {setTime(e.target.value); console.log(time)}} />
                <label className='fw4 white' htmlFor="location" >Location:</label>
                <input className='pa2 mb1' autoFocus type='text' placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                <label className='fw4 white' htmlFor="frequency" >Frequency:</label>
                <select className='pa2 mb1' id="priority" value={frequency} onChange={(e)=> setFrequency(e.target.value)}>
                    <option value="" disabled defaultValue>Frequency</option>
                    <option value={NONE}>ONE-TIME</option>
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

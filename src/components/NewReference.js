import React, { useState } from 'react';
import { ADD, DETAILS, REFERENCES, REFERENCE } from '../constants';
import { Reference } from '../classes';
import { pushChanges, convertDateToMilliseconds  } from '../functions';
import { useMyStore } from '../store';

export default function NewReference({ updateExp, shipItems, changeNav, db }) {

    const { references } = useMyStore();
    const References = references;

    let today = new Date().toISOString().substr(0, 10);

    const [ name, setName ] = useState('');
    const [ details, setDetails ] = useState('');
    const [ dueDate, setDueDate ] = useState(today);


    function submitNewItem(event) {
        
        let r = new Reference(name, details );
        console.log(r);
        //References.unshift(r);
        pushChanges(ADD, r, "References", shipItems);
        updateExp(5);
        event.preventDefault();

        const nav = {
            title: REFERENCES,
            view: DETAILS,
            ID: r.id
        }

        changeNav(nav);
    }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc b gold f3'>NEW REFERENCE</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={REFERENCE}>
                <input className='pa2 mb1' autoFocus type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <textarea className='pa2 mb1' placeholder='Details' value={details} onChange={(e) => setDetails(e.target.value)} />
                <input className='pa2 mb1'type='submit' value='submit' />
            </form>
        </div>
    )
}

import React, { useState } from 'react';
import { ADD, DETAILS, REFERENCES, REFERENCE } from '../constants';
import { Reference } from '../classes';
import { pushChanges, convertDateToMilliseconds  } from '../functions';
import { useMyStore } from '../store';
import { UploadItem, uploadNewReference } from '../api';
import { useNavigate } from 'react-router-dom';

export default function NewReference({ item, processorSubmit }) {

    const { addItem, updateItem } = useMyStore();

    const navigate = useNavigate();

    const [ name, setName ] = useState(() => item? item.name : '');
    const [ details, setDetails ] = useState('');


    function submitNewItem(event) {
        event.preventDefault();
        
        let r = new Reference(name, details );
        addItem(r);

        if(item){
            processorSubmit(r.id)
        } else {
        }
        
        navigate(`/References/${r.id}`);
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

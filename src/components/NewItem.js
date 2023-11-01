import React, { useState } from 'react';
import { INBOX, DETAILS,REFERENCE, ADD, EVENT, TASK, MISSION } from '../constants';
import { Item } from '../classes';
import NewTask from './NewTask';
import NewMission from './NewMission';
import NewReference from './NewReference';
import NewEvent from './NewEvent';
import { useNavigate } from 'react-router-dom';
import { useMyStore } from '../store';
import { uploadNewItem } from '../api';

export default function NewItem({  updateExp }) {

    const navigate = useNavigate();
    const { addItem } = useMyStore();

    const [ name, setName ] = useState('');
    const [ form, setForm ] = useState(INBOX);

    function reset(){
        //changeTitle(INBOX);
        setName('Enter item name');
        // setDescription('');
    }

    function submitNewItem(event) {
        if(name !== '' ){
            event.preventDefault();
            let i = new Item(name);
            addItem(i);
            uploadNewItem(i);
            reset();
            // updateExp(5);

            navigate(`/Inbox/${i.id}`);
        }
        event.preventDefault();
    }

    function uploadItem(item){

    }

    function displayTypeForm(){
        switch(form) {
            case TASK:
                return <NewTask updateExp={updateExp} />
            case MISSION:
                return <NewMission updateExp={updateExp} />
            case REFERENCE:
                return <NewReference updateExp={updateExp} />
            case EVENT:
                return <NewEvent updateExp={updateExp} />
            default:
                return (
                    <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
                        <h1 className='tc b gold f3'>NEW ITEM</h1>
                        <form onSubmit={submitNewItem} className='flex flex-column' title={INBOX}>
                            <input className='pa2 mb2' type='text' autoFocus onChange={(e)=> setName(e.target.value)} placeholder='Enter item name...'  />
                            {/* <textarea value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                            <input className='pa2 mb1' type='submit' value='submit' />
                        </form>
                    </div>
                )
        }
    }

    return (
        <div className='pa1 w-100 h-100'>
            <div className='pa1 w-100 flex justify-center'>
                <button className="f7 button w-20" onClick={(e)=> setForm(INBOX)}>INBOX</button>
                <button className="f7 button w-20" onClick={(e)=> setForm(TASK)}>TASK</button>
                <button className="f7 button w-20" onClick={(e)=> setForm(MISSION)}>MISSION</button>
                <button className="f7 button w-20" onClick={(e)=> setForm(EVENT)}>EVENT</button>
                <button className="f7 button w-20" onClick={(e)=> setForm(REFERENCE)}>REFERENCE</button>
                {/* <button className="button w-20" onClick={(e)=> changeTitle(e.target.value)}>FINANCE</button> */}
            </div>
                {displayTypeForm()}
        </div>
    )
}

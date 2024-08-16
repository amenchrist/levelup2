import React, { useState } from 'react';
import { PENDING, LOW, TASK, MEDIUM, HIGH, MISSIONS, ADD, DAILY, NONE, SOMEDAY } from '../constants';
import { pushChanges } from '../functions';
import DatePicker from './DatePicker';
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { Task } from '../classes/Task';
import Player from '../classes/Player';
import { Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';
import FormDialog from './Dialog';

export default function NewTask({  shipItems, itemID, db, title }) {

    const { addItem, updateItem } = useMyStore();
    const player = useMyStore(store => new Player(store.player));

    const navigate = useNavigate();

    const [ name, setName ] = useState('');
    const [ outcome, setOutcome ] = useState('');
    const [ details, setDetails ] = useState('');
    const [ dueDate, setDueDate ] = useState(null);
    const [ agentId, setAgentId ] = useState('');
    const [ priority, setPriority ] = useState('');
    const [ frequency, setFrequency ] = useState('NONE');
    const [ requirements, setRequirements ] = useState('');
    const [ associatedMissionID, setAssociatedMissionID ] = useState(itemID || null);
    const [ date, setDate ] = useState(dayjs().format('YYYY-MM-DD'));
    const [ time, setTime ] = useState(dayjs().format('hh:mm'));

    const [openScheduledDateDialog, setOpenScheduledDateDialog] = useState(false);
    console.log(dayjs())

    console.log(dayjs(`${date} ${time}`).format('dddd, MMMM DD @ hh:mm a'))


    function submitNewItem(event) {
        event.preventDefault();
        if(name.trim().length === 0) return

        let t = new Task({name, 
            outcome,  
            dueDate, frequency, details, requirements, 
            scheduledDate: dayjs(`${date}`).toDate().toString(),
            scheduledTime: time
        });
        console.log(t)

        addItem(t);
        updateItem(player.updateExp(5))
        if(title === MISSIONS){
            addToMissionTasks(t, associatedMissionID);
         }     
         navigate(`/tasks/${t.id}`);
    }

    function addToMissionTasks(task, projID){
        let id = parseInt(projID);
        let content = db.Missions;
        let proj;
        for (let i=0; i<content.length; i++){
            console.log(content[i].id)
            if (content[i].id === id){
                console.log(content[i].id)

                proj = content[i];
                proj.taskList.unshift(task.id);

                pushChanges("UPDATE", proj, "Missions", shipItems);
            }
        }
    }

    function setScheduledDate () {
        return
    }

      const DateAndTimePicker = () => {
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField required fullWidth type="date" id="date" label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6} >
                <TextField required fullWidth type="time" id="time" label="Time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Grid>
          </Grid>
        )
      }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc b gold f3'>NEW TASK</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={TASK}>
                <input className='pa2 mb1' type='text' autoFocus placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)} />
                <input  className='pa2 mb1'type='text' placeholder='Outcome' value={outcome} onChange={(e) => setOutcome(e.target.value)} />
                <textarea  className='pa2 mb1' placeholder='Details' value={details} onChange={(e) => setDetails(e.target.value)} />
                {/* <textarea  className='pa2 mb1' placeholder='Required Context' value={requiredContext} onChange={(e) => setRequiredContext(e.target.value)} /> */}
                {/* <label className='fw4 white' htmlFor="due date" >Due Date:</label> */}
                <div className='pa2' style={{padding: '15px 0', display: 'flex', }}>
                    <p style={{color: 'white'}} onClick={() => setOpenScheduledDateDialog(true)}>Scheduled Date: {dayjs(`${date} ${time}`).format('dddd, MMMM DD @ hh:mm')} </p>
                    <FormDialog open={openScheduledDateDialog} setOpen={setOpenScheduledDateDialog} 
                    title={'Scheduled Date'} msg={'When would you like to do this task?'} Content={<DateAndTimePicker />} actionText={'Save'} action={setScheduledDate}
                    />
                    {/* <DatePicker item={{}} date={dueDate} setDate={setDueDate} /> */}
                </div>
                {/* <input className='pa2 mb1' id='due date' type='date' min={today} value={dueDate} onChange={(e) => setDueDate(e.target.value)} /> */}
                {/* <select className='pa2 mb1' id="priority" value={frequency} onChange={(e)=> setFrequency(e.target.value)}>
                    <option value="" disabled defaultValue>Frequency</option>
                    <option value={NONE}>ONE-TIME</option>
                    <option value={DAILY}>DAILY</option>
                </select> */}
                <select className='pa2 mb1' id="priority" value={priority} onChange={(e)=> setPriority(e.target.value)}>
                    <option value="" disabled defaultValue>LOW</option>
                    <option value={NONE}>MEDIUM</option>
                    <option value={DAILY}>HIGH</option>
                    <option value={DAILY}>URGENT</option>
                </select>
                <textarea className='pa2 mb1' placeholder='Requirements' value={requirements} onChange={(e) => setRequirements(e.target.value)} />
                {/* <input className='pa2 mb1' type='text' placeholder='Assigned Agent' value={agent} onChange={(e)=> setAgent(e.target.value)} /> */}
                {/* <input type='text' placeholder='Frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                <input type='text' placeholder='Associated Mission name' value={associatedMission} onChange={(e) => setAssociatedMission(e.target.value)} /> */}
                <input className='pa2 mb1' type='submit' value='submit' />
            </form>
        </div>
    )
}

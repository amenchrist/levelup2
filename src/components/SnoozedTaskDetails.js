import React, { useState, useEffect } from 'react';
import TaskControls from './TaskControls';
import { COMPLETED, DETAILS, SOMEDAY, } from '../constants';
import Scroll from './Scroll';
import { useMyStore } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { Task } from '../classes/Task';
import Player from '../classes/Player';
import FormDialog from './Dialog';
import dayjs from 'dayjs';

export default function SnoozedTaskDetails({ title, activeSince, activeTask, db, shipItems, changeNav, exp }) {

    const id = useParams().id;
    const category = useParams().category.toUpperCase();
    const { tasks, missions, updateItem, someday } = useMyStore();
    const player = useMyStore(store => new Player(store.player));
    const MissionsList = missions;
    const navigate = useNavigate();

    let task = {};
    let relevantList = someday;

    // category === SOMEDAY ? relevantList = tasks.concat(missions) : relevantList = tasks;

    for (let i=0; i<relevantList.length; i++){
        if (relevantList[i].id === id){
           task =  relevantList[i];
           task = new Task({...task})
           break;
        }
    }

    let associatedMission = {};
    if(task.associatedMissionID === 0){
        associatedMission.name = "Getting Things Done";
    } else if (task.associatedMissionID > 0){
        for(let i=0; i<MissionsList.length; i++){
            if(task.associatedMissionID === MissionsList[i].id){
                associatedMission = MissionsList[i];
                //console.log('associated project name: ', associatedMission.name)
                break;
            }
        }
    }

    ///////////////////////////////////////////////////////

    const [ name, setName ] = useState(task.name);
    const [ scheduledDate, setScheduledDate ] = useState(task.scheduledDate);
    const [ outcome, setOutcome ] = useState(task.outcome);
    const [ priority, setPriority ] = useState(task.priority);
    const [ dueDate, setDueDate ] = useState(dayjs(task.dueDate).format('YYYY-MM-DD'));
    const [ timeRequired, setTimeRequired ] = useState(task.timeRequired);
    const [ details, setDetails ] = useState(task.details);
    const [ date, setDate ] = useState(dayjs(task.scheduledDate).format('YYYY-MM-DD'));
    const [ time, setTime ] = useState(task.scheduledTime);
    const [ requirements, setRequirements ] = useState(task.requirements);
    const [ isSnoozed, setIsSnoozed ] = useState(task.isSnoozed || false);
    const [ status, setStatus ] = useState(task.status);

    const [openDialog, setOpenDialog] = useState(false);
    const [openScheduledDateDialog, setOpenScheduledDateDialog] = useState(false);

    useEffect(() => {
      //For switching between tasks in a list
      setName(task.name);
        setScheduledDate(task.scheduledDate);
        // setDate(dayjs(task.scheduledDate).format('YYYY-MM-DD'))
        setOutcome(task.outcome);
        setDetails(task.details);
        setDueDate(dayjs(task.dueDate).format('YYYY-MM-DD'));
        setRequirements(task.requirements)
        setPriority(task.priority)
    }, [task.name, task.scheduledDate, task.outcome, task.details, task.dueDate, task.timeSpent, activeSince, activeTask, task.id, db?.lastUpdated, task.requirements ])

    function updateDB( obj, property, newVal) {

        if (obj[property] !== newVal){
            // console.log(`old value (${obj[property]}) !== new value (${newVal})`)
            obj[property] = newVal;

            updateItem(obj)
            updateItem(player.updateExp(1))
            
        }
    }

    // console.log(dueDate)

    function saveDate(date){
      updateDB( task, "dueDate", date )
    }
    function saveDueDate(){
      updateDB( task, "dueDate", dayjs(`${dueDate}`).toDate().toString() )
    }
    function updateScheduledDate(){
      const newDate = dayjs(`${date}`).toDate().toString()
      updateDB( task, "scheduledTime", time );
      updateDB( task, "scheduledDate", newDate );
    }

    function updatePriority(){
      updateDB( task, "priority", parseInt(priority) );
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

    const changeStatus = (e) => {
      updateDB(task, "status", e.target.value);  
      if(e.target.value === 'SNOOZED'){
        navigate(`/tasks/`)
      } else {
        navigate(`/Someday/`)
      }
    }

    switch (title){
      case COMPLETED:
      break;    
      default:
        return (
          <>
          <div className='h-100' >
            <Scroll>
              <div className='w-100 pb3 pt3'>
              {/* <TextField fullWidth label="Email Address"  variant="outlined" value={name} sx={{ fontSize: '30px',p: 1}} /> */}
                <textarea rows="2" cols="30" wrap='hard' 
                onChange={(e)=> {setName(e.target.value);} } 
                onBlur={() => { updateDB(task, "name", name ) } } 
                value={name} className='bn fw9 b white bg-transparent pa1'
                />
                <div className='w-100flex justify-between'>
                  <h5 className='fw3 white pb1' onClick={() => setOpenScheduledDateDialog(true)}>Scheduled for: {dayjs(`${date} ${time}`).format('dddd, MMMM DD @ hh:mm a')} </h5>
                  <FormDialog open={openScheduledDateDialog} setOpen={setOpenScheduledDateDialog} 
                    title={'Scheduled Date'} msg={'When would you like to do this task?'} Content={<DateAndTimePicker />} actionText={'Save'} action={updateScheduledDate}
                    />
                  {/* <h5 className='fw3 white pb2'>Time: {task.scheduledTime} </h5> */}
                </div>
                <div className='w-100 pb1 flex justify-between'>
                  <div className='w-100 1 flex items-center'>
                    <h5 className='fw3 white'>Time Required (mins):</h5>
                    <input className='pl2 bn white bg-transparent'style={{width:50}} type='number' min={5} step={5} value={timeRequired} 
                    onChange={(e) => setTimeRequired(e.target.value)} 
                    onBlur={() =>{ updateDB(task, "timeRequired", timeRequired )}}
                    />
                  </div>                
                  {/* <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5> */}
                </div>
                  <div className='flex justify-between' >
                    <h5 className='fw3 white' onClick={() => setOpenDialog(true)}>DUE: {dayjs(`${dueDate}`).format('dddd, MMMM DD @ hh:mm a')}</h5>
                    <FormDialog open={openDialog} setOpen={setOpenDialog} 
                    title={'Due Date'} msg={'What day is this due?'} 
                    Content={<Grid item xs={12} sm={6}><TextField required fullWidth type="date" id="date" label="Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></Grid>} 
                    actionText={'Save'} action={saveDueDate}
                    />
                    {/* <DatePicker item={task} date={dueDate} setDate={saveDate} /> */}
                  </div>
                  <div className='w-100 1 flex items-center'>
                    <h5 className='fw3 white'>Priority Rating:</h5>
                    <input className='pl2 bn white bg-transparent'style={{width:50}} type='number' min={0} value={priority} 
                    onChange={(e) => setPriority(e.target.value)} onBlur={updatePriority}
                    />
                  </div>  
                             
              </div>
              {/* <div className='w-100 pb3'>
                <h5 className='fw3 white'>Mission: </h5>
                <h4 className='fw5 white' onClick={() => {if(task.associatedMissionID != 0){changeNavigation(task.associatedMissionID, MISSIONS)}}} >{associatedMission.name}</h4>
              </div> */}
        
              <div className='w-100 pb2'>
                <h5 className='fw3 white'>Outcome: </h5>
                <textarea rows="2" cols="45" onChange={(e)=> {setOutcome(e.target.value);} } onBlur={() =>{ updateDB(task, "outcome", outcome ) }} value={outcome} className='w-80 fw3 white bn bg-transparent' />
              </div>
              {/* <div className='w-100 pb3 flex justify-between'>
                <Timer timeSpent={task.timeSpent} task={task} />
                <input type='date' defaultValue={dueDate} onChange={(e)=> {setDueDate(e.target.value);} } onBlur={() =>task.dueDate=dueDate} className='fw3 white bn bg-transparent' />
              </div> */}
              
              {/* <div className='w-100 pl2 pb3 flex justify-between'>                    
                <h5 className='fw3 white'>Time Required: {task.timeRequired}</h5>
                <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5>
              </div> */}
              <div className=''>
                <h5 className='bb b--white pb2 fw3 white b' >Details</h5>
                <div className='pa2'>
                  {/* <p className='fw3 white'>{task.note}</p> */}
                  <textarea rows="2" cols="45" onChange={(e)=> {setDetails(e.target.value);} } onBlur={ () =>{ updateDB(task, "details", details )}} value={details} className='fw3 white bn bg-transparent' />
                </div>
              </div>
              <div className='pb2'>
                <h5 className='bb b--white pb2 fw3 white b' >Requirements</h5>
                <div className='pa2'>
                  {/* <p className='fw3 white'>{task.note}</p> */}
                  <textarea rows="2" cols="45" onChange={(e)=> {setRequirements(e.target.value);} } onBlur={ () =>{ updateDB(task, "requirements", requirements )}} value={requirements} className='fw3 white bn bg-transparent' />
                </div>
              </div>
              <FormControl variant="filled" sx={{backgroundColor: 'white', width: '50%', mb: 5}} >
                <InputLabel >Status</InputLabel>
                <Select value={status} onChange={changeStatus} >
                  <MenuItem value={'PENDING'}>PENDING</MenuItem>
                  <MenuItem value={'PAUSED'}>PAUSED</MenuItem>
                  <MenuItem value={'READY'}>READY</MenuItem>
                  <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
                  <MenuItem value={'ONGOING'}>ONGOING</MenuItem>
                  <MenuItem value={'DONE'}>DONE</MenuItem>
                  <MenuItem value={'SNOOZED'}>SNOOZED</MenuItem>
                </Select>
              </FormControl>
       
            </Scroll>
            <TaskControls task={task} position={''} />
          </div>
          </>
            );
    }
}

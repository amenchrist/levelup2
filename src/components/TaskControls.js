import React from 'react';
import { DONE, ACTIVE, PAUSED, PENDING, UPDATE, ADD, REMOVE, COMPLETED } from '../constants';
import { useMyStore } from '../store';
import Player from '../classes/Player';
import { useNavigate } from 'react-router-dom';
import { reSchedule } from '../functions';


export default function TaskControls({ task, updateExp, timerOn }){

    const { updateItem, activeTask, setActiveTask, } = useMyStore()
    const player = useMyStore( store => new Player(store.player));
    const navigate = useNavigate();

    

    if( task.status === ACTIVE && timerOn === false){
        startTimer();
        console.log("Timer is off")
    }

    function updateTask(){
        updateItem(task)
    }
    
    let prevTimeSpent = parseInt(task.timeSpent);
    function startTimer(){
        task.status = ACTIVE;
        if (task.activeSince === 0 ){
            task.activeSince = new Date().getTime();
        }
        setActiveTask(task);
        updateItem(task);
    }

    function pauseTask(){
        // const dateNow = new Date().getTime();
        // task.timeSpent = prevTimeSpent + (dateNow - parseInt(activeSince));
        // setActiveTask({});
        // task.status = PAUSED;
        // task.activeSince = 0;
        // timerOn = false;
        // updateTask();

    }

    function markAsDone(){
        const dateNow = new Date().toString()
        task.doneDate = dateNow;
        if (task.status === ACTIVE) {
            pauseTask();
        }
        task.status = DONE;
        setActiveTask({});
        player.updateExp(20);
        updateItem(task);
        updateItem({...player})

        navigate(`/completed/${task.id}`)
    }

    switch(task.status){
        case ACTIVE:
            //console.log(activeTask.id === true)
            return (
                <div className='flex justify-center'>
                    <button className="button" onClick={pauseTask}>PAUSE</button>
                    <button className="button" onClick={markAsDone}>MARK DONE</button>
                </div>
            )
        case PAUSED:
            if (activeTask.id === undefined){

                return (
                    <div className='flex justify-center'>
                        <button className="button" onClick={startTimer}>CONTINUE</button>
                        <button className="button" onClick={markAsDone}>MARK DONE</button>
                    </div>
                )
            }
            break;
        case PENDING:
            if(activeTask?.id === undefined) {
                return (
                    <>
                        <div className='flex justify-center'>
                            <button className="button" onClick={startTimer}>START</button>
                            {/* <button className="button" onClick={pauseTask}>PAUSE</button> */}
                        </div>
                        <br />
                        <div className='flex justify-center'>
                            <button className="button" onClick={() => reSchedule(task, updateItem)}>RESCHEDULE</button>
                            <button className="button" onClick={markAsDone}>COMPLETED</button>
                        </div>
                    </>
                )
            } else {
                return (
                    <div>
                    </div>)
            }
        default:
            return <div></div>
    }
}


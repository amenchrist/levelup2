import React from 'react';
//import { TaskList } from '../TaskList';
import { DONE, ACTIVE, PAUSED, PENDING, UPDATE, ADD, REMOVE, COMPLETED } from '../constants';
import { pushChanges  } from '../functions';


export default function TaskControls({ task, position, changeNav, updateExp, changeItemID, setActiveTask, activeSince, activeTask, shipItems, db, timerOn }){

    if( task.status === ACTIVE && timerOn === false){
        startTimer();
        console.log("Timer is off")
    }

    function updateTask(){
        pushChanges(UPDATE, task, "Tasks", shipItems);
    }
    
    let prevTimeSpent = parseInt(task.timeSpent);
    function startTimer(){
        task.status = ACTIVE;
        if (task.activeSince === 0 ){
            task.activeSince = new Date().getTime();
        }
        setActiveTask(task);
        updateTask();
    }

    function pauseTask(){
        const dateNow = new Date().getTime();
        task.timeSpent = prevTimeSpent + (dateNow - parseInt(activeSince));
        setActiveTask({});
        task.status = PAUSED;
        task.activeSince = 0;
        timerOn = false;
        updateTask();

    }

    function markAsDone(){
        const dateNow = new Date().toISOString().substr(0, 10);
        task.doneDate = dateNow;
        if (task.status === ACTIVE) {
            pauseTask();
        }
        task.status = DONE;
        setActiveTask({});
        updateExp(task.exp);
        updateTask();

        const nav = {
            title: COMPLETED,
            view: "DETAILS",
            ID: task.id
        }
        changeNav(nav);
    }

    function rescheduleTask () {

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
        case PENDING:
            if(activeTask?.id === undefined) {
                return (
                    <>
                        <div className='flex justify-center'>
                            <button className="button" onClick={startTimer}>START</button>
                            <button className="button" onClick={pauseTask}>PAUSE</button>
                        </div>
                        <br />
                        <div className='flex justify-center'>
                            <button className="button" onClick={rescheduleTask}>RESCHEDULE</button>
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


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
    //console.log("on entering task cont, prevtime: ", prevTimeSpent)
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
        //console.log("previos time spent:, ", prevTimeSpent)
        //console.log("time spent:, ", task.timeSpent)
    }

    function markAsDone(){
        const dateNow = new Date().toISOString().substr(0, 10);
        task.doneDate = dateNow;
        if (task.status === ACTIVE) {
            pauseTask();
        }
        task.status = DONE;
        //console.log("timespent from task controls: ", prevTimeSpent)
        //parseInt(prevTimeSpent) === 0 ? task.timeSpent = 0 : task.timeSpent = prevTimeSpent + (dateNow - parseInt(activeSince));
        //console.log("timespent from task controls after: ", task.timeSpent)
        setActiveTask({});
        updateExp(task.exp);
        updateTask();
        //db.Completed.unshift(task);
        //pushChanges(ADD, task, "Completed", shipItems);
        //db.Tasks.splice(position,1);
        //pushChanges(REMOVE, task, "Tasks", shipItems);
        const nav = {
            title: COMPLETED,
            view: "DETAILS",
            ID: task.id
        }
        changeNav(nav);
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
            //console.log(typeof activeTask)
            //console.log(activeTask.id)
            if(activeTask.id === undefined) {
                return (
                    <div className='flex justify-center'>
                        <button className="button" onClick={startTimer}>START</button>
                        <button className="button" onClick={markAsDone}>MARK DONE</button>
                    </div>
                )
            } else {
                return (
                    <div>
                    </div>)
            }   
        default:
            return <div></div>
    }
    // Different controls are displayed based on if a task is ongoing
}


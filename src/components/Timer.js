import React, { useState, useEffect } from 'react';
import './Timer.css';
// import { UpdateTaskStatus, SetActiveTask } from '../actions';

 export default function Timer({ timeSpent, task, activeTask, activeSince, timeNow }){


    if (task.id === parseInt(activeTask.id) ){
        const dateNow = (new Date()).getTime();
        timeSpent = timeSpent + (dateNow - activeSince);
    }
    //console.log('time spent = '+timeSpent)

    let s = timeSpent;
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;

    const [seconds, setSeconds] = useState(secs);
    const [minutes, setminutes] = useState(mins);
    const [hours, sethours] = useState(hrs);
    const [isActive, setIsActive] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    

    // let totalTimeSpent = (seconds*1000)+(minutes*60*1000)+(hours*3600*1000); //Time spent in milliseconds



    // function reset() {
    //     setSeconds(0);
    //     setminutes(0);
    //     sethours(0);
    //     setIsActive(false);
    // }

    useEffect(()=>{
        setSeconds(secs);
        setminutes(mins);
        sethours(hrs);
        if (task.id !== parseInt(activeTask.id) ){
            setIsUpdated(false);
            setIsActive(false)
        }
    },[ secs, mins, hrs, activeTask.timeSpent, activeTask.id, activeSince, task.id ])


    if( (task.id === parseInt(activeTask.id)) && isActive === false){
        setIsActive(true);
    }

    useEffect(() => {
        let interval = null;
        if ( isActive && (task.id === parseInt(activeTask.id)) ) {
        interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            if(seconds >= 59){
                setminutes(minutes => minutes +1);
                setSeconds(0);
                if(minutes >= 59){
                    sethours(hours => hours +1);
                    setminutes(0);
                }
            }
        }, 1000);
        } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
        }
        
        return () => clearInterval(interval);
        
    }, [ isActive, seconds, minutes, hours, isUpdated, activeTask.id, task.id ]);


    switch(task.id){
        case activeTask.id:
            return (
                <div className="">
                    <h5 className='fw3 white b'>Time Spent: 
                        <span className='fw3 yellow b'> {hours.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                        {minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                        {seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})} 
                        </span>
                    </h5>
                </div>
            );
        default:
            return (
                <div className="">
                <div className="">
                    <h5 className='fw3 white b'>Time Spent: {hours.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                    {minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                    {seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})} </h5>
                </div>
                {/* <div className="">
                    <button className='' onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
                    <button className='' onClick={reset}>Reset</button>
                </div> */}
                </div>
            );
    }
};

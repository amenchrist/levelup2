import React, { useState, useEffect } from 'react';
import { ASAP, MISSIONS, NEW, SOMEDAY } from '../constants';
import { convertDateToMilliseconds, pushChanges } from '../functions';


export default function DatePicker({ item, dueDate, db, title, updateFunc, view }){

    let DbList = ''
    switch (title) {
        case MISSIONS:
            default:
    }

    // REASSIGN DUE DATE TO FIX "ASAP" DATE FORMAT ISSUES
    let dateValue;
    //dueDate === ASAP ? dateValue = new Date().getTime() : dateValue = dueDate;
    dueDate === ASAP ? dateValue = new Date().toISOString().substr(0, 10) : dateValue = dueDate;

    // CONVERT DATE STRING TO MILLISECONDS
    //const [ date, setDate ] = useState((new Date(dateValue)).toISOString().substr(0, 10));
    const [ date, setDate ] = useState((dateValue));
    const [ changeDate, setChangeDate ] = useState(false);
    const [ isASAP, setIsASAP ] = useState(false);
    const [ isSomeday, setIsSomeday ] = useState(false);
    
    //   let str = "2020-10-26";
    //   console.log(prepareDate(str));

    useEffect(() => {
        //view === NEW ? setChangeDate(true) : setChangeDate(false) ;
        setChangeDate(false)
        // setDate((new Date(dateValue)).toISOString().substr(0, 10));
        setDate((dateValue));
        // setChangeDate(false);
        if (dueDate === ASAP){
            setIsASAP(true)
        } else {
            setIsASAP(false)
        }
    }, [dueDate, ASAP])

    switch(changeDate){
        case true:
            console.log("Current task ", item)
            console.log("Current task.dueDate ", dueDate)
            console.log("Current date: ", date)
            console.log("Current dateValue: ", dateValue)
            return (
                <div>
                    <input type='date' className='fw3 white bn bg-transparent' autoFocus
                    defaultValue={date}
                    onChange={(e)=> {console.log(e.target.value);setDate(e.target.value);} } 
                    onBlur={() =>{}} 
                    />
                    <div>
                        <button className="button" onClick={() => { 
                            updateFunc(ASAP); setIsASAP(true); 
                            setChangeDate(false) 
                        }}>A.S.A.P</button>
                        <button className="button" onClick={() => { 
                            updateFunc(SOMEDAY);
                            setChangeDate(false); setIsSomeday(true) 
                        }}>SOMEDAY</button>
                        <button className="button" onClick={() => { 
                            //updateFunc(convertDateToMilliseconds(date));
                            updateFunc(date);
                            setChangeDate(false); setIsASAP(false) 
                        }}>Save</button>
                    </div>
                </div>
            )
        default:
            if (isASAP){
                return (
                    <div>
                        <h5 className='fw4 white' onClick={() => setChangeDate(true)}>ASAP</h5>
                    </div>
                    )
            } else if (isSomeday) {
                return (
                    <div>
                        <h5 className='fw4 white' onClick={() => setChangeDate(true)}>SOMEDAY</h5>
                    </div>
                    )
            } else {
                return (
                    <h5 className='fw4 white' onClick={() => setChangeDate(true)}>{date}</h5>
                )
            }
    }
}
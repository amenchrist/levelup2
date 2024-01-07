import React, { useState, useEffect } from 'react';
import { ASAP, MISSIONS, NEW, SOMEDAY } from '../constants';


export default function DatePicker({ item, date, title, setDate }){

    switch (title) {
        case MISSIONS:
            default:
    }

    // CONVERT DATE STRING TO MILLISECONDS
    const [ localDate, setLocalDate ] = useState(() => { 
        if (date === null) {
            return null
        } else{
            return new Date(date).toISOString().substr(0, 10)
        }
    } );
    const [ changeDate, setChangeDate ] = useState(false);
    const [ isASAP, setIsASAP ] = useState(false);
    const [ isSomeday, setIsSomeday ] = useState(false);


    useEffect(() => {
        if(localDate){
            const year = parseInt(localDate.substring(0,4));
            const month = parseInt(localDate.substring(0,4))-1;
            const day = parseInt(localDate.substring(8,10));
            setChangeDate(false)
            setDate(new Date(year, month, day))
        }
        console.log(localDate);

    }, [localDate])

    switch(changeDate){
        case true:
            return (
                <div style={{paddingLeft: '5px'}}>
                    <input type='date' className='fw3 white bn bg-transparent' autoFocus
                    defaultValue={localDate}
                    onChange={(e)=> {
                        setLocalDate(e.target.value);
                        setIsSomeday(false) ;
                        setIsASAP(false); 
                    } } 
                    onBlur={() =>{}} 
                    />
                    <div>
                        <button className="button" onClick={() => { 
                            //Scheduler sets the localDate to first avaialable slot
                            setIsASAP(true); 
                            setChangeDate(false) 
                        }}>A.S.A.P</button>

                        <button className="button" onClick={() => { 
                            //Schedule for first available slot in the next year
                            setIsSomeday(true) ;
                            setChangeDate(false); 
                        }}>SOMEDAY</button>

                        <button className="button" onClick={() => { 
                            setDate(localDate);
                            setChangeDate(false); 
                            setIsASAP(false) 
                        }}>Save</button>
                    </div>
                </div>
            )
        default:
            if (isASAP){
                return (
                    <div style={{paddingLeft: '5px'}} >
                        <h5 className='fw4 white' onClick={() => setChangeDate(true)}>ASAP</h5>
                    </div>
                    )
            } else if (localDate === null) {
                return (
                    <div style={{paddingLeft: '5px'}} >
                        <h5 className='fw4 white' onClick={() => setChangeDate(true)}>N/A</h5>
                    </div>
                    )
            } else {
                return (
                    <div style={{paddingLeft: '5px'}} >
                        <h5 className='fw4 white' onClick={() => setChangeDate(true)}>{localDate}</h5>
                    </div>
                )
            }
    }
}
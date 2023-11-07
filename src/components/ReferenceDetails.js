import React, { useState, useEffect } from 'react';
import { useMyStore } from '../store';
import { useParams } from 'react-router-dom';

export default function ReferenceDetails() {

    const id = useParams().id;
    console.log(id)
    const { references } = useMyStore()
    const ReferenceList = references;
    let reference = {};

    for (let i=0; i<ReferenceList.length; i++){

        if (ReferenceList[i].id === id){
           reference = ReferenceList[i];
           break;
        }
    }

    console.log("reference: ", reference)

    const [ name, setName ] = useState(reference.name);
    const [ details, setDetails ] = useState(reference.details);

    useEffect(() => {
        setName(reference.name);
        setDetails(reference.details);
        
    }, [ reference.name, reference.details])

    function updateDB( obj, property, newVal) {

        // if (obj[property] !== newVal){

        //     console.log(`old value (${obj[property]}) !== new value (${newVal})`)

        //     obj[property] = newVal;
        //     amendList(db, REFERENCES, reference, UPDATE, shipItems, exp)
          
        // }

    }

    return (
        <div >
            <div>
                <div className='w-100 pa2 pb3' >
                    {/* <h3 className='fw7 b white pb2'>{reference.name}</h3> */}
                    <input type='text' 
                    className='bn fw7 b white bg-transparent'
                    value={name} 
                    onChange={(e)=> {setName(e.target.value);} } 
                    onBlur={() => {updateDB(reference, "name", name )} }  
                    />
                    <h5 className='fw3 white'>{reference.type}</h5>
                </div>
                <div className='pa2'>
                    <textarea rows="4" cols="45" 
                    onChange={(e)=> {setDetails(e.target.value);} } 
                    onBlur={ () =>{ updateDB(reference, "details", details ) }} 
                    value={details} 
                    className='fw3 white bn bg-transparent' />
                </div>
            </div>
        </div>
    );
}

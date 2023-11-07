import React, { useState } from 'react';
import Processor from '../containers/Processor'
import NewItemButton from '../components/NewItemButton';
import { useMyStore } from '../store';


export default function ItemDetails({ id, touchFunction }) {

    const { inbox, processorOn, setProcessorOn } = useMyStore();

    // NOTE: PREV AND NEXT BUTTONS INCLUDED HERE SO THEY ARE HIDDEN DURING PROCESSING
    const [ readyToProcess, setReadyToProcess ] = useState(false);

    let item = {};
    let nextItemID = null;
    let indx;

    for (let i=0; i<inbox.length; i++){

        if (inbox[i].id === id){
           item = inbox[i];

           indx = i;
           if (inbox[i+1]) {
               nextItemID = inbox[i+1].id;
           } else {
            nextItemID = 0;
           }
           break;
        }    
    }

    if (item.name) {
        return (
            <div className='h-100' >
                <h5 className='white b pb2'>{item.name}</h5>
                <h5 className='white pb2'>Entry Date: {(new Date(item.entryDate)).toISOString().substr(0, 10)} </h5>
                <h5 className='white pb2'>Status: {item.status} </h5>
                <br />
                <Processor item={item} nextItemID={nextItemID} itemIndex={indx} />
                <NewItemButton />
                {/* <div className='h-80 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column ' >
                    <button onClick={()=> setProcessorOn(true)} >PROCESS THIS</button>
                </div> */}
            </div>
        )
    }
    
}

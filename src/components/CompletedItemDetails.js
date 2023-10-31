import React from 'react';
import { ASAP, DETAILS, MISSIONS } from '../constants';
import { calculateTime } from '../functions';


export default function CompletedItemDetails({ MissionsList, changeNav,  item }) {

    //GET THE ASSOCIATED Mission NAME
    console.log("reached completed stage");
    let associatedMission = {}
    if(item.associatedMissionID === 0){
        associatedMission.name = "Getting Things Done";
    } else if (item.associatedMissionID > 0){
        for(let i=0; i<MissionsList.length; i++){
            if(parseInt(item.associatedMissionID) === parseInt(MissionsList[i].id)){
                associatedMission = MissionsList[i];
                console.log('associated Mission name: ', associatedMission.name)
                break;
            }
        }
    }

    function changeNavigation(id, title){
       
        let nav = {
            title: title,
            view: DETAILS,
            ID: id
        }
        changeNav(nav);        
    }

    console.log("completed" ,item)
    
    return (
        <div className='' >
            <div>
                <div className='w-100 pa2 pb3' >
                    <h3 className='fw7 b white pb2'>{item.name}</h3>
                    <h4 className='fw1 white'>{item.requiredContext}</h4>
                    
                </div>

                <div className='w-100 pl2 pb3'>
                    <h5 className='fw3 white'>Mission: </h5>
                    <h4 className='fw5 white' onClick={() => {
                        if(item.associatedMissionID !== 0){changeNavigation(item.associatedMissionID, MISSIONS)}}}>{associatedMission.name}</h4>
                </div>

                <div className='w-100 pl2 pb3'>
                    <h5 className='fw3 white'>Outcome: </h5>
                    <h5 className='fw3 white'>{item.outcome} </h5>
                </div>
                <div className='w-100 pl2 pb3 flex justify-between'>
                    <h5 className='fw3 white'>Time Spent: {calculateTime(item.timeSpent)}</h5>
                    <h5 className='fw3 white'>Due Date: {item.dueDate === ASAP ? ASAP : item.dueDate} </h5>
                </div>
                <div className='w-100 pl2 pb3 flex justify-between'>
                    <h5 className='fw3 white'>COMPLETED: {(item.doneDate)} </h5>
                </div>
                <div className='w-100 pl2 pb3 flex justify-between'>           
                    {/* <h5 className='fw3 white'>Time Required: {task.timeRequired}</h5>
                    <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5> */}
                </div>
                <h5 className='fw3 white'>Status: {item.status}</h5>
                <h5 className='bb b--white pa2 fw3 white b' >NOTE</h5>
                <div className='pa2'>
                    <p className='fw3 white'>{item.note}</p>
                </div>
            </div>
        </div>
    )
}

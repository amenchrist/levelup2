import React from 'react';
import { DETAILS, LIST, MISSION_TASKS, MISSIONS } from '../constants';

export default function BackButton({ changeItemID, changeNav, missionID, title, previousTitle, previousView, previousItemID }) {

    function goBack(){

        let navID = 0;
        let navView = LIST;

        if(title === MISSION_TASKS) {
            title = MISSIONS;
            navID = missionID;
            navView = DETAILS;
        };

        let nav = {
            title: title,
            view: navView,
            ID: navID
        }
        //changeItemID(id);
        // changeNav(nav);
        
    }
    return (
        <div className='whiteB w3 h3 flex items-center justify-center' onClick={goBack}>
            <h1 className=' white b f8 fw9 ma0'>&lt;</h1>
        </div>
    )
}
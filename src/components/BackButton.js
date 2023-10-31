import React from 'react';
import { DETAILS, LIST, MISSION_TASKS, MISSIONS } from '../constants';
import { useNavigate, useParams } from 'react-router-dom';

export default function BackButton({  missionID, title }) {

    const navigate = useNavigate();
    const { category } = useParams();

    function goBack(){

        navigate(`/${category}`)

        let navID = 0;
        let navView = LIST;

        if(title === MISSION_TASKS) {
            title = MISSIONS;
            navID = missionID;
            navView = DETAILS;
        };

      
    }
    return (
        <div className='whiteB w3 h3 flex items-center justify-center' onClick={goBack}>
            <h1 className=' white b f8 fw9 ma0'>&lt;</h1>
        </div>
    )
}
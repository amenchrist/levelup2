import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyStore } from '../store';
import { ASAP, DONE, LIST, TASK, TODAY } from '../constants';

export default function TodaysMission() {

    const navigate = useNavigate();
    const content = useMyStore(store => store.today)

    return (
        <div className='flex items-center justify-center h-100 w-100 center bg-white pa1' onClick={() => navigate(`/TODAY`)}>
            <h2 className='tc'>Today's<br />Mission<br />({content.length})</h2>
        </div>
    );
}

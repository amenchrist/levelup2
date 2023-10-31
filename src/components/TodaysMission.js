import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyStore } from '../store';
import { ASAP, DONE, LIST, TASK, TODAY } from '../constants';

export default function TodaysMission({ touchFunction, db }) {

    const navigate = useNavigate();
    const content = useMyStore(store => store.tasks)

    let filteredContent = content.filter((entry) => ((entry.type === TASK) && (entry.dueDate !== ASAP) && ( entry.dueDate === new Date().toISOString().substr(0, 10) ) && entry.status !== DONE ));

    return (
        <div className='flex items-center justify-center h-100 w-100 center bg-white pa1' data-view={LIST} title={TODAY} onClick={touchFunction}>
            <h2 className='tc'>Today's<br />Mission<br />({filteredContent.length})</h2>
        </div>
    );
}

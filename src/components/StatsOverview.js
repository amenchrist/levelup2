import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OVERVIEW } from '../constants';
import { useMyStore } from '../store';
// import ActiveTaskTimer from './ActiveTaskTimer';
// import SyncStatusDot from './SyncStatusDot';
// import { UpdateTaskStatus, SetActiveTask, selectItem } from '../actions';


export default function StatsOverview() {

    const {user} = useMyStore();

    const navigate = useNavigate()

    return (
        <article className="h-100 w-100 center bg-white pa2 " data-view={OVERVIEW} title = "STATS" onClick={() => navigate('/Stats')}>
            {/* <SyncStatusDot /> */}<sup>.</sup>
            <div className="tc w-100 h-100">
                <h1 className="f2 mb0 ">{user.name}</h1>
                <h3 className="f6 pa1 gray ">{user.job}</h3>
                <h3 className="f6 pa1 gray ">Rank: {user.rank}</h3>
                <h4 className="f6 gray ">Exp: {user.exp}</h4>
                {/* <ActiveTaskTimer /> */}
            </div>
        </article>  
    );
}



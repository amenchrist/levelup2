import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OVERVIEW } from '../constants';
// import ActiveTaskTimer from './ActiveTaskTimer';
// import SyncStatusDot from './SyncStatusDot';
//import React, { useState, useEffect } from 'react';

// import { connect } from 'react-redux';
// import { UpdateTaskStatus, SetActiveTask, selectItem } from '../actions';


export default function StatsOverview({ exp }) {

    const navigate = useNavigate()

    return (
        <article className="h-100 w-100 center bg-white pa2 " data-view={OVERVIEW} title = "STATS" onClick={() => navigate('/stats')}>
            {/* <SyncStatusDot /> */}<sup>.</sup>
            <div className="tc w-100 h-100">
                <h1 className="f2 mb0 ">Amen Christ</h1>
                <h3 className="f6 pa1 gray ">Engineer</h3>
                <h4 className="f6 gray ">Exp: {exp}</h4>
                {/* <ActiveTaskTimer /> */}
            </div>
        </article>  
    );
}



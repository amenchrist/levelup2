import React from 'react';
import { OVERVIEW } from '../../constants';

export default function StatsButton({ touchFunction }) {
    return (
        <div className='w-20 center bg-white b--black-10 ba flex items-center justify-center' data-view={OVERVIEW} title="STATS" onClick={touchFunction}>
            <h3 className='tc'>S</h3>
        </div>       
    )
}


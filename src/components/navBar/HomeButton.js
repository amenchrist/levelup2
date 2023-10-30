import React from 'react';
import { HOME, OVERVIEW } from '../../constants';

export default function HomeButton({ touchFunction }) {
    return (
        <div className='w-20 center bg-white b--black-10 ba flex items-center justify-center' data-view={OVERVIEW}  title={HOME} onClick={touchFunction}>
            <h3 className='tc'>H</h3>
        </div>       
    )
}


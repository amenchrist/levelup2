import React from 'react';
import { LIST, MISSIONS } from '../../constants';

export default function MissionsButton({touchFunction}) {
    return (
        <div className='w-20 center bg-white ba b--black-10 flex items-center justify-center' data-view={LIST}  title={MISSIONS} onClick={touchFunction}>
            <h3 className='tc'>M</h3>
        </div>       
    )
}


import React from 'react';
import { LIST } from '../../constants';

export default function InboxButton({ touchFunction }) {
    return (
        <div className='w-20 center bg-white b--black-10 ba flex items-center justify-center' data-view={LIST}  title="INBOX" onClick={touchFunction}>
            <h3 className='tc'>I</h3>
        </div>       
    )
}


import React from 'react';
import { NEW } from '../constants';

export default function NewItemButton({ changeView }) {

    return (
        <div className='whiteB w2 h2 flex items-center justify-center' data-view={NEW} onClick={ () => changeView(NEW)}>
            <h1 className=' white b f8 fw9 ma0'>+</h1>
        </div>
    )
}

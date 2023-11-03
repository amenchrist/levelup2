import React from 'react';
import { NEW } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function NewItemButton() {

    const navigate = useNavigate();    

    return (
        <div className='whiteB w2 h2 flex items-center justify-center' data-view={NEW} onClick={ () =>navigate(`/new`)}>
            <h1 className=' white b f8 fw9 ma0'>+</h1>
        </div>
    )
}

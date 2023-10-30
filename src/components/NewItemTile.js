import React from 'react';
import { NEW, NEW_ITEM } from '../constants'
import { useNavigate } from 'react-router-dom';

export default function NewItemTile({ touchFunction }) {

    const navigate = useNavigate()
    return (
        <div className='bg-white h-100 center w-100 flex items-center justify-center' data-view={NEW} title={NEW_ITEM} onClick={touchFunction}>
            <div className='tc '>
                <h3 className='' >Add New Item</h3>
            </div>
        </div>
    )
}
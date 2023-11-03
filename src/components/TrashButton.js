import React, { useEffect, useState } from 'react';
import trashCan from '../assets/trash1600.png';
import { PAUSED } from '../constants';
import { useMyStore } from '../store';
import { useNavigate, useParams } from 'react-router-dom';

export default function TrashButton({ shipItems, changeNav, id }) {

    const { category } = useParams();
    const title = category.toUpperCase();
    const currentList = useMyStore(store => store[title.toLowerCase()]);
    const { updateItem } = useMyStore();

    const navigate = useNavigate();

    let  indx, currentItem;
    for (let i=0; i<currentList.length; i++){

        if (currentList[i].id === id){
            currentItem = currentList[i];
            indx = i;
            break;
        }

    }

    function trashItem() {
        console.log('trash button clicked');
        console.log("current trash item: ", currentItem)
        if (currentItem.status === "ACTIVE"){currentItem.status = PAUSED }
        currentItem.isTrashed = true;
        currentItem.trashedDate = new Date().toISOString().substr(0, 10);
        updateItem(currentItem);        
        navigate(`/${category}`);
    }


    return (
        <div>
            <img src={trashCan} alt='trash icon' className='h2' onClick={() => {trashItem()}} />
        </div>
    )
}
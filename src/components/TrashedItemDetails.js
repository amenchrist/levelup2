import React from 'react';
import { useMyStore } from '../store';
import { useNavigate, useParams } from 'react-router-dom';

export default function TrashedItemDetails({ changeNav, item, db, shipItems }) {

    const { deleteItem, updateItem } = useMyStore();
    const navigate = useNavigate();

    const collection = item.collection
    const category = collection.split('').toSpliced(0,1,collection[0].toUpperCase()).join('');

    function restore(){
        item.isTrashed = false;
        item.trashedDate = 0;
        updateItem(item);
        navigate(`/${category}/${item.id}`);
    }

    function deleteFromDB(){
        deleteItem(item);
        navigate(`/Trash`);
    }
    
    return (
        <div>
            <div className='w-100 pa2 pb3' >
                <h3 className='fw7 b white pb2'>{item.name}</h3>
                <h4 className='fw1 white'>{item.type}</h4>
            </div>
            <div className='w-100 pl2 pb3'>
                <h5 className='fw3 white'>Trashed Date: {new Date((item.trashedDate)).toLocaleString()}</h5>
            </div>
            <div className='w-100 ba bw1 b--white tc pb2'>
                <h5 className='fw3 white' onClick={restore}>RESTORE</h5>
            </div>
            <div className='w-100 ba bw1 b--white tc pb2'>
                <h5 className='fw3 white' onClick={deleteFromDB}>DELETE</h5>
            </div>
        </div>
    )
}
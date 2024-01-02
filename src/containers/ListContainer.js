import React from 'react';
import List from '../components/List';
import { useParams } from 'react-router-dom';
import { useMyStore } from '../store';

function ListContainer() {

    const title = useParams().category;
    let content = useMyStore(store => store[title.toLowerCase()]);

    return (
        <div className='h-100 pa2'>
            <div className='h-10'>
                <h5 className='fw3 white'>EXP: {0}</h5>
            </div>
            <div className='h-90 pa1'>
                <div className='h-100 w-100 center pa1'>
                    {/* <h1 className='tc b gold ma0 pb2'>{title}</h1> */}
                    <h2 className='tc b gold f3'>{title}</h2>
                    <div className=' h-80 '>
                        <List content={content} title={title} />
                    </div>
                    <div className='h-10 flex w-100 content-end pa2'>
                        {/* <NewItemButton touchFunsction={handleEvent} /> */}
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default ListContainer
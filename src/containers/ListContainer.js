import React from 'react'
import List from '../components/List'

function ListContainer({title}) {
    return (
        <div className='h-100 pa2'>
            <div className='h-10'>
                <h5 className='fw3 white'>EXP: {20}</h5>
            </div>
            <div className='h-90 pa1'>
                <div className='h-100 w-100 center pa1'>
                    <h1 className='tc b gold ma0 pb2'>{title}</h1>
                    <div className=' h-80 '>
                        <List title={title} />
                    </div>
                    <div className='h-10 flex w-100 content-end pa2'>
                        {/* <NewItemButton touchFunction={handleEvent} /> */}
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default ListContainer
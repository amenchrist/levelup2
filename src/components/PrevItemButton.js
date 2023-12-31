import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PrevItemButton({ prevID, currentID }){

    const navigate = useNavigate();
    const { category } = useParams()

    if(currentID !== prevID){
        return (
            <div className='whiteB w3 h3 flex items-center justify-center' onClick={() => navigate(`/${category}/${prevID}`)}>
                <h2 className=' white b f8 fw9 ma0'>Prev</h2>
            </div>
        )
    } else {
        return (
            <div className='ba bw1 b--silver w3 h3 flex items-center justify-center' >
                <h2 className=' gray b f8 fw9 ma0'>Prev</h2>
            </div>
        )
    }
}

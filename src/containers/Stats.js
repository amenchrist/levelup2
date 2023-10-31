import React from 'react';
import { COMPLETED, PROCESSED, TRASH } from '../constants';
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';


export default function Stats( { changeNav}) {

    const { setIsLoggedIn } = useMyStore();
    const navigate = useNavigate();

    function openList(title){
        const nav = {
            title: title,
            view: "LIST",
            ID: 0
        }

            // changeNav(nav);
    }

    function logout(){
        // localStorage.setItem('LoggedIn', 'false');
        setIsLoggedIn(false)
    }
    return (
        <div className='h-75 w-90 center pa3 pa4-ns ba b--black-10'>
            <div className=' w-90 center bg-white br1 pa3 pa4-ns ba b--black-10'>
                <h1 className='tc'>STATS</h1>
            </div>
            <div className=' pt2 '>
                <div className='whiteB h3 flex items-center justify-center' onClick={() => {openList(COMPLETED)}}>
                    <h1 className=' white b f8 fw9 ma0'>Completed</h1>
                </div>
                <div className='whiteB h3 flex items-center justify-center' onClick={() => {openList(PROCESSED)}}>
                    <h1 className=' white b f8 fw9 ma0'>Processed</h1>
                </div>
                <div className='whiteB h3 flex items-center justify-center' onClick={() => {openList(TRASH)}}>
                    <h1 className=' white b f8 fw9 ma0'>Trash</h1>
                </div>
                <div className='whiteB h3 flex items-center justify-center' onClick={() => {logout()}}>
                    <h1 className=' white b f8 fw9 ma0'>Logout</h1>
                </div>
            </div>     
        </div>
    )
}

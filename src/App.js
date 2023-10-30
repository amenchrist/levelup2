import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Router from './routes';


export default function App() {

    // const { isLoggedIn } = useStateContext();
    
    useEffect(() => {
        // localStorage.getItem('LoggedIn') === 'true' ? setIsLoggedIn(true) : setIsLoggedIn(false)
    }, [])

    return (
        <div className='app'>
            <Router />
        </div>
    );
}

//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8
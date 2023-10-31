import React, { useEffect, useState } from 'react';
import './App.css';
import Router from './routes';
import { useMyStore } from './store';
import { getInbox } from './api';

export default function App() {

    const [ inbox, setInbox ] = useState([]);
    const { addItems } = useMyStore();

    useEffect(() => {
        getInbox(setInbox)
    }, []);

    useEffect(() => {
        addItems(inbox);
    }, [inbox]);


    return (
        <div className='app'>
            <Router />
        </div>
    );
}

//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8
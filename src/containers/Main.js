import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function Main() {
  return (
    <>
        <div className='home-container'>
            <Outlet />
            {/* <Home db={db} /> */}
            {/* <Main /> */}
        </div>
        <NavBar />
    </>
  )
}

export default Main
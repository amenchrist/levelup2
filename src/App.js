import React, { useEffect, useState } from 'react';
// import NavBar from './containers/NavBar';
import './App.css';
// import Main from './containers/Main';
import SplashPage from './pages/SplashPage';

// const mapDispatchToProps = (dispatch) => {

//     return {
//         onTouch: (title) => {
//             return dispatch(selectView(title))
//         }
//     }
// }

export default function App({ onTouch }) {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    
    useEffect(() => {
        localStorage.getItem('LoggedIn') === 'true' ? setIsLoggedIn(true) : setIsLoggedIn(false)
    }, [])

    if(!isLoggedIn){
        return(
            <div className='app'>
                <SplashPage />
            </div>
        )
    } else {
        return (
            <div className='app'>
                <div className='home-container'>
                    {/* <Main /> */}
                </div>
                {/* <NavBar touchFunction={onTouch} /> */}
            </div>
        );
    }
}

;


//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8
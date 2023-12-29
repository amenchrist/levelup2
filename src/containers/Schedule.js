import React from 'react'
import Scroll from '../components/Scroll'

function Schedule() {

    const date = new Date(2023, 11, 29);
    date.setMinutes(15*5)

    console.log(date.toISOString().substr(11, 5))
    // new Array(12*24).fill('empty').forEach((e,i) => {
    //     date.setMinutes(i*5)
    //     console.log(date.toISOString().substr(11, 5))})



    const Spaces = () => {
        const spaces = new Array(12*24).fill('empty').map((e,i) => {
            const date = new Date(2023, 11, 29);
            date.setMinutes(i*5)
            return date.toISOString().substr(11, 5)
        });
        return(
            <>
            {spaces.map((e,i) => 
                <div style={{height: '30px', border: '1px solid grey'}} key={i}>
                <p style={{color: 'grey'}}>{e}</p>
                </div>
            )}
            </>
        )
    }

    const coverImgStyle = {
        backgroundImage: 'url(https://assets.vg247.com/current/2016/06/watch_dogs_2_hires_header_1.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        borderBottom: '2px solid white'
    }

    

    
  return (
    <>
        <div className='w-100 h-20' style={coverImgStyle}>
        </div>
        <div style={{height: '5%', display: 'flex', justifyContent: 'space-between', padding: 5, alignItems: 'center', borderBottom: '2px solid white'}}>
            <h2 style={{color: 'white'}}>{'<'}</h2>
            <h2 style={{textAlign: 'center', color: 'white'}}><strong>Today</strong></h2>
            <h2 style={{color: 'white'}}>{'>'}</h2>
        </div>
        <div style={{height: '75%'}}>
            <Scroll>
                <Spaces />
            </Scroll>
        </div>
    </>
  )
}

export default Schedule
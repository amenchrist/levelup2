import React, { useEffect, useState } from 'react'
import Scroll from '../components/Scroll'

function Schedule() {

    const [ now, setNow ] = useState(new Date())

    useEffect(() => {
        const myInterval = setInterval(() => setNow(new Date()), 1000)

        return () => clearInterval(myInterval)
    }, [])


    const Spaces = () => {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const minutesTillNow = currentHour*60+currentMinute;
        const spaces = new Array(12*24).fill('empty').map((e,i) => i*5);
        return(
            <>
            {spaces.map((e,i) => {
                const date = new Date(2023, 11, 30);
                date.setMinutes(e)
                if (minutesTillNow >= e && minutesTillNow < e+5 ) {
                    return (<div style={{height: '50px', border: '1px solid red'}} key={i}>
                    <p style={{color: 'white'}}>{date.toISOString().substr(11, 5)}</p>
                    </div>)
                } else {
                    return (<div style={{height: '50px', border: '1px solid grey'}} key={i}>
                    <p style={{color: 'grey'}}>{date.toISOString().substr(11, 5)}</p>
                    </div>)
                }
            }                
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
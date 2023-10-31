import React, {useState} from 'react';
import introQuote from '../assets/GAMER INTRO.png';
import { useMyStore } from '../store';

const SplashPage = () => {

    const { setUser, setIsLoggedIn } = useMyStore()

    const [ password, setPassword ] = useState('');
    const [ incorrect, setIncorrect ] = useState(false);

    function handleSubmit(e){
        
        e.preventDefault();

        const user1 = {
            name: "The Christ Amen",
            rank: 'F',
            job: 'Engineer',
            exp: 100
        }

        if (password === "levelup"){
            localStorage.setItem('LoggedIn', 'true')
            setIsLoggedIn(true)
            setUser(user1)

        } else {
            setIncorrect(true)
            setPassword('')
        }
        // const body = {
        //     password: password
        // }
        // fetch('http://localhost:5000/login/', {
        //     method: 'POST',
        //     mode: 'cors',
        //     credentials: 'include',
        //     referrerPolicy: 'no-referrer',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(body)
        // }).then(res => res.json())
        // .then(data => console.log(data))
        // console.log('password submitted')
    }

  return (
    <div className='app'>
        <div className='bg-black w-100 h-100 flex justify-center items-center'>
            <div className='pa2'>
                <h2 className='bold white tc pb2'>SOLO LEVELING</h2>
                <img alt='Intro Quote' src={introQuote} width={250} />
                <form onSubmit={e => handleSubmit(e)} className='pa2'>
                <input type='password' className='pa2 w-100 tc' placeholder='Enter Password' 
                value={password} onChange={(e) => {setIncorrect(false); setPassword(e.target.value)}}  />
                </form>
                {incorrect ? <p className='red bold tc pa2'>DENIED</p> : <p className='pa2'>------------ </p> }
            </div>
        </div>
    </div>
    
  )
}

export default SplashPage
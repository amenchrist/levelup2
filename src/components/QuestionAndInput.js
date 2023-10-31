import React, { useState } from 'react';

export default function QuestionandInput({ question, submitFunction }) {

    const [ answer, setAnswer ] = useState('');

    function submit(event) {

        if(answer !==''){
            submitFunction(answer);
            setAnswer('');
        }
        event.preventDefault();

    }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column'>
            <h2 className='white tc pb2'>{question}</h2>
            <form onSubmit={submit}>
                <input type='text'  autoFocus value={answer} onChange={(e)=> setAnswer(e.target.value)} />
                <input type='submit' value='submit' />
            </form>
        </div>
    )
}
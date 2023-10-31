import React from 'react';

export default function QuestionAndOptions({ question, yes, no }) {
    return (
        <div className='h-100 w-100 br1 pa3 flex items-center flex-column'>
            <h2 className='white tc pb2'>{question}</h2>
            <div>
                <button className="button" onClick={yes}>YES</button>
                <button className="button" onClick={no} >NO</button>
            </div>
        </div>
    )
}
import React from 'react';

export default function Scroll(props) {
    return (
        <div className='h-100' style={{overflowY: 'scroll', overflowX: 'hidden'}}>
            {props.children}
        </div>
    );
}
import React from 'react'
import { useNavigate } from 'react-router-dom';

function EventsOverview() {

    const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center h-100 w-100 center bg-white pa1'  onClick={() => navigate('/Events')}>
        <h4 className='tc'>Calendar</h4>
    </div>
  )
}

export default EventsOverview
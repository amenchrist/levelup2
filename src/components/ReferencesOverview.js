import React from 'react'
import { useNavigate } from 'react-router-dom';

function ReferencesOverview() {

    const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center h-100 w-100 center bg-white ' onClick={() => navigate('/References')}>
        <h4 className='tc'>References</h4>
    </div>
  )
}

export default ReferencesOverview
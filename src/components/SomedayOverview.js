import React from 'react'
import { useMyStore } from '../store';
import { DONE, LIST, SOMEDAY } from '../constants';
import { useNavigate } from 'react-router-dom';

function SomedayOverview() {

  const navigate = useNavigate();
  const content = useMyStore(store => store.someday)

  return (
    <div className='flex items-center justify-center h-100 w-100 center bg-white ' data-view={LIST} title={SOMEDAY} onClick={() => navigate(`/SOMEDAY`)} >
        <h4 className='tc'>Someday ({content.length})</h4>
    </div>
  )
}

export default SomedayOverview
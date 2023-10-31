import React from 'react'
import { useMyStore } from '../store';
import { DAILY, LIST, TASK } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function DailyExercises() {

  const navigate = useNavigate();
  const content = useMyStore(store => store.daily)

  return (
    <div className='flex items-center justify-center h-100 w-100 center bg-white pa1' onClick={() => navigate(`/DAILY`)}>
        <h2 className='tc'>Daily<br />Exercises<br />({content.length})</h2>
    </div>
  )
}

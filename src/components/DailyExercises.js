import React from 'react'
import { useMyStore } from '../store';
import { DAILY, LIST, TASK } from '../constants';

export default function DailyExercises() {

    const content = useMyStore(store => store.tasks);

    let dailyEx = content.filter((entry) => (entry.type === TASK && entry.frequency === DAILY ) && (entry.isTrashed === false));

  return (
    <div className='flex items-center justify-center h-100 w-100 center bg-white pa1' data-view={LIST} title={DAILY} onClick={() => {}}>
        <h2 className='tc'>Daily<br />Exercises<br />({dailyEx.length})</h2>
    </div>
  )
}

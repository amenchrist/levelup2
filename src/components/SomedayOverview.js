import React from 'react'
import { useMyStore } from '../store';
import { DONE, LIST, SOMEDAY } from '../constants';

function SomedayOverview() {

    const content = useMyStore(store => store.tasks.concat(store.missions));
    let somedayContent = content.filter((t) => (t.isTrashed === false && t.status !== DONE) && t.dueDate === SOMEDAY);

  return (
    <div className='flex items-center justify-center h-100 w-100 center bg-white ' data-view={LIST} title={SOMEDAY} onClick={() => {}} >
        <h4 className='tc'>Someday ({somedayContent.length})</h4>
    </div>
  )
}

export default SomedayOverview
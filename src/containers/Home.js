import React from 'react';
import StatsOverview from '../components/StatsOverview';
import TaskOverview from '../components/TasksOverview';
import MissionsOverview from '../components/MissionsOverview';
import InboxOverview from '../components/InboxOverview';
import {  CALENDAR, DAILY, DONE, LIST, REFERENCES, SOMEDAY, STATS, TASK } from '../constants';
import NewItemTile from '../components/NewItemTile';
import TodaysMission from '../components/TodaysMission';
import {db} from '../data/db'

export default function Home(props) {
    
    // const { changeItemID, exp, db, changeNav, state } = props;
    let changeItemID, exp=20;

    function handleEvent(e) {
        // setNavValues(e, changeNav, state);
    }

    let somedayContent = [] //db.Tasks.concat(db.Missions).filter((t) => (t.isTrashed === false && t.status !== DONE) && t.dueDate === SOMEDAY);

    let dailyEx = [] //db.Tasks.filter((entry) => (entry.type === TASK && entry.frequency === DAILY ) && (entry.isTrashed === false));
            
    return (
        <div className='h-100 pa1' >
            <div className='pa1 ph1 h-40 ba' title={STATS}>
                <StatsOverview touchFunction={handleEvent} exp={exp} />
            </div>
            <div className="flex justify-center h-20 ">
                <div className='w-50 pa1'>
                    <MissionsOverview touchFunction={handleEvent} missions={db?.Missions} />
                </div>
                <div className='w-50 pa1'>
                    <TaskOverview touchFunction={handleEvent} tasks={db?.Tasks}/>
                </div>
            </div>
            <div className='flex w-100 h-10 pa1'>
                <NewItemTile touchFunction={handleEvent} />
            </div>
            <div className="flex justify-center h-30">
                <div className='w-50 h-100 pa1'>
                    <div className=' w-100 h-50 pb1'>
                        <TodaysMission touchFunction={handleEvent} gotoItem={changeItemID} db={db}/>
                    </div>
                    <div className=' w-100 h-50 pt1'>
                        <div className='flex items-center justify-center h-100 w-100 center bg-white pa1' data-view={LIST} title={DAILY} onClick={handleEvent}>
                            <h2 className='tc'>Daily<br />Exercises<br />({dailyEx.length})</h2>
                        </div>
                    </div>
                </div>
                <div className=' w-50 h-100'>
                    <div className=' w-100 h-50'>
                        <div className=' h-50 pa1'>
                            <div className='flex items-center justify-center h-100 w-100 center bg-white ' data-view={LIST} title={SOMEDAY} onClick={handleEvent} >
                                <h4 className='tc'>Someday ({somedayContent.length})</h4>
                            </div>
                        </div>
                        <div className='h-50 pa1'>
                            <div className='flex items-center justify-center h-100 w-100 center bg-white ' data-view={LIST} title={REFERENCES} onClick={handleEvent}>
                                <h4 className='tc'>References</h4>
                            </div>
                        </div>
                    </div>
                    <div className='w-100 h-50 flex'>
                        <div className='w-50 h-100 pa1' >
                            <div className='flex items-center justify-center h-100 w-100 center bg-white pa1' data-view={LIST} title={CALENDAR} onClick={handleEvent}>
                                <h4 className='tc'>Calendar</h4>
                            </div>
                        </div>
                        <div className='w-50 h-100 pa1'>
                            <InboxOverview touchFunction={handleEvent} inbox={db?.Inbox}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
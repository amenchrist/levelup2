import React from 'react';
import StatsOverview from '../components/StatsOverview';
import TaskOverview from '../components/TasksOverview';
import MissionsOverview from '../components/MissionsOverview';
import InboxOverview from '../components/InboxOverview';
import { CALENDAR, LIST, REFERENCES } from '../constants';
import NewItemTile from '../components/NewItemTile';
import TodaysMission from '../components/TodaysMission';
import DailyExercises from '../components/DailyExercises';
import SomedayOverview from '../components/SomedayOverview';

export default function Home() {
   
    return (
        <div className='h-100 pa1' >
            <div className='pa1 ph1 h-40 ba'>
                <StatsOverview  />
            </div>
            <div className="flex justify-center h-20 ">
                <div className='w-50 pa1'>
                    <MissionsOverview  />
                </div>
                <div className='w-50 pa1'>
                    <TaskOverview />
                </div>
            </div>
            <div className='flex w-100 h-10 pa1'>
                <NewItemTile />
            </div>
            <div className="flex justify-center h-30">
                <div className='w-50 h-100 pa1'>
                    <div className=' w-100 h-50 pb1'>
                        <TodaysMission />
                    </div>
                    <div className=' w-100 h-50 pt1'>
                        <DailyExercises />
                    </div>
                </div>
                <div className=' w-50 h-100'>
                    <div className=' w-100 h-50'>
                        <div className=' h-50 pa1'>
                            <SomedayOverview />
                        </div>
                        <div className='h-50 pa1'>
                            <div className='flex items-center justify-center h-100 w-100 center bg-white ' data-view={LIST} title={REFERENCES} onClick={() => {}}>
                                <h4 className='tc'>References</h4>
                            </div>
                        </div>
                    </div>
                    <div className='w-100 h-50 flex'>
                        <div className='w-50 h-100 pa1' >
                            <div className='flex items-center justify-center h-100 w-100 center bg-white pa1' data-view={LIST} title={CALENDAR} onClick={() => {}}>
                                <h4 className='tc'>Calendar</h4>
                            </div>
                        </div>
                        <div className='w-50 h-100 pa1'>
                            <InboxOverview />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
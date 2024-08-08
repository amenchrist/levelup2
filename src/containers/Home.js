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
import ReferencesOverview from '../components/ReferencesOverview';
import EventsOverview from '../components/EventsOverview';
import List from '../components/List';
import Scroll from '../components/Scroll';
import { useMyStore } from '../store';
import ListItem from '../components/ListItem';

export default function Home() {
    let content = useMyStore(store => store['tasks']);
    let listItems;
    
    if(content){
        listItems = content.map((entry,i) => {
            return <ListItem item={content[i]} key={content[i].id}/>
        })
    }

    function ListContainer({children}) {
        return (
            <div className='h-100 pa2'>
                {/* <div className='h-10'>
                    <h5 className='fw3 white'>EXP: {10}</h5>
                </div> */}
                <div className='h-90 pa1'>
                    <div className='h-100 w-100 center pa1'>
                        {/* <h1 className='tc b gold ma0 pb2'>{title}</h1> */}
                        <h2 className='tc b gold f3'>{'Next Action'}</h2>
                        <div className=' h-80 '>
                        {children}
                        </div>
                        <div className='h-10 flex w-100 content-end pa2'>
                            {/* <NewItemButton touchFunsction={handleEvent} /> */}
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
   
    return (
        <div className='h-100 pa1' >
            <h1 className='white b '>Christ Amen</h1>
            <p className='white'>Rank: F</p>
            <p className='white'>Class: God</p>
            <p className='white'>Exp: 2356</p>
            <hr/>
            <ListContainer>
                    <p className='white'>Total: {0}</p>
                    <Scroll>
                        {listItems}
                    </Scroll>
                </ListContainer>

        </div>
    );
}
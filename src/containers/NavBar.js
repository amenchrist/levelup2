import React from 'react';
import { HOME, INBOX, LIST, MISSIONS, OVERVIEW, STATS, TASKS } from '../constants';
import { Home, Inbox, List, PieChart, Target } from 'react-feather';


export default function NavBar() {

    function handleEvent(e){
        // setNavValues(e, changeNav, state);
    }

    function NavButton({Icon, title, view, endpoint}) {
        return (
            <div className='w-20 center bg-white b--black-10 ba flex items-center justify-center' data-view={view}  title={title}>
                {/* <h3 className='tc'>H</h3> */}
                <a href={endpoint}>
                    <Icon />
                </a>
            </div>       
        )
    }

    return (
        <div className='navbar center flex'>
            {/* <HomeButton touchFunction={handleEvent} /> */}
            <NavButton Icon={Home} data-view={OVERVIEW}  title={HOME} endpoint={''}/>
            <NavButton Icon={Inbox} data-view={LIST}  title={INBOX} endpoint={'inbox'}/>
            <NavButton Icon={List} data-view={LIST}  title={TASKS} endpoint={'tasks'}/>
            <NavButton Icon={Target} data-view={LIST}  title={MISSIONS} endpoint={'missions'}/>
            <NavButton Icon={PieChart} data-view={OVERVIEW}  title={STATS} endpoint={'stats'}/>
        </div>       
    )
}

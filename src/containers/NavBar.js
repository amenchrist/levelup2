import React from 'react';
import { HOME, INBOX, LIST, MISSIONS, OVERVIEW, STATS, TASKS } from '../constants';
import { Home, Inbox, List, PieChart, Target } from 'react-feather';
import { useNavigate } from 'react-router-dom';


export default function NavBar() {

    const navigate = useNavigate()

    function NavButton({Icon, title, view, endpoint}) {
        return (
            <div className='w-20 center bg-white b--black-10 ba flex items-center justify-center' data-view={view}  title={title} onClick={() => navigate(endpoint)}>
                {/* <h3 className='tc'>H</h3> */}
                    <Icon />
                {/* <a href={endpoint}>
                </a> */}
            </div>       
        )
    }

    return (
        <div className='navbar center flex'>
            {/* <HomeButton touchFunction={handleEvent} /> */}
            <NavButton Icon={Home} data-view={OVERVIEW}  title={HOME} endpoint={'/'}/>
            <NavButton Icon={Inbox} data-view={LIST}  title={INBOX} endpoint={'/Inbox'}/>
            <NavButton Icon={List} data-view={LIST}  title={TASKS} endpoint={'Tasks'}/>
            <NavButton Icon={Target} data-view={LIST}  title={MISSIONS} endpoint={'/Missions'}/>
            <NavButton Icon={PieChart} data-view={OVERVIEW}  title={STATS} endpoint={'/Stats'}/>
        </div>       
    )
}

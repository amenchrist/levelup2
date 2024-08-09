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
import { Box, Container, Grid, Typography } from '@mui/material';

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
            <div className='h-90 pa2'>
                {/* <div className='h-10'>
                    <h5 className='fw3 white'>EXP: {10}</h5>
                </div> */}
                <div className='h-90 pa1'>
                    <div className='h-100 w-100 center pa1'>
                        {/* <h1 className='tc b gold ma0 pb2'>{title}</h1> */}
                        <h2 className='b gold f3'>{'Next Task'}</h2>
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
					<Container component="main" maxWidth="xs" sx={{paddingBottom: '10px'}}>
						<Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column',height:'80%', }} color={'white'}>
							<Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>Amen Christ</Typography>
							{/* <Grid container alContent="space-between" sx={{padding: '5px 0 10px 0'}}>
							</Grid> */}
								<Grid item sx={{padding: '5px 0 5px 0'}}>
									<Typography variant='p' >Class: God</Typography>
								</Grid>
								<Grid item sx={{padding: '5px 0 5px 0'}}>
									<Typography variant='p'  >Rank: F</Typography>
								</Grid>
							<Grid item sx={{padding: '5px 0 5px 0'}}>
							<Typography variant='p' >Exp: 2356</Typography>
						</Grid>
				</Box>
      </Container>
            <hr/>
            <ListContainer>
						<Grid container justifyContent="space-between" alignItems={'center'} color={'white'} sx={{padding: '20px 0 10px 0'}}>
								<Grid item>
									<Typography variant='p' >Total: 0</Typography>
								</Grid>
								<Grid item sx={{border: '2px solid white', padding: '5px 7px'}}>
									<Typography variant='p' >+</Typography>
								</Grid>
							</Grid>
                    <Scroll>
                        {listItems}
                    </Scroll>
                </ListContainer>

        </div>
    );
}
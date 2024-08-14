import React from 'react';

import Scroll from '../components/Scroll';
import { useMyStore } from '../store';
import ListItem from '../components/ListItem';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function Home() {
	let content = useMyStore(store => store['tasks']);
	const { completed } = useMyStore()
	const { player } = useMyStore()
	let listItems;
	const navigate = useNavigate();
    
    if(content){
      listItems = content.map((entry,i) => {
        return <ListItem item={content[i]} key={content[i].id}/>
      })
    }

		const today = dayjs().format('DD-MM-YYYY')
		
		const doneToday = completed.filter(t => dayjs(t.doneDate).format('DD-MM-YYYY') === today)
   
    return (
			<div className='h-100 pa1' >
					<Container component="main" maxWidth="xs" sx={{paddingBottom: '10px'}}>
						<Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column',height:'80%' }} color={'white'}>
							<Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>{player.name}</Typography>
							<Grid container justifyContent="space-between" >
								<Box >
									<Grid item sx={{padding: '5px 0 5px 0',}}>
										<Typography variant='p' >Race: God</Typography>
									</Grid>
									<Grid item sx={{padding: '5px 0 5px 0'}}>
										<Typography variant='p'  >Rank: {player.rank}</Typography>
									</Grid>
									<Grid item sx={{padding: '5px 0 5px 0'}}>
										<Typography variant='p' >Exp: {player.exp}</Typography>
									</Grid>
									<Grid item sx={{padding: '5px 0 5px 0'}}>
										<Typography variant='p' >Discipline Streak: {player.streak} Days</Typography>
									</Grid>
								</Box>
								<Box >
									<Grid item sx={{padding: '5px 0 5px 0'}}>
										<Typography variant='p' >Income: £2,000/Mo</Typography>
									</Grid>
									<Grid item sx={{padding: '5px 0 5px 0'}}>
										<Typography variant='p' >Debt: -£2,500</Typography>
									</Grid>
									<Grid item sx={{padding: '5px 0 5px 0'}}>
										<Typography variant='p' >Savings: £0</Typography>
									</Grid>
									<Grid item sx={{padding: '5px 0 5px 0'}}>
										<Typography variant='p' >Followers: 0</Typography>
									</Grid>
								</Box>
							</Grid>
						</Box>
					</Container>
          <hr/>
					<div className='h-70 w-100 center pa2'>
						<h2 className='b gold f3'>Next Tasks</h2>
						<div className=' h-80 '>
							<Grid container justifyContent="space-between" alignItems={'center'} color={'white'} sx={{padding: '20px 0 10px 0'}}>
								<Grid item>
									<Typography variant='p' >Total: {content.length}</Typography>
								</Grid>
								<Grid item>
									<Typography variant='p' >Done Today: {doneToday.length}</Typography>
								</Grid>
								<Grid item sx={{border: '2px solid white', padding: '5px 7px'}} onClick={() => navigate(`/new/task`)} >
									<Typography variant='p'>+</Typography>
								</Grid>
							</Grid>
							<Scroll>
									{listItems}
							</Scroll>
						</div>
					</div>
        </div>
    );
}
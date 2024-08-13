import React from 'react'
import { useMyStore } from '../store'
import { Box, Button, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import Player from '../classes/Player';
import { useNavigate } from 'react-router-dom';

function NewPlayer() {

  const { setPlayer } = useMyStore();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newPlayer = new Player({
      name: data.get('name'),
      email: data.get('email'),
      handle: data.get('handle').toLowerCase(),
    })

    const playerUploaded = newPlayer.uploadProfile()

    if(playerUploaded){
      setPlayer({...newPlayer})
      navigate(`/`)
    }
  };

  return (
    <>
    <CssBaseline />
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Name"
                  autoFocus
                  />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="handle"
                  placeholder="handle"
                  name="handle"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </>
  )
}

export default NewPlayer
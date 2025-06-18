import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TaskControls from './TaskControls';
import { Task } from '../classes/Task';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Popup({tasks, outstandingTaskExists, setOutstandingTaskExists}) {

  const task = new Task({...tasks[0]})
  const [open, setOpen] = React.useState(outstandingTaskExists);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onClick={() => navigate(`/Tasks/${task?.id}`)}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {task?.name}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          {task? <TaskControls task={task}/> : <></>}
        </Box>
      </Modal>
    </div>
  );
}

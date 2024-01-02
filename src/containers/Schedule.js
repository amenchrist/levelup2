import React, { useEffect, useState } from 'react'
import Scroll from '../components/Scroll';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DndContext } from '@dnd-kit/core';
import DraggableTask from '../components/DraggableTask'
import DroppableSlot from '../components/DroppableSlot';
import { useMyStore } from '../store';

function Schedule() {

    const now = new Date()

    const [ popupOpen, setPopupOpen ] = useState(false);
    const [ selectedDate, setSelectedDate ] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate()));

    const [ referenceDate, setReferenceDate ] = useState(selectedDate)

    useEffect(() => {
        setReferenceDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()))
    }, [selectedDate])
    useEffect(() => {    
        const myInterval = setInterval(() => {
            if(selectedDate.toDateString() === new Date().toDateString()){
                setSelectedDate(new Date())
            }
        } , 1000)

        return () => clearInterval(myInterval)
    }, [selectedDate])
    
    const {tasks} = useMyStore();

    const [ relevantTasks, setRelevantTasks ] = useState(tasks.filter(e => e.startDate === referenceDate.toString()))

    useEffect(() => {
        setRelevantTasks(tasks.filter(e => e.startDate === referenceDate.toString()))
    }, [referenceDate, tasks] )

    const [ startTime, setStartTime ] = useState('00:20');

    function changeDate (val) {
        setSelectedDate(val);
        setPopupOpen(false)       
    }   

    // const task = {
    //     id: 'abc',
    //     name: 'Task 1',
    //     startTime,
    //     startDate: new Date(2024,0,2),
    //     timeRequired: 30,
    //     outcome: 'Outcome'
    // }

    console.log(tasks)
    console.log(relevantTasks)
    console.log(relevantTasks[0])
    console.log(new Date(tasks[0]?.startDate))
    console.log(tasks[0]?.startDate === referenceDate.toString())
    console.log(referenceDate)

    const Task = ({task}) => {
        const height = (task?.timeRequired/5)*50;
        console.log(height)

        console.log(task)
        return (
            <DraggableTask id={task?.startTime} >
                <div style={{zIndex: 1, border: '2px solid black', height: `${height}px`, backgroundColor: 'white', position: 'relative', padding: '5px', margin: '-5px' }}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p>{task.startTime}</p>
                        <button>Start Now</button>
                    </div>
                    <h2 style={{fontWeight: 700}}>{task.name}</h2>
                    <p>{task.outcome}</p>
                    <p>Duration: {task.timeRequired} mins</p>
                    <p>Goal: </p>                    
                </div>
            </DraggableTask>
        )
    }

    function handleDragEnd({over}){

        if(!over){ return }
        if(!over.id){ return }

        if(over.id) {
            setStartTime(over.id)
        }
    }

    const Spaces = () => {
        const currentHour = selectedDate.getHours();
        const currentMinute = selectedDate.getMinutes();
        const minutesTillNow = currentHour*60+currentMinute;

        const spaces = new Array(12*24).fill('empty').map((e,i) => i*5);

        return(
            <>
            {spaces.map((e,i) => {
                //To create the times in each slot according to duration in minutes from midnight
                const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDay());
                date.setMinutes(e)
                const time = date.toISOString().substr(11, 5);
                const task = relevantTasks.find(t => t.startTime === time)
            
                return (
                    <DroppableSlot id={time} key={i}>
                        {minutesTillNow >= e && minutesTillNow < e+5 && selectedDate.toDateString() === new Date().toDateString() ?
                            <div  style={{height: '50px', border: '1px solid red', padding: '5px', position: 'relative'}} key={i} >
                                <p style={{color: 'grey', position: 'absolute', zIndex: 1}}>{time}</p>
                                {task? <Task task={task} />: <></>}
                            </div>
                            :
                            <div style={{height: '50px', border: '1px solid grey', padding: '5px', position: 'relative'}} key={i} >
                                <p style={{color: 'grey', position: 'absolute'}}>{time}</p>
                                {task? <Task task={task} />: <></>}
                            </div>
                        }
                    </DroppableSlot>
                )
            }                
            )}
            </>
        )
    }   

    const coverImgStyle = {
        backgroundImage: 'url(https://assets.vg247.com/current/2016/06/watch_dogs_2_hires_header_1.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        borderBottom: '2px solid white'
    }
  return (
    <>
        <div className='w-100 h-20' style={coverImgStyle} id='headerImg'>
        </div>
        <div style={{height: '5%', display: 'flex', justifyContent: 'space-between', padding: 5, alignItems: 'center', borderBottom: '2px solid white'}}>
            <h2 style={{color: 'white'}} onClick={() => changeDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()-1))} >{'<'}</h2>
            
            <h2 style={{textAlign: 'center', color: 'white'}} onClick={() => setPopupOpen(true)}>{selectedDate.toDateString()}</h2>
            <Popup open={popupOpen}  onClose={() => setPopupOpen(false)} position="bottom center" >
                <div className='w-100 show' style={{width: '100%'}}>
                    <Calendar className={'w-100'} onChange={changeDate} value={selectedDate} />
                </div>
            </Popup>

            <h2 style={{color: 'white'}} onClick={() => changeDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()+1)) }>{'>'}</h2>
        </div>
        <div style={{height: '75%'}}>
            <Scroll>
                {/* <DragDropContext onDragEnd={handleDrag}>
                    <Spaces />
                </DragDropContext> */}
                <DndContext onDragEnd={handleDragEnd} >
                    <Spaces />
                </DndContext>
            </Scroll>
        </div>
    </>
  )
}

export default Schedule
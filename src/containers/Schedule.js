import React, { useEffect, useState } from 'react'
import Scroll from '../components/Scroll';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DndContext } from '@dnd-kit/core';
import DraggableTask from '../components/DraggableTask'
import DroppableSlot from '../components/DroppableSlot';

function Schedule() {

    const [ now, setNow ] = useState(new Date());
    const [ startTime, setStartTime ] = useState('00:20');
    const [popupOpen, setPopupOpen ] = useState(false);

    useEffect(() => {    
        const myInterval = setInterval(() => {
            if(now.toDateString() === new Date().toDateString()){
                setNow(new Date())
            }
        } , 1000)
        return () => clearInterval(myInterval)
    }, [now])


    function changeDate (val) {
        console.log(val)
        setNow(val);
        setPopupOpen(false)       
    }

   

    const task = {
        id: 'abc',
        title: 'Task 1',
        startTime,
        startDate: new Date(2024,0,2),
        duration: 30,
        outcome: 'Outcome'
    }

    // const Task = (i) => {
    //     const height = (task.duration/5)*50
    //     return (
    //         <Draggable draggableId={task.startTime} index={Math.ceil(Math.random()*1000)}>
    //             {provided => (
    //                 <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
    //                     <div style={{zIndex: 1, border: '2px solid black', height: `${height}px`, backgroundColor: 'white', position: 'relative', padding: '5px', margin: '-5px' }}>
    //                         <p>{task.startTime}</p>
    //                         <br/>
    //                         <h2 style={{fontWeight: 700}}>{task.title}</h2>
    //                         <p>{task.outcome}</p>
    //                         <p>Duration: {task.duration} mins</p>
    //                         <p>Goal: </p>
    //                         <br/>
    //                         <br/>
    //                         <hr />
    //                         <button>Start Now</button>
    //                     </div>
    //                 </div>
    //             )}
                
    //         </Draggable>
            
    //     )
    // }

    const Task = (i) => {
        const height = (task.duration/5)*50
        return (
            <DraggableTask id={task.startTime} >
                <div style={{zIndex: 1, border: '2px solid black', height: `${height}px`, backgroundColor: 'white', position: 'relative', padding: '5px', margin: '-5px' }}>
                    <p>{task.startTime}</p>
                    <br/>
                    <h2 style={{fontWeight: 700}}>{task.title}</h2>
                    <p>{task.outcome}</p>
                    <p>Duration: {task.duration} mins</p>
                    <p>Goal: </p>
                    <br/>
                    <br/>
                    <hr />
                    <button>Start Now</button>
                </div>
            </DraggableTask>
            
        )
    }

    function handleDragover(e) {
        e.preventDefault();
    }

    function handleDrag(result){

        const { destination, source, draggableId } = result;
        if(!destination) {return};
        if(destination.droppableId === source.droppableId) {return}
        task.startTime = destination.droppableId

    }

    function handleDragEnd({over}){

        if(over.id) {
            setStartTime(over.id)
        }
    }

    const Spaces = () => {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const minutesTillNow = currentHour*60+currentMinute;

        const spaces = new Array(12*24).fill('empty').map((e,i) => i*5);

        return(
            <>
            {spaces.map((e,i) => {
                const date = new Date(now.getFullYear(), now.getMonth(), now.getDay());
                date.setMinutes(e)
                const time = date.toISOString().substr(11, 5);
                
                const day = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toDateString()

                // return (
                //     <Droppable droppableId={time}>
                //         {provided => (
                //             <div ref={provided.innerRef} {...provided.droppableProps} >
                //                 {minutesTillNow >= e && minutesTillNow < e+5 && now.toDateString() === new Date().toDateString()?
                //                     <div  style={{height: '50px', border: '1px solid red', padding: '5px', position: 'relative'}} key={i} onDragOver={handleDragover} onDrop={() => setStartTime(time)}>
                //                         <p style={{color: 'grey', position: 'absolute', zIndex: 1}}>{time}</p>
                //                         {task.startDate.toDateString() === day && task.startTime === time ? <Task i={i}/> : <></>}
                //                     </div>
                //                     :
                //                     <div style={{height: '50px', border: '1px solid grey', padding: '5px', position: 'relative'}} key={i} onDragOver={e => handleDragover(e)} onDrop={() => setStartTime(time)}>
                //                         <p style={{color: 'grey', position: 'absolute'}}>{time}</p>
                //                         {task.startDate.toDateString() === day && task.startTime === time ? <Task i={i}/> : <></>}
                //                     </div>
                //                 }
                                
                //             </div>                               
                //         )}
                //     </Droppable>
                // )

                return (
                    <DroppableSlot id={time} key={i}>
                        {minutesTillNow >= e && minutesTillNow < e+5 && now.toDateString() === new Date().toDateString() ?
                            <div  style={{height: '50px', border: '1px solid red', padding: '5px', position: 'relative'}} key={i} >
                                <p style={{color: 'grey', position: 'absolute', zIndex: 1}}>{time}</p>
                                {task.startDate.toDateString() === day && task.startTime === time ? <Task i={i}/> : <></>}
                            </div>
                            :
                            <div style={{height: '50px', border: '1px solid grey', padding: '5px', position: 'relative'}} key={i} >
                                <p style={{color: 'grey', position: 'absolute'}}>{time}</p>
                                {task.startDate.toDateString() === day && task.startTime === time ? <Task i={i}/> : <></>}
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
            <h2 style={{color: 'white'}} onClick={() => changeDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()-1))} >{'<'}</h2>
            
            <h2 style={{textAlign: 'center', color: 'white'}} onClick={() => setPopupOpen(true)}>{now.toDateString()}</h2>
            <Popup open={popupOpen}  onClose={() => setPopupOpen(false)} position="bottom center" >
                <div className='w-100 show' style={{width: '100%'}}>
                    <Calendar className={'w-100'} onChange={changeDate} value={now} />
                </div>
            </Popup>

            <h2 style={{color: 'white'}} onClick={() => changeDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)) }>{'>'}</h2>
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
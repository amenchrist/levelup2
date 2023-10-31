import React, { useState, useEffect } from 'react';
import List from './List';
import { ADD, ASAP, MISSIONS, UNPLANNED, PENDING } from '../constants';
import { displayDays, amendList, pushChanges  } from '../functions';
import { UPDATE } from '../constants';
import DatePicker from './DatePicker';
import NewItemButton from './NewItemButton';
import Scroll from './Scroll';
import { Task } from '../classes';
import { useMyStore } from '../store';

export default function MissionDetails({ mission, db, shipItems, exp }) {

    const TaskList = useMyStore(store => store.tasks);
    let tasks = [];
    
    function getTasks(){
        
        // console.log("from get tasks ", mission)
        if(mission.taskList.length !== 0){
            for(let i=0; i<mission.taskList.length; i++){
                for(let j=0; j<TaskList.length; j++){
                    if(mission.taskList[i] === TaskList[j].id ){
                        tasks.push(TaskList[j]);
                        break;
                    }
                }
            }
        }
        //console.log(tasks);
        return tasks.sort((a,b) => a.order - b.order);
    }

    const missionTasks = getTasks();

    const [ name, setName ] = useState(mission.name);
    const [ purpose, setPurpose ] = useState(mission.purpose);
    const [ vision, setVision ] = useState(mission.vision);
    const [ principles, setPrinciples ] = useState(mission.principles);
    const [ toDo, setToDo ] = useState(mission.toDo);
    const [ skillsRequired, setSkillsRequired ] = useState(mission.skillsRequired);
    const [ infoRequired, setInfoRequired ] = useState(mission.infoRequired);
    const [ abilityRequired, setAbilityRequired ] = useState(mission.abilityRequired);
    const [ dueDate, setDueDate ] = useState(mission.dueDate);
    
    const [ backStory, setBackStory ] = useState(mission.backStory);
    const [ outputRef, setOutputRef ] = useState(mission.outputRef);
    const [ outputRecordUrl, setOutputRecordUrl ] = useState(mission.outputRecordUrl);

    const [ timeRequired, setTimeRequired ] = useState(mission.timeRequired);
    const [ timeSpent, setTimeSpent] = useState(mission.timeSpent);
    
    
    const [ requirements, setRequirements ] = useState(mission.requirements);
    const [ priority, setPriority ] = useState(mission.priority);
    const [ frequency, setFrequency ] = useState(mission.frequency);
    const [ note, setDetails ] = useState(mission.note);    
    
    const [ openPlanner, setOpenPlanner ] = useState(false);
    const [ lastUpdated, setLastUpdated ] = useState(db?.lastUpdated);
    const [ showTasks, setShowTasks ] = useState(false);

    const [ status, setStatus ] = useState(mission.status);

    const [ taskList, setTaskList ] = useState(mission.taskList);


    //purpose, principles, description, components, skillsRequired, infoRequired, abilityRequired, timeRequired, tasks

    useEffect(() => {
        setName(mission.name);
        setPurpose(mission.purpose);
        setVision(mission.vision);
        setPrinciples(mission.principles);
        setToDo(mission.toDo);
        setSkillsRequired(mission.skillsRequired);
        setInfoRequired(mission.infoRequired);
        setAbilityRequired(mission.abilityRequired);
        setDueDate(mission.dueDate);
        setBackStory(mission.backStory);
        setOutputRef(mission.outputRef);
        setOutputRecordUrl(mission.outputRecordUrl);

        setTimeRequired(mission.timeRequired);
        setLastUpdated(db?.lastUpdated);
        
        setRequirements(mission.requirements);
        setPriority(mission.priority);
        setFrequency(mission.frequency);
        setDetails(mission.note);    

        setTimeSpent(mission?.timeSpent);
        //setShowTasks(false);
        setTaskList(mission.taskList);
        setStatus(mission.status)
    }, [mission.name, mission.purpose, mission.vision, mission.principles, mission.timeRequired, 
        mission.toDo, mission.skillsRequired, mission.infoRequired, mission.abilityRequired,
        mission.dueDate, mission.backStory, mission.outputRef, mission.outputRecordUrl, db?.lastUpdated, mission.requirements, mission.priority,
        mission.frequency, mission.note, mission.timeSpent, mission.taskList, mission.status])

    function updateDB( obj, property, newVal) {

        if (obj[property] !== newVal){

            console.log(`old value (${obj[property]}) !== new value (${newVal})`)

            obj[property] = newVal;
            amendList(db, MISSIONS, mission, UPDATE, shipItems, exp)
          
        }

    }

    function saveDate(date){
        updateDB( mission, "dueDate", date )
    }

    function createTasks(listOfTasks){
        let taskNames = listOfTasks.split(",").map(t =>  t.trim());
        console.log("task names", taskNames);
        
        let currentTaskListNames = tasks.map( t => t.name);

        console.log("Current Tasks", currentTaskListNames)

        let newTaskNames = taskNames.filter(t => currentTaskListNames.indexOf(t) === -1)
        console.log("new Tasks", newTaskNames);

        if (newTaskNames.length > 0){
            newTaskNames.forEach((element, i) => {
                let nt = new Task(element.trim(), mission.name,"", mission.id, ASAP, i);
                db.Tasks.unshift(nt)
                pushChanges(ADD, nt, "Tasks", shipItems)
                mission.taskList.unshift(nt.id);
                mission.status = PENDING;
                pushChanges(UPDATE, mission, "Missions", shipItems);
                //updateDB( mission, "taskList", newTL )
            });
        }
        console.log("All Tasks", db.Tasks);
        getTasks();
    }

    switch (true){
        case mission.status === UNPLANNED && openPlanner === false:
            return (
                <div className='h-100'>
                    <Scroll>
                        <div className='h-20 w-100 pa2 pb2' >
                            <input type='text' 
                            className='bn fw7 b white bg-transparent'
                            value={name} 
                            onChange={(e)=> {setName(e.target.value);} } 
                            onBlur={() => {updateDB(mission, "name", name )} }  
                            />
                            <h4 className='fw1 white'>{displayDays(mission.dueDate)}</h4>
                        </div>
                        <div className='h-70'>
                            <div className='w-100 pl2 pb2'>
                                {/* <h5 className='fw3 white'>Due: {mission.dueDate} </h5> */}
                                <DatePicker item={mission} dueDate={dueDate} updateFunc={saveDate} />
                                {/* <h5 className='fw3 white'>Time Required: {mission.timeRequired}</h5> */}
                            </div>
                            <div className='w-100 pl2 pb2'>
                                <h5 className='fw3 white'>Status: {status}</h5>
                                {/* <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5> */}
                            </div>
                            <div className='w-100 pl2 pt3'>
                                <h5 className='fw3 white'>Back Story: </h5>
                                <textarea rows="2" cols="30" wrap='hard' 
                                className='w-80 fw3 white bn bg-transparent' 
                                value={backStory} 
                                onChange={(e)=> {setBackStory(e.target.value);} } 
                                onBlur={() =>{ updateDB(mission, "backStory", backStory ) }} 
                                />
                            </div>
                
                            <div className='w-100 flex items-center flex-column ' >
                                <button onClick={() => setOpenPlanner(true)}>PLAN</button>
                            </div>
                
                            <div className='flex justify-between items-center'>
                                <h5 className='bb b--white pa2 fw3 white b' >TASKS</h5>
                                <NewItemButton />
                            </div> 
                            <div className='pa2'>
                                <List content={missionTasks} />
                            </div>
                        </div>
                    </Scroll>                    
                </div>
            );
            
        case openPlanner === false && mission.status !== UNPLANNED: //False
            return (
                <div className='h-100'>
                    <Scroll>
                        <div className='w-100 h-20 pa2 pb3' >
            
                            <textarea rows="2" cols="100"
                            className='bn fw7 b white bg-transparent'
                            value={name} 
                            onChange={(e)=> {setName(e.target.value);} } 
                            onBlur={() => {updateDB(mission, "name", name )} }  
                            />

                            <h4 className='fw1 white'>DUE: {displayDays(mission.dueDate)}</h4>
                        </div>
                        <div className='h-70'>
                            <div className='w-100 pt2 pl2 pb1'>
                                <h5 className='fw3 white'>Back Story: </h5>
                                <textarea rows="2" cols="100" 
                                className='w-80 fw3 white bn bg-transparent' 
                                value={backStory} 
                                onChange={(e)=> {setBackStory(e.target.value);} } 
                                onBlur={() =>{ updateDB(mission, "backStory", backStory ) }} 
                                />
                            </div>
                            <div className='w-100 pl2 pb2'>
                                <h5 className='fw3 white'>Purpose: </h5>
                                <textarea rows="2" cols="30" wrap='hard' 
                                className='bn fw3 b white bg-transparent' 
                                value={purpose} 
                                onChange={(e)=> {setPurpose(e.target.value);} } 
                                onBlur={() => {updateDB(mission, "purpose", purpose )} } 
                                />

                            </div>
                            <div className='w-100 pl2 pb2 flex justify-between'>
                                {/* <h5 className='fw3 white'>Due: {mission.dueDate} </h5> */}
                                <DatePicker item={mission} dueDate={dueDate} updateFunc={saveDate} />
                                {/* <h5 className='fw3 white'>Time Required: {mission.timeRequired}</h5> */}
                            </div>
                            <div className='w-100pl2 pl2 pb3 flex justify-between'>
                                <h5 className='fw3 white'>Status: {mission.status}</h5>
                                {/* <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5> */}
                            </div>

                            <div className='w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                                <button onClick={() => setOpenPlanner(true)}>PLANS</button>
                            </div>

                            <div className='flex justify-between items-center'>
                                <h5 className='bb b--white pa2 fw3 white b' >TASKS</h5>
                                <NewItemButton />
                            </div> 
                            <div className='pa2'>
                                <List content={missionTasks}  />
                            </div>
                        </div>
                        
                    </Scroll>
                </div>
            );
        case openPlanner: //True
                if (showTasks){
                    return (
                    <div className='pa2 h-100'>
                        <button onClick={()=> setShowTasks(false)}>CLOSE TASKS</button>
                        <Scroll>
                            <List content={missionTasks} />
                        </Scroll>
                    </div>)
                } else {
                    return (
                        <div className=' h-100 '>
                            <Scroll>
                            <div className=' w-100 center br1 ba b--black-10 '>
                                <h1 className='b white f3'>PLAN</h1>
                                <div className='pb4'>
                                    <h5 className='fw3 white'>What's the desired Outcome?</h5>
                                    <input type='text' 
                                        className='bn fw7 b pa1'
                                        value={name} 
                                        onChange={(e)=> {setName(e.target.value);} } 
                                        onBlur={() => {updateDB(mission, "name", name )} }  
                                    />
                                </div>
                                
                                <div className='pb4'>
                                    <h5 className='fw3 white'>What's the Purpose?</h5>
                                    <textarea rows="4" cols="30" wrap='hard'
                                    className='pb2 w-80 fw3 bn pa2' 
                                    value={purpose} 
                                    onChange={(e)=> {setPurpose(e.target.value);} } 
                                    onBlur={() =>{ updateDB(mission, "purpose", purpose ) }} 
                                    />
                                </div>
                                <div className='pb4'>
                                    <h5 className='fw3 white'>Vision: Describe what you see:</h5>
                                    <textarea rows="4" cols="30" wrap='hard'  
                                    className='w-80 fw3 bn pa2' 
                                    value={vision} 
                                    onChange={(e)=> {setVision(e.target.value);} } 
                                    onBlur={() =>{ updateDB(mission, "vision", vision ) }} 
                                    />
                                </div>
                                <div className='pb4'>
                                    <h5 className='fw3 white'>Principles/Criteria/Specifications:</h5>
                                    <textarea rows="4" cols="150"  
                                    className='w-80 fw3 bn pa2' 
                                    value={principles} 
                                    onChange={(e)=> {setPrinciples(e.target.value);} } 
                                    onBlur={() =>{ updateDB(mission, "principles", principles ) }} 
                                    />
                                </div>
                                <div className='pb4'>
                                    <h5 className='fw3 white'>To do / Next Actions (Brainstorming Output):</h5>
                                    <textarea rows="4" cols="150" 
                                    className='w-80 fw3 bn pa2' 
                                    value={toDo} 
                                    onChange={(e)=> {setToDo(e.target.value);} } 
                                    onBlur={() =>{ updateDB(mission, "toDo", toDo ) }} 
                                    />
                                    <button onClick={()=> createTasks(toDo)}>CREATE TASKS</button>
                                    <button onClick={()=> setShowTasks(true)}>SHOW TASKS</button>
                                    <button onClick={()=>updateDB(mission, "taskList", [] ) }>Clear Task list</button>
                                </div>
                                <h5 className='fw3 white bb b--grey bw2 pb2'>OPTIONAL</h5>
                                <div className='pb4'>
                                    <h5 className='fw3 white'>Skills Required:</h5>
                                    <textarea rows="4" cols="150"  
                                    className='w-80 fw3 bn pa2' 
                                    value={skillsRequired} 
                                    onChange={(e)=> {setSkillsRequired(e.target.value);} } 
                                    onBlur={() =>{ updateDB(mission, "skillsRequired", skillsRequired ) }} 
                                    />
                                </div>
                                <div className='pb4'>
                                    <h5 className='fw3 white'>Knowledge/Information Required:</h5>
                                    <textarea rows="4" cols="150"  
                                    className='w-80 fw3 bn pa2' 
                                    value={infoRequired} 
                                    onChange={(e)=> {setInfoRequired(e.target.value);} } 
                                    onBlur={() =>{ updateDB(mission, "infoRequired", infoRequired ) }} 
                                    />
                                </div>
                                <div className='pb4'>
                                    <h5 className='fw3 white'>Ability Required:</h5>
                                    <textarea rows="4" cols="150" 
                                    className='w-80 fw3 bn' 
                                    value={abilityRequired} 
                                    onChange={(e)=> {setAbilityRequired(e.target.value);} } 
                                    onBlur={() =>{ updateDB(mission, "abilityRequired", abilityRequired ) }} 
                                    />
                                </div>
                                <div className='pb4'>
                                    <h5 className='fw3 white'>Time Required:</h5>
                                    <textarea rows="4" cols="150" 
                                    className='w-80 fw3 bn'
                                    value={timeRequired} 
                                    onChange={(e)=> {setTimeRequired(e.target.value);} } 
                                    onBlur={() =>{ updateDB(mission, "timeRequired", timeRequired ) }} 
                                    />
                                </div>
        
                                <button onClick={()=> {
                                    setStatus(PENDING); mission.status = PENDING; 
                                    pushChanges(UPDATE, mission, "Missions", shipItems) 
                                    }} >MARK AS PLANNED</button>
        
                                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                                    <button onClick={() => setOpenPlanner(false)}>CLOSE PLANNER</button>
                                </div>
                            </div>
                        </Scroll>
                        </div>
                    )

                }
            
    }
}

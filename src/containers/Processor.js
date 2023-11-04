import React, { useState } from 'react';
import QuestionAndOptions from '../components/QuestionAndOptions';
import QuestionandInput from '../components/QuestionAndInput';
import { Task, Mission, Reference, Event } from '../classes';
import {  PROCESSED, TASK, PENDING, UNPROCESSED, REFERENCE, ADD, UPDATE, REMOVE, REFERENCES, SOMEDAY, MISSIONS, TASKS, DETAILS, EVENTS, INBOX } from '../constants';
import DatePicker from '../components/DatePicker';
import { pushChanges  } from '../functions';
import TaskControls from '../components/TaskControls';
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';


export default function Processor({ nextItemID, item }) {

    const { addTask, addMission, addEvent, addReference, addItem } = useMyStore();
    const { setDbUpdatePending, updateItem } = useMyStore();

    const navigate = useNavigate();
    
    const [ outcome, setOutcome ] = useState('');
    const [ requiredContext, setRequiredContext ] = useState('');
    const [ isActionable, setIsActionable ] = useState(null);
    const [ isMultistep, setIsMultistep ] = useState(null);
    const [ isDoneInFive, setIsDoneInFive ] = useState(null);
    const [ isDelegatable, setIsDelegatable ] = useState(null);
    const [ step, setStep ] = useState(0);
    const [ nextID, setNextID ] = useState(0);
    const [ isDoneInaYear, setIsDoneInaYear ] = useState(null);
    const [ newMissionID, setNewMissionID ] = useState(0);
    const [ newTaskID, setNewTaskID ] = useState(0);
    const [ newMission, setNewMission ] = useState(null);
    const [ newTask, setNewTask ] = useState(null);
    const [ assignedAgent, setAssignedAgent ] = useState(null);
    const [ dueDate, setDueDate ] = useState(null);
    const [ trashed, setTrashed ] = useState(false);
    const [ incubated, setIncubated ] = useState(false);
    const [ referenced, setReferenced ] = useState(false);
    const [ newReference, setNewReference ] = useState(null);
    const [ refDetails, setRefDetails ] = useState('');
    const [ newEvent, setNewEvent ] = useState(null);


    function makeNewMission(){
        let proj = new Mission( outcome );
        setNewMission(proj);
        setNewMissionID(proj.id);

        addItem(proj);

        updateStatus();

        setNextID(proj.id);
    }

    function makeNewTask(name){
        let asProjID;
        let theOutcome = outcome;
        if (isMultistep === true) {
            theOutcome = '';
            asProjID = newMissionID;
        }

        let task = new Task(name, theOutcome, requiredContext, asProjID);
        setNewTask(task);
        console.log("new task = ",task);
        setNextID(task.id);  

        //ADD TASK TO TASK LIST AND 
        addItem(task)

        setNewTaskID(task.id);  
    }

    function makeNewReference(name){ 

        let ref = new Reference(name);
        setNewReference(ref);
        
        addItem(ref);

        setNextID(ref.id); 
        // console.log("new ref = ", ref);


    }

    function makeNewEvent(name){ 

        let ev = new Event(name);
        setNewEvent(ev);

        addItem(ev);
        updateStatus()
        
        setNextID(ev.id); 
        // console.log("new event = ", ev);

    }

    function updateStatus() {
        item.status = PROCESSED;
        item.processedDate = new Date().toISOString().substr(0, 10);
        updateItem(item);
    }
    
    function processNextItem(e){
        setStep(0);
        navigate(`/Inbox/${nextItemID}`);
    }

    function proceed() {
        setStep((step+1));
    }

    function refresh(){
        navigate(`/Inbox/${item.id}`);
    }
    
    if (item.status === UNPROCESSED && step === 0){
        proceed();
    }

    function viewNewReference(id) {
        navigate(`/Reference/${id}`);
    }

    function viewNewEvent(id) {
        navigate(`/Event/${id}`);
    }

    function saveDate(date){
        // updateDB( mission, "dueDate", date )
    }

    function trashItem() {
        setTrashed(true); item.isTrashed = true; updateStatus(); proceed();
    }

    function addToReferences() {
        setReferenced(true); 
        makeNewReference(item.name); 
        proceed();
    }

    function addToEvents() {
         setIncubated(true); makeNewEvent(item.name); proceed();
    }

    switch(true) {
        case ( step === 1 ): //Is this item actionable?
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Is this Actionable?' 
                    yes={() => { setIsActionable(true); proceed() }} 
                    no={() => { setIsActionable(false); proceed() }} />
                </div>
            )
        case ( isActionable === false && step === 2 ): //As it's not actionable Present options to Add to reference or create an event reminder or trash item
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <button className="button" id={nextItemID} onClick={() => addToReferences()} >ADD TO REFERENCES</button>
                    <button className="button" id={nextItemID} onClick={() => addToEvents()} >ADD TO EVENTS</button>
                    <button className="button" id={nextItemID} onClick={() => trashItem() } >TRASH</button>
                </div>
            )
        case ( trashed === true && step === 3 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>Item has been trashed</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                </div>
            )
        case ( isActionable === false && step === 3 && referenced === true ):
            //
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column'>
                    <h2 className='white tc pb2'>Any details to add?</h2>
                    <form onSubmit={(e) => { 
                        newReference.details = refDetails; 
                        updateItem(newReference);
                        updateStatus(); 
                        e.preventDefault(); 
                        proceed() 
                    }}>
                        <textarea rows="4" cols="45" autoFocus value={refDetails} onChange={(e)=> setRefDetails(e.target.value)} />
                        <input type='submit' value='submit' />
                    </form>
                </div>
            )
        case ( isActionable === false && step === 3 && incubated === true ):
            function saveEventDate(date){
                newEvent.date = date;
            }
        
        return (
            <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column'>
                <h2 className='white tc pb2'>Date of Event?</h2>
                <DatePicker item={newEvent} dueDate={newEvent.date} updateFunc={saveEventDate}/>
                <div>
                    <button className="button" onClick={() => { 
                        addItem(newEvent);
                        updateStatus(); 
                        proceed(); 
                    }} >CONTINUE</button>
                </div>
                
            </div>
        )
        case ( isActionable === false && step === 4 ):
            if (referenced === true ) {}
            if (incubated === true ) {}
            // Added to references
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>Item has been processed</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    <button className="button" id={nextItemID} onClick={() => {
                        referenced === true ? viewNewReference(nextID) : viewNewEvent(nextID)
                    }} >VIEW ITEM</button>
                </div>
            )
        case ( isActionable === true && step === 2 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="What's the desired outcome?" submitFunction={(answer) => { setOutcome(answer); proceed() }} />
                </div>
            )
        case ( step === 3 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can the outcome be reached with just one task?' 
                    yes={() => { setIsMultistep(false); proceed(); } } 
                    no={() => { setIsMultistep(true); proceed();  makeNewMission(); }} />
                </div>
            )
            
        case ( isMultistep === false && step === 4 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="What's the task?" 
                    submitFunction={(answer) => {
                        makeNewTask(answer);
                        proceed(); 
                    }} />
                </div>
            )
        case ( isMultistep === true && step === 4 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="What's the first task?" 
                    submitFunction={(answer) => { 
                        makeNewTask(answer); 
                        proceed(); 
                        }} />
                </div>
            )
        case ( isMultistep === true && step === 5 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can the desired outcome be reached within the next 12 months?' 
                    yes={() => { 
                        setIsDoneInaYear(true); 
                        newMission.taskList.unshift(newTask.id);
                        addItem(newMission)
                    }} 
                    no={() => { 
                        newMission.taskList.unshift(newTask.id); 
                        newMission.dueDate = SOMEDAY
                        updateItem(newMission);
                        setIsDoneInaYear(false); 
                        updateStatus(); 
                        proceed();
                    }} />
                </div>
            )
        case ( isMultistep === false && step === 5 ):
            // console.log("step 5. new task: ", newTask);
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can the desired outcome be reached within the next 12 months?' 
                    yes={() => { setIsDoneInaYear(true); proceed() }} 
                    no={() => { 
                        newTask.dueDate = SOMEDAY
                        setIsDoneInaYear(false); 
                        updateStatus(); 
                        proceed() }} />
                </div>
            )
        case ( isMultistep === true && step === 6 && isDoneInaYear === true ):
            // New mission was added and page refreshed
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>A new Mission has been added</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    <button className="button" id={nextItemID} onClick={() => navigate(`/Mission/${newMissionID}`)} >VIEW MISSION</button>
                </div>
            )
        case ( isMultistep === true && step === 6 && isDoneInaYear === false ):
            // New mission was added and page refreshed
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>A new Mission has been added to the Someday List</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    {/* <button className="button" id={nextItemID} onClick={() => changeItemID(nextID)} >VIEW MISSION</button> */}
                </div>
            )
        case ( isMultistep === false && step === 6 && isDoneInaYear === false ):
            // New mission was added and page refreshed
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>A new Task has been added to the Someday List</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    {/* <button className="button" id={nextItemID} onClick={() => changeItemID(nextID)} >VIEW MISSION</button> */}
                </div>
            )
        case ( isMultistep === false && step === 6 && isDoneInaYear === true ):
            console.log("step 5. new task: ", newTask);
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can it be done now in 5 minutes or less?' 
                    yes={() => { 
                        setIsDoneInFive(true); 
                        addItem(newTask);
                    }} 
                    no={() => { setIsDoneInFive(false); proceed() }} />
                </div>
            )
        case (isDoneInFive === true && step === 7):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <h2 className='fw8 b white pb2'>LET'S DO IT!</h2>
                    <div className='w-100 pa2 pb3' >
                        <h3 className='fw7 b white pb2'>{newTask.name}</h3>
                    </div>
                    <button className="button" onClick={() => { updateStatus();  navigate(`/Task/${newTaskID}`) }} >GO TO TASK </button>
                    {/* <button className="button" id={nextItemID} onClick={() => changeNav(nav)} >VIEW TASK</button> */}
                </div>
            )
        case ( isDoneInFive === false && step === 7 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can this task be delegated?' 
                    yes={() => { setIsDelegatable(true); proceed(); }} 
                    no={() => { setIsDelegatable(false); proceed(); }} />
                </div>
            )
        case ( isDelegatable === true && step === 8 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="Who would you like to assign this task to?" 
                    submitFunction={(answer) => { setAssignedAgent(answer); newTask.agent = assignedAgent; proceed() }} />
                </div>
            )
        case ( isDelegatable === false && step === 8 ):
            function saveTaskDate(date){
                //updateDB( mission, "dueDate", date )
                newTask.dueDate = date;
            }
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <h2 className='fw4 white'>By when should this task to be done</h2>
                    <DatePicker item={newTask} dueDate={newTask.dueDate} updateFunc={saveTaskDate} />
                    <div>
                        {/* <button className="button" onClick={() => { setDueDate("ASAP"); console.log(newTask); proceed(); }}>ASAP</button> */}
                        <button className="button" onClick={() => { setDueDate(newTask.dueDate); proceed(); }} >CONTINUE</button>
                    </div>
                </div>
            )
        case ( isDelegatable === false && step === 9 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="Where should this task be done?" 
                    submitFunction={(answer) => { 
                        setRequiredContext(answer); 
                        newTask.requiredContext = answer;
                        addItem(newTask);                       
                        proceed(); }} />
                </div>
            )
        case ( step === 10 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show flex items-center flex-column' >
                    <h3 className='white tc pb2'>A new Task has been added</h3>
                    <button className="button" id={nextItemID} onClick={ processNextItem } >PROCESS NEXT ITEM</button>
                    <button className="button" id={nextItemID} onClick={() => navigate(`/Task/${newTaskID}`)} >VIEW TASK</button>
                </div>
            )
        default:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                </div>
            )
    }
}

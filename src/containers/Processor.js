import React, { useEffect, useRef, useState } from 'react';
import QuestionAndOptions from '../components/QuestionAndOptions';
import QuestionAndInput from '../components/QuestionAndInput';
import { Task } from '../classes/Task';
import { Mission } from '../classes/Mission';
import Event from '../classes/Event';
import Reference from '../classes/Reference';
import {  PROCESSED, TASK, PENDING, UNPROCESSED, REFERENCE, ADD, UPDATE, REMOVE, REFERENCES, SOMEDAY, MISSIONS, TASKS, DETAILS, EVENTS, INBOX } from '../constants';
import DatePicker from '../components/DatePicker';
import { pushChanges  } from '../functions';
import TaskControls from '../components/TaskControls';
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';
import QuestionAndTextarea from '../components/QuestionAndTextarea';
import NewReference from '../components/NewReference';
import NewEvent from '../components/NewEvent';
import NewTask from '../components/NewTask';
import Scroll from '../components/Scroll';

export default function Processor({ nextItem, item }) {

    const { setDbUpdatePending, updateItem } = useMyStore();
    const { addTask, addMission, addEvent, addReference, addItem,  } = useMyStore();
    // const { addTask, addMission, addEvent, addReference, addItem, setProcessorStage, processorStage } = useMyStore();

    const navigate = useNavigate();
    
    const [ outcome, setOutcome ] = useState(null);
    const [ requiredContext, setRequiredContext ] = useState('');
    const [ isActionable, setIsActionable ] = useState(null);
    const [ isMultistep, setIsMultistep ] = useState(null);
    // const [ isDoneInFive, setIsDoneInFive ] = useState(null);
    // const [ isDelegatable, setIsDelegatable ] = useState(null);
    const [ step, setStep ] = useState(0);
    const [ nextID, setNextID ] = useState(0);
    // const [ isDoneInaYear, setIsDoneInaYear ] = useState(null);
    const [ newMissionID, setNewMissionID ] = useState(0);
    const [ newTaskID, setNewTaskID ] = useState(0);
    const [ newMission, setNewMission ] = useState(null);
    const [ newTask, setNewTask ] = useState(null);
    const [ assignedAgent, setAssignedAgent ] = useState(null);
    const [ dueDate, setDueDate ] = useState(null);
    const [ trashed, setTrashed ] = useState(false);
    const [ incubated, setIncubated ] = useState(false);
    const [ newReference, setNewReference ] = useState(null);
    const [ newEvent, setNewEvent ] = useState(null);
    const [ dialogOn, setDialogOn ] = useState(false);

    const [ processing, setProcessing ] = useState(false)
    const [ setProcessorStage, processorStage ] = useState(null);

    function endProcessing(obj) {
        if(obj){
            addItem(obj);
        }
        updateStatus();
    }

    function makeNewMission(){
        let proj = new Mission( outcome );
        setNewMission(proj);
        setNewMissionID(proj.id);
        setNextID(proj.id);
    }    

    function makeNewTask(name){
        let asProjID;
        let theOutcome = outcome;
        if (isMultistep === true) {
            theOutcome = '';
            asProjID = newMissionID;
        }

        let task = new Task({name, theOutcome, requiredContext, asProjID});
        setNewTask(task);
        console.log("new task = ",task);
        setNextID(task.id);
        setNewTaskID(task.id);
    }

    function updateStatus() {
        item.markAsProcessed();
				console.log({...item})
        updateItem({...item});
    }
    
    function processNextItem(e){
        // setStep(0);
        navigate(`/Inbox/${nextItem?.id}`);
    }

    function proceed(value = 1) {
        setProcessorStage(value);
        // setStep((step+1));
    }

    function refresh(){
			navigate(`/Inbox/${item.id}`);
    }
     
    if (item.status === UNPROCESSED && step === 0){
        // proceed();
    }

    function viewNewReference(id) {
        navigate(`/Reference/${id}`);
    }

    function viewNewEvent(id) {
        navigate(`/Event/${id}`);
    }

    function trashItem() {
			item.isTrashed = true;
			updateItem(item);
			navigate(`/Inbox`);
			// proceed(1);
    }

    function saveEventDate(date){
			newEvent.date = date;
    }

    function viewItem (selectedItem) {
			// endProcessing(selectedItem);
			const category = selectedItem.collection.split('').toSpliced(0,1,selectedItem.collection[0].toUpperCase()).join('');
			navigate(`/${category}s/${selectedItem.id}`);
    }

    const ProcessorWrapper = ({children}) => {
			return (
				<div className='h-60 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column ' >
					<Scroll>
						{children}
					</Scroll>
				</div>
			)
    }

    const EndOptions = ({object}) => {
			return (
				<>
					<button className="button" id={nextItem?.id} onClick={() => {endProcessing(object); viewItem(object); }} >VIEW ITEM</button>
					<button className="button" id={nextItem?.id} onClick={() => {endProcessing(object) ;processNextItem()}} >PROCESS NEXT ITEM</button>
					<button className="button" id={nextItem?.id} onClick={() => {endProcessing(object); navigate('/')}}>BACK TO DASHBOARD</button>
				</>
			)
    }  

    //Step 1: Starting point
    //Step 2: item Is not actionable
    //Step 3: Item has been trashed
    //Step 4: item has been added to references // two in one
    //Step 5: Item has been added to events
    //Step 6: 

    //Is it actionable
    //If it is, it's either a project or task
    //First is to identify the outcome
    //Then it's to identify if more than one action is required


    useEffect(()=> {
        if (item.status === PROCESSED){
            // setProcessorStage(1)
        }

    }, [item, setProcessorStage])


    function specialSubmit (id) {
        //mark item as processed
        item.markAsProcessed();
        updateItem(item)

        //advance the processor stage
        setProcessorStage(1)

        //retrieve new item id
        setNextID(id)

    }

    //========================

	const ReferencesAndEvents = () => {
		const [ addReference, setAddReference ] = useState(false);
		const [ addEvent, setAddEvent ] = useState(false);

		if(addReference){
				return ( <NewReference item={item} processorSubmit={specialSubmit} /> )
		} else if(addEvent){
				return ( <NewEvent item={item} processorSubmit={specialSubmit} /> )
		}else {
			return (
				<ProcessorWrapper>
					<button className="button" onClick={() => {setAddReference(true)}} >ADD TO REFERENCES</button>
					<button className="button" onClick={() => {setAddEvent(false)}} >ADD TO EVENTS</button>
					<button className="button" onClick={() => {trashItem()}} >TRASH</button>
				</ProcessorWrapper>
			)
		}
	}

	const TaskChecker = () => {
		const [ timeBound, setTimeBound ] = useState(null);
		const [ isAProject, setIsAProject ] = useState(null);
		const [ task, setTask ] = useState(null)
    const [ isDoneInFive, setIsDoneInFive ] = useState(null);
    const [ isDelegatable, setIsDelegatable ] = useState(null);
    const [ taskDelegated, setTaskDelegated ] = useState(null);


		if(outcome === null ){
			return ( 
				<QuestionAndInput question="What's the desired outcome?" submitFunction={(answer) => setOutcome(answer)} />
			)
		} else if(outcome && timeBound === null){
				return ( 
					<QuestionAndOptions question='Must the outcome be reached within the next 12 months?' 
            yes={() => { setTimeBound(true); }} 
						no={() => { newTask.dueDate = SOMEDAY; endProcessing(newTask); navigate(`/Task/${nextID}`) }} 
					/> 
				)
		}else if(outcome && timeBound && isAProject === null){
				return ( 
					<QuestionAndOptions question='Can the outcome be reached with just one task?' 
						yes={() => { setIsAProject(false) } } 
						no={() => { setIsAProject(true); makeNewMission(); }} 
					/>
				)
		}else if(outcome && timeBound && isAProject === false && task === null){
				return ( 
					<QuestionAndInput question="What's the task?" submitFunction={(name) => { setTask(new Task({name, outcome})) }} />
					// <QuestionAndInput question="What's the task?" submitFunction={(answer) => { makeNewTask(answer); }} />
				)
		}else if (task && isDoneInFive === null){
			return (
				<QuestionAndOptions question='Can it be done now in 5 minutes or less?' 
					yes={() => { setIsDoneInFive(true); }} 
          no={() => { setIsDoneInFive(false); }} 
				/>
			)
		}else if (isDoneInFive){
			return (
				<ProcessorWrapper>
					<h2 className='fw8 b white pb2'>LET'S DO IT!</h2>
					<div className='w-100 pa2 pb3' >
						<h3 className='fw7 b white pb2'>{task.name}</h3>
					</div>
					<button className="button" onClick={() => { addItem(task); navigate(`/Tasks/${task.id}`); updateStatus() }} >GO TO TASK </button>
					{/* <button className="button" onClick={() => { endProcessing(newTask);  navigate(`/Tasks/${task.id}`) }} >GO TO TASK </button> */}
				</ProcessorWrapper>
			)
		}else if (isDoneInFive === false && isDelegatable === null ){
			return (
				<QuestionAndOptions question='Can this task be delegated?' 
					yes={() => { setIsDelegatable(true); }} 
					no={() => { setIsDelegatable(false); }} 
				/>
			)
		}else if (isDelegatable){
			return (
				<ProcessorWrapper>
					{taskDelegated ? 
						<>
							<h3 className='white tc pb2'>A new Task has been added and delegated</h3>
							<EndOptions object={newTask} />
						</> :
						<QuestionAndInput question="Who would you like to assign this task to?" 
							submitFunction={(answer) => { task.setAssignedTo(answer); setTaskDelegated(true); addItem(task) }} 
						/>
						
						// <NewTask task={task}/>
					}
				</ProcessorWrapper>
			)
		}else if (isDelegatable === false){
			return (
				<ProcessorWrapper>
					<h3 className='white tc pb2'>A new Task has been added</h3>
          <EndOptions object={task} />
				</ProcessorWrapper>
			)
		}
	}

	switch(true) {
		case ( isActionable === null ): //Is this item actionable?
			return (
				<ProcessorWrapper>
					<QuestionAndOptions question='Is this Actionable?' yes={() => { setIsActionable(true) }} no={() => { setIsActionable(false) }} /> 
				</ProcessorWrapper>
			)
		case ( isActionable === false ): //As it's not actionable Present options to Add to reference or create an event reminder or trash item
			return (
				<ReferencesAndEvents />
			)
		case (isActionable):
			return (
				<TaskChecker />
			)
		// case (6):
		// 		return (
		// 				<></>
		// 		)
    //         //---------------------NEW TASK---------------------//
    //         //-------------------------------------------------//
    //     case (7):
    //         return (
		// 					<ProcessorWrapper>
		// 							{!newTask? 
		// 							<QuestionAndInput question="What's the task?" submitFunction={(answer) => { makeNewTask(answer); }} />
		// 							:
		// 							!isDoneInaYear? 
		// 							<QuestionAndOptions question='Can the outcome be reached within the next 12 months?' 
		// 							yes={() => { setIsDoneInaYear(true); }} no={() => { newTask.dueDate = SOMEDAY; endProcessing(newTask); navigate(`/Task/${nextID}`) }} />
		// 							:<></>
		// 							}
		// 					</ProcessorWrapper>
    //         )
    //     case ( isMultistep === false && step === 6 && isDoneInaYear === false ):
    //         return (
    //             <ProcessorWrapper>
    //                 <h3 className='white tc pb2'>A new Task has been added to the Someday List</h3>
    //                 <EndOptions object={newTask} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isMultistep === false && step === 6 && isDoneInaYear === true ):
    //         console.log("step 5. new task: ", newTask);
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndOptions question='Can it be done now in 5 minutes or less?' 
    //                 yes={() => { 
    //                     setIsDoneInFive(true); 
    //                     proceed();
    //                 }} 
    //                 no={() => { setIsDoneInFive(false); proceed() }} />
    //             </ProcessorWrapper>
    //         )
    //     case (isDoneInFive === true && step === 7):
    //         return (
    //             <ProcessorWrapper>
    //                 <h2 className='fw8 b white pb2'>LET'S DO IT!</h2>
    //                 <div className='w-100 pa2 pb3' >
    //                     <h3 className='fw7 b white pb2'>{newTask.name}</h3>
    //                 </div>
    //                 <button className="button" onClick={() => { endProcessing(newTask);  navigate(`/Tasks/${newTaskID}`) }} >GO TO TASK </button>
    //             </ProcessorWrapper>
    //         )
    //     case ( isDoneInFive === false && step === 7 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndOptions question='Can this task be delegated?' 
    //                 yes={() => { setIsDelegatable(true); proceed(); }} 
    //                 no={() => { setIsDelegatable(false); proceed(); }} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isDelegatable === true && step === 8 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndInput question="Who would you like to assign this task to?" 
    //                 submitFunction={(answer) => { setAssignedAgent(answer); newTask.agent = assignedAgent; proceed() }} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isDelegatable === true && step === 9 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <h3 className='white tc pb2'>A new Task has been added</h3>
    //                 <EndOptions object={newTask} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isDelegatable === false && step === 8 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <h2 className='fw4 white'>By when should this task be done</h2>
    //                 <DatePicker item={newTask} dueDate={newTask.dueDate} updateFunc={ (date) => newTask.dueDate = date} />
    //                 <div>
    //                     <button className="button" onClick={() => { setDueDate(newTask.dueDate); proceed(); }} >CONTINUE</button>
    //                 </div>
    //             </ProcessorWrapper>
    //         )
    //     case ( isDelegatable === false && step === 9 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndInput question="Where should this task be done?" 
    //                 submitFunction={(answer) => { setRequiredContext(answer); newTask.requiredContext = answer; proceed(); }} />
    //             </ProcessorWrapper>
    //         )
    //     case ( step === 10 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <h3 className='white tc pb2'>A new Task has been added</h3>
    //                 <EndOptions object={newTask} />
    //             </ProcessorWrapper>
    //         )

    //     //------------NEW MISSION ----------------//
    //     //---------------------------------------//

    //     case ( isMultistep === true && step === 4 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndInput question="What's the first task?" 
    //                 submitFunction={(answer) => { makeNewTask(answer); proceed(); }} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isMultistep === true && step === 5 ):
    //         newMission.taskList.unshift(newTask.id);
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndOptions question='Can the desired outcome be reached within the next 12 months?' 
    //                 yes={() => { 
    //                     setIsDoneInaYear(true); 
    //                     proceed();
    //                 }} 
    //                 no={() => { 
    //                     setIsDoneInaYear(false); 
    //                     newMission.dueDate = SOMEDAY
    //                     proceed();
    //                 }} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isMultistep === true && step === 6 && isDoneInaYear === true ):
    //         // New mission was added and page refreshed
    //         return (
    //             <ProcessorWrapper>
    //                 <h3 className='white tc pb2'>A new Mission has been added</h3>
    //                 <EndOptions object={newMission} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isMultistep === true && step === 6 && isDoneInaYear === false ):
    //         // New mission was added and page refreshed
    //         return (
    //             <ProcessorWrapper>
    //                 <h3 className='white tc pb2'>A new Mission has been added to the Someday List</h3>
    //                 <EndOptions object={newMission} />

    //             </ProcessorWrapper>
    //         )
        default:
            return (
                <ProcessorWrapper>
                    <h2>ERROR</h2>
                </ProcessorWrapper>
            )
    }

    
    // switch(processorStage) {
    //     case ( 1 ): //Is this item actionable?
    //         return (
    //             <ProcessorWrapper>
    //                 {!item.processed? <QuestionAndOptions question='Is this Actionable?' 
    //                 yes={() => { proceed(5) }} 
    //                 no={() => { proceed(2) }} /> :
    //                 <></>
    //                 }                    
    //             </ProcessorWrapper>
    //         )
    //     case ( 2 ): //As it's not actionable Present options to Add to reference or create an event reminder or trash item
    //         return (
    //             <ProcessorWrapper>
    //                 <button className="button" onClick={() => {proceed(3)}} >ADD TO REFERENCES</button>
    //                 <button className="button" onClick={() => {proceed(4)}} >ADD TO EVENTS</button>
    //                 <button className="button" onClick={() => {trashItem()}} >TRASH</button>
    //             </ProcessorWrapper>
    //         )
    //     case (3):
    //         return (
    //             <ProcessorWrapper>
    //                 <NewReference item={item} processorSubmit={specialSubmit} />
    //             </ProcessorWrapper>
    //         )
    //     case (4):
    //         return (
    //             <ProcessorWrapper>
    //                 <NewEvent item={item} processorSubmit={specialSubmit} />
    //             </ProcessorWrapper>
    //         )
    //     case (5):
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndInput question="What's the desired outcome?" submitFunction={(answer) => { setOutcome(answer); proceed(6) }} />
    //             </ProcessorWrapper>
    //         )
    //     case (6):
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndOptions question='Can the outcome be reached with just one task?' 
    //                 yes={() => { proceed(7) } } 
    //                 no={() => { setIsMultistep(true); makeNewMission(); proceed(); }} />
    //             </ProcessorWrapper>
    //         )
    //         //---------------------NEW TASK---------------------//
    //         //-------------------------------------------------//
    //     case (7):
    //         return (
    //             <ProcessorWrapper>
    //                 {!newTask? 
    //                 <QuestionAndInput question="What's the task?" submitFunction={(answer) => { makeNewTask(answer); }} />
    //                 :
    //                 !isDoneInaYear? 
    //                 <QuestionAndOptions question='Can the outcome be reached within the next 12 months?' 
    //                 yes={() => { setIsDoneInaYear(true); }} no={() => { newTask.dueDate = SOMEDAY; endProcessing(newTask); navigate(`/Task/${nextID}`) }} />
    //                 :<></>
    //                 }
    //             </ProcessorWrapper>
    //         )
    //     case ( isMultistep === false && step === 6 && isDoneInaYear === false ):
    //         return (
    //             <ProcessorWrapper>
    //                 <h3 className='white tc pb2'>A new Task has been added to the Someday List</h3>
    //                 <EndOptions object={newTask} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isMultistep === false && step === 6 && isDoneInaYear === true ):
    //         console.log("step 5. new task: ", newTask);
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndOptions question='Can it be done now in 5 minutes or less?' 
    //                 yes={() => { 
    //                     setIsDoneInFive(true); 
    //                     proceed();
    //                 }} 
    //                 no={() => { setIsDoneInFive(false); proceed() }} />
    //             </ProcessorWrapper>
    //         )
    //     case (isDoneInFive === true && step === 7):
    //         return (
    //             <ProcessorWrapper>
    //                 <h2 className='fw8 b white pb2'>LET'S DO IT!</h2>
    //                 <div className='w-100 pa2 pb3' >
    //                     <h3 className='fw7 b white pb2'>{newTask.name}</h3>
    //                 </div>
    //                 <button className="button" onClick={() => { endProcessing(newTask);  navigate(`/Tasks/${newTaskID}`) }} >GO TO TASK </button>
    //             </ProcessorWrapper>
    //         )
    //     case ( isDoneInFive === false && step === 7 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndOptions question='Can this task be delegated?' 
    //                 yes={() => { setIsDelegatable(true); proceed(); }} 
    //                 no={() => { setIsDelegatable(false); proceed(); }} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isDelegatable === true && step === 8 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndInput question="Who would you like to assign this task to?" 
    //                 submitFunction={(answer) => { setAssignedAgent(answer); newTask.agent = assignedAgent; proceed() }} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isDelegatable === true && step === 9 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <h3 className='white tc pb2'>A new Task has been added</h3>
    //                 <EndOptions object={newTask} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isDelegatable === false && step === 8 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <h2 className='fw4 white'>By when should this task be done</h2>
    //                 <DatePicker item={newTask} dueDate={newTask.dueDate} updateFunc={ (date) => newTask.dueDate = date} />
    //                 <div>
    //                     <button className="button" onClick={() => { setDueDate(newTask.dueDate); proceed(); }} >CONTINUE</button>
    //                 </div>
    //             </ProcessorWrapper>
    //         )
    //     case ( isDelegatable === false && step === 9 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndInput question="Where should this task be done?" 
    //                 submitFunction={(answer) => { setRequiredContext(answer); newTask.requiredContext = answer; proceed(); }} />
    //             </ProcessorWrapper>
    //         )
    //     case ( step === 10 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <h3 className='white tc pb2'>A new Task has been added</h3>
    //                 <EndOptions object={newTask} />
    //             </ProcessorWrapper>
    //         )

    //     //------------NEW MISSION ----------------//
    //     //---------------------------------------//

    //     case ( isMultistep === true && step === 4 ):
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndInput question="What's the first task?" 
    //                 submitFunction={(answer) => { makeNewTask(answer); proceed(); }} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isMultistep === true && step === 5 ):
    //         newMission.taskList.unshift(newTask.id);
    //         return (
    //             <ProcessorWrapper>
    //                 <QuestionAndOptions question='Can the desired outcome be reached within the next 12 months?' 
    //                 yes={() => { 
    //                     setIsDoneInaYear(true); 
    //                     proceed();
    //                 }} 
    //                 no={() => { 
    //                     setIsDoneInaYear(false); 
    //                     newMission.dueDate = SOMEDAY
    //                     proceed();
    //                 }} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isMultistep === true && step === 6 && isDoneInaYear === true ):
    //         // New mission was added and page refreshed
    //         return (
    //             <ProcessorWrapper>
    //                 <h3 className='white tc pb2'>A new Mission has been added</h3>
    //                 <EndOptions object={newMission} />
    //             </ProcessorWrapper>
    //         )
    //     case ( isMultistep === true && step === 6 && isDoneInaYear === false ):
    //         // New mission was added and page refreshed
    //         return (
    //             <ProcessorWrapper>
    //                 <h3 className='white tc pb2'>A new Mission has been added to the Someday List</h3>
    //                 <EndOptions object={newMission} />

    //             </ProcessorWrapper>
    //         )
    //     default:
    //         return (
    //             <ProcessorWrapper>
    //                 <h2>ERROR</h2>
    //             </ProcessorWrapper>
    //         )
    // }
}

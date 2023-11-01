import React, { useState } from 'react';
import { PENDING, LOW, MEDIUM, HIGH, MISSION, ADD, MISSIONS, DETAILS, SOMEDAY, UNPLANNED, ASAP } from '../constants';
import { Mission } from '../classes';
import { pushChanges, convertDateToMilliseconds  } from '../functions';
import DatePicker from './DatePicker';
import Scroll from './Scroll';
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { uploadNewMission } from '../api';

export default function NewMission({ updateExp, shipItems, changeNav, db }) {

    const { addMission } = useMyStore();

    const navigate = useNavigate();

    let today = new Date().toISOString().substr(0, 10);
    
    const [ outcome, setOutcome ] = useState('');
    const [ purpose, setPurpose ] = useState('');
    const [ vision, setVision ] = useState('');
    const [ principles, setPrinciples ] = useState('');
    const [ toDo, setToDo ] = useState('');
    const [ skillsRequired, setSkillsRequired ] = useState('');
    const [ infoRequired, setInfoRequired ] = useState('');
    const [ abilityRequired, setAbilityRequired ] = useState('');
    const [ dueDate, setDueDate ] = useState(ASAP);
    
    const [ backStory, setBackStory ] = useState('');

    const [ timeRequired, setTimeRequired ] = useState('');
    
    
    const [ requirements, setRequirements ] = useState('');
    const [ priority, setPriority ] = useState('');

    const [ status, setStatus ] = useState(UNPLANNED);


    function submitNewItem() {
        // event.preventDefault();
        
        let m = new Mission(outcome.trim(), purpose, dueDate, requirements, priority);
        m.vision = vision;
        m.principles = principles;
        m.toDo = toDo;
        m.skillsRequired = skillsRequired;
        m.infoRequired = infoRequired;
        m.abilityRequired = abilityRequired;
        m.backStory = backStory;
        m.timeRequired = timeRequired;
        m.status = status;

        addMission(m);
        uploadNewMission(m);
        // updateExp(5);

        navigate(`/Missions/${m.id}`);
    }  

    return (
        <div className='h-100 w-100 center br1 pa2'>
            <div className='h-80 pa2' title={MISSION}>
                <h1 className='tc b gold f3'>NEW MISSION</h1>
                <Scroll>
                    
                    <form className='flex flex-column'>
                    <div className='pb4'>
                        <h5 className='fw3 white'>What's the Back story?</h5>
                        <textarea autoFocus rows="4" cols="30" wrap='hard'
                        className='pb2 w-100 fw3 bn pa2' 
                        value={backStory} 
                        onChange={(e)=> {setBackStory(e.target.value);} } 
                        />
                    </div>

                    <div className='pb4'>
                        <h5 className='fw3 white'>What's the desired Outcome?</h5>
                        <input type='text' 
                            className='bn fw7 b pa1'
                            value={outcome} 
                            onChange={(e)=> {setOutcome(e.target.value);} }   
                        />
                    </div>
                    
                    <div className='pb4'>
                        <h5 className='fw3 white'>What's the Purpose?</h5>
                        <textarea rows="4" cols="30" wrap='hard'
                        className='pb2 w-80 fw3 bn pa2' 
                        value={purpose} 
                        onChange={(e)=> {setPurpose(e.target.value);} } 
                        />
                    </div>
                    <div className='pb4'>
                        <h5 className='fw3 white'>Vision: Describe what you see:</h5>
                        <textarea rows="4" cols="30" wrap='hard'  
                        className='w-80 fw3 bn pa2' 
                        value={vision} 
                        onChange={(e)=> {setVision(e.target.value);} } 
                        />
                    </div>
                    <div className='pb4'>
                        <h5 className='fw3 white'>Principles/Criteria/Specifications:</h5>
                        <textarea rows="4" cols="150"  
                        className='w-80 fw3 bn pa2' 
                        value={principles} 
                        onChange={(e)=> {setPrinciples(e.target.value);} } 
                        />
                    </div>
                    <div className='pb4'>
                        <h5 className='fw3 white'>DUE:</h5>
                        <DatePicker item={{}} dueDate={dueDate} updateFunc={setDueDate} />
                    </div>
                    <div className='pb4'>
                        <h5 className='fw3 white'>To do / Next Actions (Brainstorming Output):</h5>
                        <textarea rows="4" cols="150" 
                        className='w-80 fw3 bn pa2' 
                        value={toDo} 
                        onChange={(e)=> {setToDo(e.target.value);} } 
                        />
                    </div>
                    <h5 className='fw3 white bb b--grey bw2 pb2'>OPTIONAL</h5>
                    <div className='pb4'>
                        <h5 className='fw3 white'>Skills Required:</h5>
                        <textarea rows="4" cols="150"  
                        className='w-80 fw3 bn pa2' 
                        value={skillsRequired} 
                        onChange={(e)=> {setSkillsRequired(e.target.value);} } 
                        />
                    </div>
                    <div className='pb4'>
                        <h5 className='fw3 white'>Knowledge/Information Required:</h5>
                        <textarea rows="4" cols="150"  
                        className='w-80 fw3 bn pa2' 
                        value={infoRequired} 
                        onChange={(e)=> {setInfoRequired(e.target.value);} }  
                        />
                    </div>
                    <div className='pb4'>
                        <h5 className='fw3 white'>Ability Required:</h5>
                        <textarea rows="4" cols="150" 
                        className='w-80 fw3 bn' 
                        value={abilityRequired} 
                        onChange={(e)=> {setAbilityRequired(e.target.value);} } 
                        />
                    </div>
                    <div className='pb4'>
                        <h5 className='fw3 white'>Time Required:</h5>
                        <textarea rows="4" cols="150" 
                        className='w-80 fw3 bn'
                        value={timeRequired} 
                        onChange={(e)=> {setTimeRequired(e.target.value);} } 
                        />
                    </div>

                    <button onClick={()=> {
                        setStatus(PENDING); 
                        }} >MARK AS PLANNED
                    </button>
                    </form>
                    
                </Scroll>
                <div className="pt2">
                    <button onClick={()=> {
                        submitNewItem(); 
                        }} >SUBMIT
                    </button>
                </div>
            </div>
        </div>
    )
}

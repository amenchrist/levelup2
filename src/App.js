import React, { useEffect, useState } from 'react';
import './App.css';
import Router from './routes';
import { useMyStore } from './store';
import { UpdateItem, GetAll } from './api';
import { completedFilter, dailyFilter, inboxFilter, missionFilter, processedFilter, removeTrash, somedayFilter, taskFilter, todayFilter, trashFilter } from './functions';

export default function App() {

    const [ inboxFS, setInboxFS ] = useState([]);
    const [ tasksFS, setTasksFS ] = useState([]);
    const [ missionsFS, setMissionsFS ] = useState([]);
    const [ eventsFS, setEventsFS ] = useState([]);
    const [ referencesFS, setReferencesFS ] = useState([]);

    const { setAllInbox, setAllTasks, setAllMissions, setAllEvents, setAllReferences } = useMyStore();
    const { setInbox, setTasks, setMissions, setEvents, setReferences } = useMyStore();
    const { setTodaysMission, setDailyExercises, setCompleted, setProcessed, setSomeday, setTrash } = useMyStore();

    const { allInbox, allTasks, allMissions, allEvents, allReferences,  } = useMyStore();
    const { inbox, tasks, missions, events, dbUpdatePending, updateDbUpdatePending } = useMyStore();
    
    const store = useMyStore();
    console.log(store)
    useEffect(() => {
        GetAll(setInboxFS, 'inbox');
        GetAll(setTasksFS, 'task');
        GetAll(setMissionsFS, 'mission');
        GetAll(setEventsFS, 'event');
        GetAll(setReferencesFS, 'reference');
    }, []);

    useEffect(() => {
        setAllInbox(inboxFS);
    }, [inboxFS, setAllInbox]);

    useEffect(() => {
        setAllTasks(tasksFS);
    }, [tasksFS, setAllTasks]);

    useEffect(() => {
        setAllMissions(missionsFS);
    }, [missionsFS, setAllMissions]);

    useEffect(() => {
        setAllEvents(eventsFS);
    }, [eventsFS, setAllEvents]);

    useEffect(() => {
        setAllReferences(referencesFS);
    }, [referencesFS, setAllReferences]);

//---------------------------------------//

    //HANDLING LOCAL UPDATES

    useEffect(() => {
        setInbox(inboxFilter(allInbox));
    }, [allInbox, setInbox]);

    useEffect(() => {
        setTasks(taskFilter(allTasks));
    }, [allTasks, setTasks]);

    useEffect(() => {
        setMissions(missionFilter(allMissions));
    }, [allMissions, setMissions]);

    useEffect(() => {
        setEvents(removeTrash(allEvents));
    }, [allEvents, setEvents]);

    useEffect(() => {
        setReferences(removeTrash(allReferences));
    }, [allReferences, setReferences]);

    //Today's Mission
    useEffect(() => {
        setTodaysMission(todayFilter(tasks.concat(missions, events)));
    }, [tasks, missions, events, setTodaysMission]);

    //Daily Exercises
    useEffect(() => {
        setDailyExercises(dailyFilter(tasks));
    }, [tasks, setDailyExercises]);

    //Completed
    useEffect(() => {
        setCompleted(completedFilter(tasks.concat(missions)));
    }, [tasks, missions, setCompleted]);

    //Processed
    useEffect(() => {
        setProcessed(processedFilter(inbox));
    }, [inbox, setProcessed]);

    //Someday
    useEffect(() => {
        setSomeday(somedayFilter(tasks.concat(missions)));
    }, [tasks, missions, setSomeday]);

    //Trash
    useEffect(() => {
        setTrash(trashFilter(allInbox.concat(allTasks, allMissions, allEvents, allReferences)));
    }, [allInbox, allTasks, allMissions, allEvents, allReferences,  setTrash]);

    //---------------------------------------///

    useEffect(() => {        
       if (dbUpdatePending.length > 0) {
            console.log('running db syncer')
          //find and update current item
          if(UpdateItem(dbUpdatePending[0])){
            const tempArray = [...dbUpdatePending]
            console.log(tempArray.shift())

            updateDbUpdatePending(tempArray)
          }
        }
    
      }, [dbUpdatePending, updateDbUpdatePending]);


    return (
        <div className='app'>
            <Router />
        </div>
    );
}

//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8
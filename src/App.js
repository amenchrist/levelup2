import React, { useEffect, useState } from 'react';
import './App.css';
import Router from './routes';
import { useMyStore } from './store';
import { getInbox, getTasks, getMissions, getEvents, getReferences, UpdateItem } from './api';
import { completedFilter, dailyFilter, inboxFilter, missionFilter, processedFilter, removeTrash, somedayFilter, taskFilter, todayFilter, trashFilter } from './functions';
import useDbSyncer from './hooks/useDbSyncer';

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
    const { inbox, tasks, missions, events, references, dbUpdatePending, updateDbUpdatePending } = useMyStore();
    
    const store = useMyStore();
    console.log(store)
    useEffect(() => {
        getInbox(setInboxFS);
        getTasks(setTasksFS);
        getMissions(setMissionsFS);
        getEvents(setEventsFS);
        getReferences(setReferencesFS);
    }, []);

    useEffect(() => {
        setAllInbox(inboxFS);
    }, [inboxFS, setInbox]);

    useEffect(() => {
        setAllTasks(tasksFS);
    }, [tasksFS, setTasks]);

    useEffect(() => {
        setAllMissions(missionsFS);
    }, [missionsFS, setMissions]);

    useEffect(() => {
        setAllEvents(eventsFS);
    }, [eventsFS, setEvents]);

    useEffect(() => {
        setAllReferences(referencesFS);
    }, [referencesFS, setReferences]);

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
        setTodaysMission(todayFilter(tasks.concat(missions)));
    }, [tasks, missions, setTodaysMission]);

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
        setTrash(trashFilter(allInbox.concat(tasks, missions, events, references)));
    }, [inbox, tasks, missions, events, references,  setTrash]);

    //---------------------------------------///

    // const lastUpdated = useDbSyncer();

    // console.log(lastUpdated)

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
    
      }, [dbUpdatePending]);


    return (
        <div className='app'>
            <Router />
        </div>
    );
}

//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8
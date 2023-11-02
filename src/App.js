import React, { useEffect, useState } from 'react';
import './App.css';
import Router from './routes';
import { useMyStore } from './store';
import { getInbox, getTasks, getMissions, getEvents, getReferences } from './api';
import { completedFilter, dailyFilter, inboxFilter, processedFilter, removeTrash, somedayFilter, todayFilter, trashFilter } from './functions';

export default function App() {

    const [ inboxFS, setInboxFS ] = useState([]);
    const [ tasksFS, setTasksFS ] = useState([]);
    const [ missionsFS, setMissionsFS ] = useState([]);
    const [ eventsFS, setEventsFS ] = useState([]);
    const [ referencesFS, setReferencesFS ] = useState([]);

    const { setInbox, setTasks, setMissions, setEvents, setReferences } = useMyStore();
    const { setTodaysMission, setDailyExercises, setCompleted, setProcessed, setSomeday, setTrash } = useMyStore();
    const { inbox, tasks, missions, events, references } = useMyStore();



    useEffect(() => {
        getInbox(setInboxFS);
        getTasks(setTasksFS);
        getMissions(setMissionsFS);
        getEvents(setEventsFS);
        getReferences(setReferencesFS);
    }, []);

    useEffect(() => {
        setInbox(inboxFilter(inboxFS));
    }, [inboxFS, setInbox]);

    useEffect(() => {
        setTasks(removeTrash(tasksFS));
    }, [tasksFS, setTasks]);

    useEffect(() => {
        setMissions(removeTrash(missionsFS));
    }, [missionsFS, setMissions]);

    useEffect(() => {
        setEvents(removeTrash(eventsFS));
    }, [eventsFS, setEvents]);

    useEffect(() => {
        setReferences(removeTrash(referencesFS));
    }, [referencesFS, setReferences]);

//---------------------------------------//

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
        // setTrash(trashFilter(inbox.concat(tasks, missions, events, references)));
    }, [inbox, tasks, missions, events, references,  setTrash]);

    //HANDLING LOCAL UPDATES

    // useEffect(() => {
    //     setInbox(inboxFilter(inbox));
    // }, [inbox, setInbox]);

    // useEffect(() => {
    //     setTasks(removeTrash(tasks));
    // }, [tasks, setTasks]);

    // useEffect(() => {
    //     setMissions(removeTrash(missions));
    // }, [missions, setMissions]);

    // useEffect(() => {
    //     setEvents(removeTrash(events));
    // }, [events, setEvents]);

    // useEffect(() => {
    //     setReferences(removeTrash(references));
    // }, [references, setReferences]);

    


    return (
        <div className='app'>
            <Router />
        </div>
    );
}

//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8
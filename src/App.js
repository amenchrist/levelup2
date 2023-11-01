import React, { useEffect, useState } from 'react';
import './App.css';
import Router from './routes';
import { useMyStore } from './store';
import { getInbox, getTasks, getMissions, getEvents, getReferences } from './api';
import { completedFilter, dailyFilter, inboxFilter, processedFilter, removeTrash, somedayFilter, todayFilter, trashFilter } from './functions';

export default function App() {

    const [ inboxFS, setInbox ] = useState([]);
    const [ tasksFS, setTasks ] = useState([]);
    const [ missionsFS, setMissions ] = useState([]);
    const [ eventsFS, setEvents ] = useState([]);
    const [ referencesFS, setReferences ] = useState([]);

    const { addItems, addTasks, addMissions, addEvents, addReferences } = useMyStore();
    const { addTodaysMission, addDailyExercises, addCompleted, addProcessed, addSomeday, addTrash } = useMyStore();
    const { inbox, tasks, missions, events, references } = useMyStore();



    useEffect(() => {
        getInbox(setInbox);
        getTasks(setTasks);
        getMissions(setMissions);
        getEvents(setEvents);
        getReferences(setReferences);
    }, []);

    useEffect(() => {
        addItems(inboxFilter(inboxFS));
    }, [inboxFS, addItems]);

    useEffect(() => {
        addTasks(removeTrash(tasksFS));
    }, [tasksFS, addTasks]);

    useEffect(() => {
        addMissions(removeTrash(missionsFS));
    }, [missionsFS, addMissions]);

    useEffect(() => {
        addEvents(removeTrash(eventsFS));
    }, [eventsFS, addEvents]);

    useEffect(() => {
        addReferences(removeTrash(referencesFS));
    }, [referencesFS, addReferences]);

//---------------------------------------//

    //Today's Mission
    useEffect(() => {
        addTodaysMission(todayFilter(tasks.concat(missions)));
    }, [tasks, missions, addTodaysMission]);

    //Daily Exercises
    useEffect(() => {
        addDailyExercises(dailyFilter(tasks));
    }, [tasks, addDailyExercises]);

    //Completed
    useEffect(() => {
        addCompleted(completedFilter(tasks.concat(missions)));
    }, [tasks, missions, addCompleted]);

    //Processed
    useEffect(() => {
        addProcessed(processedFilter(inbox));
    }, [inbox, addProcessed]);

    //Someday
    useEffect(() => {
        addSomeday(somedayFilter(tasks.concat(missions)));
    }, [tasks, missions, addSomeday]);

    //Trash
    useEffect(() => {
        addTrash(trashFilter(inbox.concat(tasks, missions, events, references)));
    }, [inbox, tasks, missions, events, references, addTrash]);


    return (
        <div className='app'>
            <Router />
        </div>
    );
}

//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8
import React, { useEffect, useState } from 'react';
import './App.css';
import Router from './routes';
import { useMyStore } from './store';
import { UpdateItem, GetAll, UploadItem, DeleteItem, getPlayer } from './api';
import { completedFilter, dailyFilter, inboxFilter, missionFilter, processedFilter, removeTrash, somedayFilter, taskFilter, todayFilter, trashFilter } from './functions';
import dayjs from 'dayjs';

export default function App() {

    const [ inboxFDB, setInboxFDB ] = useState([]);
    const [ tasksFDB, setTasksFDB ] = useState([]);
    const [ missionsFDB, setMissionsFDB ] = useState([]);
    const [ eventsFDB, setEventsFDB ] = useState([]);
    const [ referencesFDB, setReferencesFDB ] = useState([]);
    const [ playerFDB, setPlayerFDB ] = useState({})
    
    //Retrieve Content from Database
    useEffect(() => {
        getPlayer('thechristamen', setPlayerFDB);
        GetAll(setInboxFDB, 'inbox');
        GetAll(setTasksFDB, 'task');
        GetAll(setMissionsFDB, 'mission');
        GetAll(setEventsFDB, 'event');
        GetAll(setReferencesFDB, 'reference');
    }, []);
    //Database content retrieved

    const { setPlayer } = useMyStore();
    const { setAllInbox, setAllTasks, setAllMissions, setAllEvents, setAllReferences } = useMyStore();
    const { setInbox, setTasks, setMissions, setEvents, setReferences } = useMyStore();
    const { setTodaysMission, setDailyExercises, setCompleted, setProcessed, setSomeday, setTrash } = useMyStore();

    const { allInbox, allTasks, allMissions, allEvents, allReferences, } = useMyStore();
    const { inbox, tasks, missions, events, } = useMyStore();
    const { dbUpdatePending, updateDbUpdatePending, dbUploadPending, updateDbUploadPending, dbDeletePending, updateDbDeletePending } = useMyStore();

    //Transfer Database content to local store //FDB means From Database
    useEffect(() => {
        setPlayer(playerFDB);
    }, [playerFDB, setPlayer]);

    useEffect(() => {
        setAllInbox(inboxFDB);
    }, [inboxFDB, setAllInbox]);

    useEffect(() => {
        setAllTasks(tasksFDB);
    }, [tasksFDB, setAllTasks]);

    useEffect(() => {
        setAllMissions(missionsFDB);
    }, [missionsFDB, setAllMissions]);

    useEffect(() => {
        setAllEvents(eventsFDB.sort((a,b) => dayjs(a.scheduledEndDate) - dayjs(b.scheduledEndDate) ));
    }, [eventsFDB, setAllEvents]);

    useEffect(() => {
        setAllReferences(referencesFDB);
    }, [referencesFDB, setAllReferences]);
    //Database content transferred to local store

//---------------------------------------//

    //HANDLING LOCAL UPDATES

    //Filter store content into relevant categories
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
        setCompleted(completedFilter(allTasks.concat(missions)));
    }, [tasks, allTasks, missions, setCompleted]);

    //Processed
    useEffect(() => {
        setProcessed(processedFilter(inbox));
    }, [inbox, setProcessed]);

    //Someday
    useEffect(() => {
        setSomeday(somedayFilter(allTasks.concat(missions)));
    }, [allTasks, missions, setSomeday]);

    //Trash
    useEffect(() => {
        setTrash(trashFilter(allInbox.concat(allTasks, allMissions, allEvents, allReferences)));
    }, [allInbox, allTasks, allMissions, allEvents, allReferences,  setTrash]);
    //STORE CONTENT FILTERED INTO RELEVANT CATEGORIES

    //---------------------------------------///

    //PRIMARILY TO AID WITH OFFLINE MODE. QUEUE UPDATES TILL THERE'S A DATABASE CONNECTION
    useEffect(() => {        
       if (dbUpdatePending.length > 0) {
            console.log('running db syncer')
          //find and update current item
          if(UpdateItem(dbUpdatePending[0])){
            const tempArray = [...dbUpdatePending]
            tempArray.shift()
            updateDbUpdatePending(tempArray)
          }
        }
    
      }, [dbUpdatePending, updateDbUpdatePending]);

      //PRIMARILY TO AID WITH OFFLINE MODE. QUEUE UPLOADS TILL THERE'S A DATABASE CONNECTION
      useEffect(() => {        
        if (dbUploadPending.length > 0) {
             console.log('running db syncer')
           //find and update current item
           if(UploadItem(dbUploadPending[0])){
             const tempArray = [...dbUploadPending]
             tempArray.shift()
             updateDbUploadPending(tempArray)
           }
         }
     
       }, [dbUploadPending, updateDbUploadPending ]);

    
       //PRIMARILY TO AID WITH OFFLINE MODE. QUEUE DELETES TILL THERE'S A DATABASE CONNECTION
      useEffect(() => {        
        if (dbDeletePending.length > 0) {
             console.log('running db syncer')
           //find and update current item
           if(DeleteItem(dbDeletePending[0])){
             const tempArray = [...dbDeletePending]
             tempArray.shift()
             updateDbDeletePending(tempArray)
           }
         }
     
       }, [dbDeletePending, updateDbDeletePending]);


    return (
        <div className='app'>
            <Router />
        </div>
    );
}

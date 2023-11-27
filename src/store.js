import { create } from "zustand";
import { persist } from 'zustand/middleware';

function store(set) {

    return {
        lastUpdated: 0,
        setLastUpdated: () => set(() => ({lastUpdated: new Date().getTime()})),
        user: {},
        setUser: user => set(() => ({user: user})),
        isLoggedIn: true,
        setIsLoggedIn: value => set(() => ({isLoggedIn: value})),

        allInbox: [],
        allTasks: [],
        allMissions: [],
        allReferences: [],
        allEvents: [],
        setAllInbox: items => set(() => ({allInbox: [...items]})),
        setAllTasks: items => set(() => ({allTasks: [...items]})),
        setAllMissions: items => set(() => ({allMissions: [...items]})),
        setAllEvents: items => set(() => ({allEvents: [...items]})),
        setAllReferences: items => set(() => ({allReferences: [...items]})),

        inbox: [],
        tasks: [],
        missions: [],
        events: [],
        references: [],
        setInbox: items => set(() => ({inbox: [...items]})),
        setTasks: items => set(() => ({tasks: [...items]})),
        setMissions: items => set(() => ({missions: [...items]})),
        setEvents: items => set(() => ({events: [...items]})),
        setReferences: items => set(() => ({references: [...items]})),

        today: [],
        daily: [],
        completed: [],
        processed: [],
        someday: [],
        trash: [],
        setTodaysMission: items => set(() => ({today: [...items]})),
        setDailyExercises: items => set(() => ({daily: [...items]})),
        setCompleted: items => set(() => ({completed: [...items]})),
        setProcessed: items => set(() => ({processed: [...items]})),
        setSomeday: items => set(() => ({someday: [...items]})),
        setTrash: items => set(() => ({trash: [...items]})),

        processorStage: 1,
        setProcessorStage: value => set(() => ({processorStage: value})),

        addItem: item =>  set((store) => {
            switch(item.collection){
                case 'inbox':
                    return {allInbox: [item, ...store.allInbox], dbUploadPending: [...store.dbUploadPending, item]}
                case 'task':
                    return {allTasks: [...store.allTasks, item], dbUploadPending: [...store.dbUploadPending, item]}
                case 'mission':
                return {allMissions: [item, ...store.allMissions], dbUploadPending: [...store.dbUploadPending, item]}
                case 'event':
                return {allEvents: [item, ...store.allEvents], dbUploadPending: [...store.dbUploadPending, item]}
                case 'reference':
                return {allReferences: [item, ...store.allReferences], dbUploadPending: [...store.dbUploadPending, item]}
                default: 
                return {allInbox: store.allInbox}
            }
        }),

        dbUploadPending: [],
        setDbUploadPending: item => set(store => ({dbUploadPending: [...store.dbUploadPending, item]})),
        updateDbUploadPending: items => set(() => ({dbUploadPending: [...items]})),

        updateItem: item =>  set((store) => {
            switch(item.collection){
                case 'inbox':
                    return {allInbox: store.allInbox.map( i => i.id === item.id ? item : i ), dbUpdatePending: [...store.dbUpdatePending, item]}
                case 'task':
                    return {allTasks: store.allTasks.map( i => i.id === item.id ? item : i ), dbUpdatePending: [...store.dbUpdatePending, item]}
                case 'mission':
                return {allMissions: store.allMissions.map( i => i.id === item.id ? item : i ), dbUpdatePending: [...store.dbUpdatePending, item]}
                case 'event':
                return {allEvents: store.allEvents.map( i => i.id === item.id ? item : i ), dbUpdatePending: [...store.dbUpdatePending, item]}
                case 'reference':
                return {allReferences: store.allReferences.map( i => i.id === item.id ? item : i ), dbUpdatePending: [...store.dbUpdatePending, item]}
                default: 
                return {allInbox: store.allInbox}
            }
        }),

        dbUpdatePending: [],
        setDbUpdatePending: item => set(store => ({dbUpdatePending: [...store.dbUpdatePending, item]})),
        updateDbUpdatePending: items => set(() => ({dbUpdatePending: [...items]})),
        
        deleteItem: item =>  set((store) => {
            switch(item.collection){
                case 'inbox':
                    return {allInbox: store.allInbox.filter( i => i.id !== item.id ), dbDeletePending: [...store.dbDeletePending, item]}
                case 'task':
                    return {allTasks: store.allTasks.filter( i => i.id !== item.id ), dbDeletePending: [...store.dbDeletePending, item]}
                case 'mission':
                return {allMissions: store.allMissions.filter( i => i.id !== item.id ), dbDeletePending: [...store.dbDeletePending, item]}
                case 'event':
                return {allEvents: store.allEvents.filter( i => i.id !== item.id ), dbDeletePending: [...store.dbDeletePending, item]}
                case 'reference':
                return {allReferences: store.allReferences.filter( i => i.id !== item.id ), dbDeletePending: [...store.dbDeletePending, item]}
                default: 
                return {allInbox: store.allInbox}
            }
        }),
        
        dbDeletePending: [],
        setDbDeletePending: item => set(store => ({dbDeletePending: [...store.dbDeletePending, item]})),
        updateDbDeletePending: items => set(() => ({dbDeletePending: [...items]})),
    }
}

export const useMyStore = create(persist(store, {name: 'store'}));
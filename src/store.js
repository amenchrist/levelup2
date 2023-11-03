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

        // get inbox() { return inboxFilter(this.allInbox) },
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

        dbUpdatePending: [],
        setDbUpdatePending: item => set(store => ({dbUpdatePending: [...store.dbUpdatePending, item]})),
        updateDbUpdatePending: items => set(() => ({dbUpdatePending: [...items]})),
    }
}

export const useMyStore = create(persist(store, {name: 'store'}));
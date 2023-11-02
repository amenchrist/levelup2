import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { TaskList } from "./data/TaskList";
import { MissionsList } from "./data/MissionsList";
import { InboxItems } from "./data/InboxItems";
import { ASAP, DAILY, DONE, PROCESSED, SOMEDAY } from "./constants";
import { completedFilter, dailyFilter, inboxFilter, processedFilter, somedayFilter, todayFilter, trashFilter } from "./functions";

function store(set) {

    // let trash = InboxItems.concat(TaskList, MissionsList).filter(item => item.isTrashed);
    // // let inbox = InboxItems.filter((entry) => (entry.isTrashed === false) && entry.status !== PROCESSED );
    // let missions = MissionsList.filter(entry => !entry.isTrashed);
    // let tasks = TaskList.filter(entry => !entry.isTrashed);
    // let today = TaskList;
    // let daily = TaskList;
    // let completed = tasks.concat(missions);
    // let processed = InboxItems;
    // let someday = tasks.concat(missions);

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


        addItem: item => set((store) => ({allInbox: [item, ...store.allInbox]})),
        updateItem: item => set((store) => ({allInbox: store.allInbox.map( i => i.id === item.id ? item : i )})),

        addTask: task => set(store => ({tasks: [...store.allTasks, task]})),
        updateTask: item => set((store) => ({tasks: store.allTasks.map( i => i.id === item.id ? item : i )})),

        addMission: item => set((store) => ({missions: [item, ...store.allMissions]})),
        updateMission: item => set((store) => ({missions: store.allMissions.map( i => i.id === item.id ? item : i )})),

        addEvent: item => set((store) => ({events: [item, ...store.allEvents]})),
        updateEvent: item => set((store) => ({events: store.allEvents.map( i => i.id === item.id ? item : i )})),

        addReference: item => set((store) => ({references: [item, ...store.allReferences]})),
        updateReference: item => set((store) => ({references: store.allReferences.map( i => i.id === item.id ? item : i )})),
        
        

        dbUpdatePending: [],
        setDbUpdatePending: item => set(store => ({dbUpdatePending: [...store.dbUpdatePending, item]})),
        updateDbUpdatePending: items => set(store => ({dbUpdatePending: [...items]})),
    }
}

export const useMyStore = create(persist(store, {name: 'store'}));
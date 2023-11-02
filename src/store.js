import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { TaskList } from "./data/TaskList";
import { MissionsList } from "./data/MissionsList";
import { InboxItems } from "./data/InboxItems";
import { ASAP, DAILY, DONE, PROCESSED, SOMEDAY } from "./constants";

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
        isLoggedIn: false,
        setIsLoggedIn: value => set(() => ({isLoggedIn: value})),
        inbox: [],
        tasks: [],
        missions: [],
        references: [],
        events: [],
        trash: [],
        daily: [],
        today: [],
        completed: [],
        processed: [],
        someday: [],

        addItem: item => set((store) => ({inbox: [item, ...store.inbox]})),
        updateItem: item => set((store) => ({inbox: store.inbox.map( i => i.id === item.id ? item : i )})),

        addTask: task => set(store => ({tasks: [...store.tasks, task]})),
        updateTask: item => set((store) => ({tasks: store.tasks.map( i => i.id === item.id ? item : i )})),

        addMission: item => set((store) => ({missions: [item, ...store.missions]})),
        updateMission: item => set((store) => ({missions: store.missions.map( i => i.id === item.id ? item : i )})),

        addEvent: item => set((store) => ({events: [item, ...store.events]})),
        updateEvent: item => set((store) => ({events: store.events.map( i => i.id === item.id ? item : i )})),

        addReference: item => set((store) => ({references: [item, ...store.references]})),
        updateReference: item => set((store) => ({references: store.references.map( i => i.id === item.id ? item : i )})),     

        setInbox: items => set(() => ({inbox: [...items]})),
        setTasks: items => set(() => ({tasks: [...items]})),
        setMissions: items => set(() => ({missions: [...items]})),
        setEvents: items => set(() => ({events: [...items]})),
        setReferences: items => set(() => ({references: [...items]})),
        setTrash: items => set(() => ({trash: [...items]})),
        updateTrash: () => set(store => ({trash: store.inbox.concat(store.tasks, store.missions, store.events, store.references)})),
        setCompleted: items => set(() => ({completed: [...items]})),
        setDailyExercises: items => set(() => ({daily: [...items]})),
        setTodaysMission: items => set(() => ({today: [...items]})),
        setProcessed: items => set(() => ({processed: [...items]})),
        setSomeday: items => set(() => ({someday: [...items]})),

        dbUpdatePending: [],
        setDbUpdatePending: item => set(store => ({dbUpdatePending: [...store.dbUpdatePending, item]})),
        removeFromDbUpdatePending: id => set(store => ({dbUpdatePending: store.dbUpdatePending.filter(e => e !== id)})),
    }
}

export const useMyStore = create(persist(store, {name: 'store'}));
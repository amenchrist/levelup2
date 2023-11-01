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
        addTask: task => set(store => ({tasks: [...store.tasks, task]})),
        addMission: item => set((store) => ({missions: [item, ...store.missions]})),
        addReference: item => set((store) => ({references: [item, ...store.references]})),
        addEvent: item => set((store) => ({events: [item, ...store.events]})),
        addItems: items => set(() => ({inbox: [...items]})),
        addTasks: items => set(() => ({tasks: [...items]})),
        addMissions: items => set(() => ({missions: [...items]})),
        addEvents: items => set(() => ({events: [...items]})),
        addReferences: items => set(() => ({references: [...items]})),
        addTrash: items => set(() => ({trash: [...items]})),
        addCompleted: items => set(() => ({completed: [...items]})),
        addDailyExercises: items => set(() => ({daily: [...items]})),
        addTodaysMission: items => set(() => ({today: [...items]})),
        addProcessed: items => set(() => ({processed: [...items]})),
        addSomeday: items => set(() => ({someday: [...items]})),
    }
}

export const useMyStore = create(persist(store, {name: 'store'}));
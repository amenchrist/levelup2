import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { TaskList } from "./data/TaskList";
import { MissionsList } from "./data/MissionsList";
import { InboxItems } from "./data/InboxItems";
import { ASAP, DAILY, DONE, PROCESSED, SOMEDAY } from "./constants";

function store(set) {

    let trash = InboxItems.concat(TaskList, MissionsList).filter(item => item.isTrashed);
    let inbox = InboxItems.filter((entry) => (entry.isTrashed === false) && entry.status !== PROCESSED );
    let missions = MissionsList.filter(entry => !entry.isTrashed);
    let tasks = TaskList.filter(entry => !entry.isTrashed);
    let today = TaskList.filter((entry) => ((entry.dueDate !== ASAP) && ( entry.dueDate === new Date().toISOString().substr(0, 10) ) && entry.status !== DONE ));
    let daily = TaskList.filter((entry) => (entry.frequency === DAILY ) && (entry.isTrashed === false));
    let completed = tasks.concat(missions).filter( e => e.status === DONE);
    let processed = InboxItems.filter( e => e.status === PROCESSED);
    let someday = tasks.concat(missions).filter( e => e.dueDate === SOMEDAY );

    return {
        user: {},
        setUser: user => set(() => ({user: user})),
        isLoggedIn: false,
        setIsLoggedIn: value => set(() => ({isLoggedIn: value})),
        inbox: inbox,
        tasks: tasks,
        missions: missions,
        references: [],
        events: [],
        trash: trash,
        daily: daily,
        today: today,
        completed: completed,
        processed: processed,
        someday: someday,
        addItem: item => set((store) => ({inbox: [item, ...store.inbox]})),
        addTask: task => set(store => ({tasks: [...store.tasks, task]})),
        addMission: item => set((store) => ({missions: [item, ...store.missions]})),
        addReference: item => set((store) => ({references: [item, ...store.references]})),
        addEvent: item => set((store) => ({events: [item, ...store.events]})),
    }
}

export const useMyStore = create(persist(store, {name: 'store'}));
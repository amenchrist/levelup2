import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { TaskList } from "./data/TaskList";
import { MissionsList } from "./data/MissionsList";
import { InboxItems } from "./data/InboxItems";

function store(set) {

    return {
        user: {},
        setUser: user => set(() => ({user: user})),
        isLoggedIn: false,
        setIsLoggedIn: value => set(() => ({isLoggedIn: value})),
        inbox: InboxItems,
        tasks: TaskList,
        missions: MissionsList,
        references: [],
        events: [],
        addTask: task => set(store => ({tasks: [...store.tasks, task]})),
        state: { 
            id: 0,
            view: 'LIST',
            category: 'ALL'
        },
        setState: state => set(store => ({state: {...store.state, }}))
    }
}

export const useMyStore = create(persist(store, {name: 'store'}));
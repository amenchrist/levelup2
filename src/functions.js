/// For all the extra functions required in multiple places

// import { ShipItems } from "./actions";
import dayjs from "dayjs";
import { ADD, ASAP, COMPLETED, INBOX, PROCESSED, MISSIONS, REFERENCES, EVENTS, REMOVE, SOMEDAY, TASKS, TRASH, UPDATE, DONE, DAILY } from "./constants";
import { useMyStore } from './store';



export function removeTrash(arr){
    return arr.filter(item => !item.isTrashed)
}

export function inboxFilter(array) {
    return removeTrash(array).filter(entry => entry.status !== PROCESSED)
}

export function taskFilter(array) {
    return removeTrash(array).filter(entry => entry.status !== DONE)
}

export function missionFilter(array) {
    return removeTrash(array).filter(entry => entry.status !== COMPLETED)
}

export function todayFilter(array){
    return removeTrash(array).filter((entry) => (((entry.dueDate === ASAP) || ( entry.dueDate === new Date().toISOString().substr(0, 10) )) && entry.status !== DONE ))
}

export function dailyFilter(array){
    return removeTrash(array).filter((entry) => (entry.frequency === DAILY ))
}

export function completedFilter(array){
    return removeTrash(array).filter( e => e.status === DONE)
}

export function processedFilter(array){
    return removeTrash(array).filter( e => e.status === PROCESSED)
}

export function somedayFilter(array){
    return removeTrash(array).filter( e => e.dueDate === SOMEDAY )
}

export function trashFilter(array){
    return array.filter( item => item.isTrashed === true )
}

//////////////////////

export function setNavValues(e, navChanger, state){
    let targ = e.target;
    let navTitle;
    checkForTitle(targ);
    function checkForTitle (t) {
        if (t.title) {
            navTitle = t.title;
        } else {
            t = t.parentNode;
            checkForTitle (t);   
        }
    }
    let navID;
    checkForID(targ);
    function checkForID (t) {
        if (t.id) {
            navID = t.id;
        } else {
            t = t.parentNode;
            checkForID (t);   
        }
    }
    let navView;
    checkForView(targ);
    function checkForView (t) {
        //console.log("target name: ", t.tagName)
        if (t.getAttribute('data-view')) {
            navView = t.getAttribute('data-view');
        } else {
            t = t.parentNode;
            checkForView (t);   
        }
    }
   
    !(parseInt(navID) >= 0) ? navID = 0 : console.log("");

    const nav = {
        title: navTitle,
        view: navView,
        ID: navID
    }
    console.log(nav)
    navChanger(nav);
}

export function calculateTime(timeSpent){

    //CALCULATE TIME SPENT from timeSpent in seconds
    console.log("timespent from calcTime: ", timeSpent)
    let s = timeSpent;
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let seconds = s % 60;
    s = (s - seconds) / 60;
    let minutes = s % 60;
    let hours = (s - minutes) / 60;
    return `${hours.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
    ${minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
    ${seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})}` 
}


export function convertDateToMilliseconds(d) {
    let m,y;
    [y, m, d] = d.split("-"); //Split the string
     ;
     return new Date(...[y, m - 1, d]).getTime() //Return as an array with y,m,d sequence
  }


export function displayDays(dueDate){
    if (dueDate === ASAP) {
        return ASAP;
    } else {
        dueDate = new Date(dueDate).getTime()
        let days = Math.ceil((dueDate - new Date().getTime()) / (1000*60*60*24));
        switch(true){
            case days <= -1:
                return `Due ${Math.abs(days)} days ago`;
            case days > 1:
                return `${days} Days remaining`;
            case days === 1:
                return `${days} Day remaining`;
            case Math.abs(days) === 0:
                return `DUE TODAY `;
            default:
                return `${days} Days remaining`;
        }
    }
}

export function pushChanges(action, item, list, shippingFunction, exp = 10){

    let successMessage = '';
    switch(action){
        case ADD:
            successMessage = `New ${list} added`;
        break;
        case REMOVE:
            successMessage = `A ${list} was deleted`;
        break;
        case UPDATE:
            successMessage = `A ${list} was updated`;
        break;
        default:      
    }
    let state = {
        action: action,
        list: list,
        item: item,
        pushDate: (new Date()).getTime(),
        exp,
        successMessage
    }
    shippingFunction(state);
}


export function amendList(db, list, item, action, shippingFunction, expObj){
    // lists = [ MISSIONS, TASKS, INBOX, REFERENCES, EVENTS, SOMEDAY, COMPLETED, PROCESSED, TRASH ]
    
    let dbList;
    switch (list) {
        case MISSIONS:
            dbList = "Missions"
        break;
        case INBOX:
            dbList = "Inbox"
        break;
        case REFERENCES:
            dbList = "References"
        break;
        case EVENTS:
            dbList = "Events"
        break;
        case TASKS:
            dbList = "Tasks"
        break;
        case SOMEDAY:
            dbList = "Someday"
        break;
        case PROCESSED:
            dbList = "Processed"
        break;
        case TRASH:
            dbList = "Trash"
        break;
        default:
    }

    let localList = db[dbList];
    let itemndx = localList.indexOf(item);

    console.log("local list = ", localList)
    console.log("ammendment action = ", action)
    console.log("index of item = ", itemndx)
    switch (action) {
        case REMOVE:
            localList.splice(itemndx, 1);
            //pushChanges(REMOVE, item, dbList, shippingFunction);
        break;
        case ADD:
            localList.unshift(item);
            pushChanges(ADD, item, dbList, shippingFunction);
        break;
        case UPDATE:
            localList[itemndx] = item;
            pushChanges(UPDATE, item, dbList, shippingFunction);
        break;
        default:
    }

    console.log("local list post ammendment = ", localList)
}





export function reSchedule(task, updateFunc) {

    const tasks = JSON.parse(localStorage.getItem('store')).state.tasks;
    
    
    //Create an array of elements where each element represents 5 mins
    //If a task is 15 minutes long, it'd take up 3 spaces etc.
    //The first index is based on the current time rounded to the nearest multiple of 5
    //Every blank space is filled with a variable: 'BLANK'
    //If a task is 20 minutes from now, it would be at index 4 and it's id would be replicated according to the number that results from the task duration divided by 5
    //A rescheduled task will be placed at the index of the first blank series that has enough blanks for the duration of the task
    
    const BLANK = 'BLANK';
    
    
    const getNearest5 = (date = '') => Math.ceil(((new Date(date).getTime()/1000)/60)/5)*5 
    const now = getNearest5(new Date())
    console.log(tasks.map(t=> getNearest5(t.scheduledDate)).sort((a,b)=> a-b));

    //take a task
    //get the nearest time divisible by 5, call it next 5 time or next5
    //find from the existing tasks the first task that comes before next5. Call it prevTask
    //Get prevTask's suggested end time 
    //if next5 is greater than prevTask's end time + 5 minutes, or no prevTask found, let suggestedTime be next 5
    //then,
    //from the existing tasks, find the first task that comes after next5. Call it nextTask
    //if there is no next task, schedule the current task at next5. 
    //if next task exists, Check if the end time for the current task plus buffer(5 mins) is before (or less than) the start time of the next task
    //if the end time + buffer (5 mins) is less than the start, schedule current task at next5


    const schedule = ['current 5 mins', 'task1', 'task2'];
    
    // const schedule = tasks.map(t => ())


    //takes a task and RETURNS a recommended scheduled date for it
    
    //For tasks of low priority, it checks the task list by and looks for the next free slot in your calendar
    // to do this, it looks for the task scheduled soonest, checks the assumed end time based on how long the task requires, 
    // then it checks  for the next task scheduled after it,
    // if the gap between the two tasks is large enough to accommodate the task in question based on the estimated time required plus 10 minutes, 
    // the task is scheduled for that time slot between the existing tasks

    //if the task being scheduled has a higher priority it is scheduled immediately after the current task if there's one


    // it looks at all the tasks scheduled for the day

    let hasPriority = false

    const date = dayjs().format('YYYY-MM-DD');
    const time = dayjs().format('hh:mm')

    return { date: dayjs(`${date}`).toDate().toString(), time, }
}
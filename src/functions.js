/// For all the extra functions required in multiple places

// import { ShipItems } from "./actions";
import dayjs from "dayjs";
import { ADD, ASAP, COMPLETED, INBOX, PROCESSED, MISSIONS, REFERENCES, EVENTS, REMOVE, SOMEDAY, TASKS, TRASH, UPDATE, DONE, DAILY } from "./constants";
import { useMyStore } from './store';
import { Task } from "./classes/Task";



export function removeTrash(arr){
    return arr.filter(item => !item.isTrashed)
}

export function inboxFilter(array) {
    return removeTrash(array).filter(entry => entry.status !== PROCESSED)
}

export function taskFilter(array) {
    return removeTrash(array).filter(entry => entry.status !== DONE ).filter(entry => entry.status !== 'SNOOZED' )
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
    return removeTrash(array).filter( e => e.status === 'SNOOZED' )
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


export function rescheduleAll(updateFunc, store) {
    console.log(store)
    
    const getNearest5 = (date = '') => Math.ceil(((new Date(date).getTime()/1000)/60)/5)*5*60*1000;
    const next5 = getNearest5(new Date()); //Next 5 is the next timestamp from a given time that is divisible by 5 minutes
    const buffer = 5*60*1000; //5 minutes of buffer time minimum between tasks

    //Get all the tasks that ends after next5 (plus a 5 minute buffer)
    // const store = JSON.parse(localStorage.getItem('store')).state;
    const allUndoneTasks = store.tasks;
    const events = store.events;
    const getTime = (d) => { return new Date(d).getTime()}
    const schedule = events.filter(e => new Date(e.scheduledEndDate).getTime() >= new Date().getTime()).sort((a,b)=> dayjs(a.scheduledDate).valueOf() - dayjs(b.scheduledDate).valueOf()); 
    const tasks = allUndoneTasks.sort((a,b)=> parseInt(b.priority) - parseInt(a.priority)); 

    
    //FOR EDGE CONDITIONS
    if (schedule.length === 0 && tasks.length === 0) return
    if (tasks.length === 0) return

    let date = dayjs().format('YYYY-MM-DD');
    let time = dayjs().format('hh:mm');
    if(schedule.length === 0 && tasks.length > 0 ) { // There are tasks but No events Scheduled previously
        console.log('schedule is empty')
        let endTime = next5
        tasks.forEach(t => {
            const task = new Task(t);
            const scheduledDate = new Date(getNearest5(endTime)).getTime()+buffer
            date = new Date(scheduledDate).toString();
            time = dayjs(date).format('HH:mm')
            task.setScheduledDate(date);
            task.setScheduledTime(time);
            schedule.push(task)
            updateFunc(task);
            // console.log(schedule)
            endTime = task.scheduledEndDate;            
        })
        return
    } else {
        tasks.forEach((item,i) => {
            const firstItem = schedule[0];
            const firstActivityStartTime = new Date(firstItem?.scheduledDate).getTime();
            // console.log(firstItem)

            let task = new Task(item);
            if (firstActivityStartTime - next5+buffer >= (task.timeRequired*60*1000 + buffer)) {
                //There's enough time between NOW and the first task on the schedule for this task
                // console.log("There's time before the first activity");
                date = new Date(next5+buffer).toString();
                time = dayjs(date).format('HH:mm')
                task.setScheduledDate(date);
                task.setScheduledTime(time);
                schedule.push(task)
                schedule.sort((a,b)=> getTime(a.scheduledEndDate) - getTime(b.scheduledEndDate));
                updateFunc(task);
                // console.log(schedule)
                return
            } else {
                //Find the first scheduled item that ends before next5 AND is followed by a task that starts later than the current tasks required period plus buffer
                //the difference between the item's end time and the following task's start time (if following tasks exists) must be greater or equal to the current task's period

                const recommendedPredecessor = schedule.find((t,i) => {
                    // console.log('scheduling ', t.name)
                    // console.log('Searching for valid predecessor');
                    if(i === schedule.length-1) return t; // t is the last task on the schedule
                    const nextTask = schedule[i+1];
                    return new Date(nextTask.scheduledDate).getTime() - (new Date(t.scheduledEndDate).getTime()+buffer) >= (task.timeRequired*60*1000 + buffer);        
                })

                if (recommendedPredecessor) {
                    // console.log("A preceding activity has been found: ", recommendedPredecessor.name)
                    //A task has been found that this task can be scheduled right after
                    // console.log("A preceding activity has been found: ", recommendedPredecessor.name)
                    const scheduledDate = getNearest5(new Date(recommendedPredecessor.scheduledEndDate).getTime())+buffer
                    date = new Date(scheduledDate).toString();
                    time = dayjs(date).format('HH:mm')
                    task.setScheduledDate(date);
                    task.setScheduledTime(time);
                    schedule.push(task)
                    schedule.sort((a,b)=> getTime(a.scheduledEndDate) - getTime(b.scheduledEndDate));
                    updateFunc(task);
                    // console.log(schedule);
                    return

                }
                
            }


        })

    }

}





export function reSchedule(task, updateFunc) {

    //The Schedule is comprised of 5 minute blocks

    const getNearest5 = (date = '') => Math.ceil(((new Date(date).getTime()/1000)/60)/5)*5*60*1000;
    const next5 = getNearest5(new Date()); //Next 5 is the next timestamp from a given time that is divisible by 5 minutes
    const buffer = 5*60*1000; //5 minutes of buffer time minimum between tasks

    //Get all the tasks that ends after next5 (plus a 5 minute buffer)
    const store = JSON.parse(localStorage.getItem('store')).state;
    const allUndoneTasks = store.tasks
    const events = store.events
    const getTime = (d) => { return new Date(d).getTime() }
    const schedule = allUndoneTasks.concat(events).filter(t => getNearest5(t.scheduledEndDate)+buffer >= next5).sort((a,b)=> getTime(a.scheduledEndDate) - getTime(b.scheduledEndDate))

    let date = dayjs().format('YYYY-MM-DD');
    let time = dayjs().format('hh:mm');

    //

    //Find the first task that ends before next5 AND is followed by a task that starts later than the current tasks required period plus buffer
    //the difference between the task's end time and the following task's start time (if following tasks exists) must be greater or equal to the current task's period

    const recommendedPredecessor = schedule.find((t,i) => {
        if(i === schedule.length-1) return t; // t is the last task on the schedule
        console.log('Searching for valid predecessor');
        const nextTask = schedule[i+1];
        return new Date(nextTask.scheduledDate).getTime() - (new Date(t.scheduledEndDate).getTime()+buffer) >= (task.timeRequired*60*1000 + buffer);        
    })

    const firstActivityStartTime = new Date(schedule[0]?.scheduledDate).getTime();

    //Reschedule Logic
    if(schedule.length === 0 ) {
        //Schedule is empty. Schedule this task right away
        date = new Date(next5).toString();
        time = dayjs(date).format('HH:mm')
        task.setScheduledDate(date);
        task.setScheduledTime(time);
        updateFunc(task);
    } else if (firstActivityStartTime - next5+buffer >= (task.timeRequired*60*1000 + buffer)) {
        //There's enough time between NOW and the first task on the schedule for this task
        console.log("There's time before the first activity")
        date = new Date(next5+buffer).toString();
        time = dayjs(date).format('HH:mm')
        task.setScheduledDate(date);
        task.setScheduledTime(time);
        schedule.sort((a,b)=> getTime(a.scheduledEndDate) - getTime(b.scheduledEndDate))
        updateFunc(task);
    } else if (recommendedPredecessor) {
        //A task has been found that this task can be scheduled right after
        console.log("A preceding activity has been found: ", recommendedPredecessor.name)
        const scheduledDate = new Date(recommendedPredecessor.scheduledEndDate).getTime()+buffer
        date = new Date(scheduledDate).toString();
        time = dayjs(date).format('HH:mm')
        task.setScheduledDate(date);
        task.setScheduledTime(time);
        schedule.sort((a,b)=> getTime(a.scheduledEndDate) - getTime(b.scheduledEndDate))
        updateFunc(task);
    }

    
    
    //Create an array of elements where each element represents 5 mins
    //If a task is 15 minutes long, it'd take up 3 spaces etc.
    //The first index is based on the current time rounded to the nearest multiple of 5
    //Every blank space is filled with a variable: 'BLANK'
    //If a task is 20 minutes from now, it would be at index 4 and it's id would be replicated according to the number that results from the task duration divided by 5
    //A rescheduled task will be placed at the index of the first blank series that has enough blanks for the duration of the task
    
    // console.log(task);

    //take a task
    //get the nearest time divisible by 5, call it next5
    //Get the list of existing tasks that end after next5
    //Find the first task with a period that ends earlier than next 5 AND 
    //also has a difference between the period end time and the following task's start time (if following tasks exists) that is greater or equal to the current task's period


    //find from the existing tasks the first task that comes before next5. Call it prevTask
    //Get prevTask's suggested end time 
    //if next5 is greater than prevTask's end time + 5 minutes, or no prevTask found, let suggestedTime be next 5
    //then,
    //from the existing tasks, find the first task that comes after next5. Call it nextTask
    //if there is no next task, schedule the current task at next5. 
    //if next task exists, Check if the end time for the current task plus buffer(5 mins) is before (or less than) the start time of the next task
    //if the end time + buffer (5 mins) is less than the start, schedule current task at next5
    //if the current task duration plus buffer (let's call the sum taskPeriod) is greater than the next task's start time, get the next task's end time
    //

    //Sort tasks according to start time
    //filter out any task that ends before next5 (next5 is greater than the end time`)
    //get the period of the current task
    //Find the first element that has an end time greater than next5 the difference between its end time + 5 minutes  and the start time of the task that follows it is greater than the period of the current task
    //if no element meets that criteria
    //Check if last task 's period (end time plus buffer) is before next5
    //if it's before, schedule 
    
    // const schedule = tasks.map(t => ())


    //takes a task and RETURNS a recommended scheduled date for it
    
    //For tasks of low priority, it checks the task list by and looks for the next free slot in your calendar
    // to do this, it looks for the task scheduled soonest, checks the assumed end time based on how long the task requires, 
    // then it checks  for the next task scheduled after it,
    // if the gap between the two tasks is large enough to accommodate the task in question based on the estimated time required plus 10 minutes, 
    // the task is scheduled for that time slot between the existing tasks

    //if the task being scheduled has a higher priority it is scheduled immediately after the current task if there's one


    // it looks at all the tasks scheduled for the day

    // let hasPriority = false


    return //{ date: dayjs(`${date} ${time}`).toDate().toString(), time, }
}
import {TASK, PENDING, MISSION, UNPLANNED, ASAP, UNPROCESSED, INBOX_ITEM, EVENT, REFERENCE, SOMEDAY, PROCESSED } from './constants';
import { v4 as uuid } from 'uuid';


//Keep all dates in milliseconds here

export class Item{
    
    constructor(name,description='None') {
        const d= new Date();
        this.type = INBOX_ITEM;
        this.id = uuid();
        this.entryDate = d.getTime();
        this.name = name;
        this.description = '';
        this.status = UNPROCESSED;
        this.exp = 5;
        this.isTrashed = false;
        this.trashedDate = "";
        this.processedDate = "";
        this.collection = "inbox";
        this.updateStatus = (status, updateFunc) => {
            this.status = status;
            updateFunc(this);
        }
        this.markAsProcessed = (updateFunc) => {
            this.status = PROCESSED;
            this.processedDate = new Date().toISOString().substr(0, 10);
            // updateFunc(this);
        }
    }
}

export class Task{
    constructor(name,outcome, requiredContext, associatedMissionID = 0, dueDate = null, order = 0) {
        const d = new Date();
        this.type = TASK;
        this.id = uuid();
        this.entryDate = d.getTime();
        this.status = PENDING;
        this.priority = 'NONE';
        this.frequency = 'NONE';
        this.outcomeRecordID = 0;
        this.name = name;
        this.outcome = outcome;
        this.requiredContext = requiredContext;
        this.note = '';
        this.dueDate = dueDate//(new Date()).toISOString().substr(0, 10);
        this.timeRequired = 15; //in multiples of 5 minutes
        this.requirements = '';
        this.associatedMissionID = associatedMissionID;
        this.exp = 20;
        this.details = '';
        this.isTrashed = false;
        this.trashedDate = "N/A";
        this.timeSpent = 0;
        this.activeSince = 0;
        this.doneDate = "N/A";
        this.order = order;
        this.collection = "task";
        this.agent = '';
        this.startDate = null // null or a value. A task can either have a set time you want it done or an assigned time by the scheduler
        this.startTime = '00:00'; // Assigned by agent or scheduler at creation
    }
}

export class Mission{
    constructor(outcome ='', purpose ='', dueDate = ASAP, requirements = '', priority = "", frequency = '' ) {
        const d = new Date();
        this.type = MISSION;        
        this.id = uuid();
        this.entryDate = d.getTime();
        this.status = UNPLANNED;
        this.name = outcome;
        this.purpose = purpose;
        this.vision = '';
        this.principles = '';
        this.toDo = "";
        this.skillsRequired = "";
        this.infoRequired = "";
        this.abilityRequired = "";
        this.dueDate = dueDate //(new Date(parseInt((d.getTime() + 7776000000)))).toISOString().substr(0, 10); // 3 months from the date the MISSION is planned 
        this.taskList = [];
        this.backStory = ""
        this.outputRef = 0;
        this.outputRecordUrl = ""
        this.timeRequired = 7776000000;
        this.timeSpent = 0;
        this.requirements = requirements;
        this.priority = priority;
        this.frequency = frequency;
        this.note = '';
        this.isTrashed = false;
        this.trashedDate = "";
        this.doneDate = "";
        this.exp = 100;
        this.collection = "mission";

    }
}

export class Reference{
    constructor(name, details='') {
        const d= new Date();
        this.type = REFERENCE;
        this.id = uuid();
        this.entryDate = d.getTime();
        this.name = name;
        this.details = details;
        this.exp = 5;
        this.isTrashed = false;

        this.collection = "reference";

    }
}

export class Event{
    constructor(name, date = new Date().toISOString().substr(0, 10), time = "", location ='', frequency = "") {
        const d= new Date();
        this.type = EVENT;
        this.id = uuid();
        this.entryDate = d.getTime();
        this.name = name;
        this.date = date;
        this.time = time;
        this.location = "";
        this.frequency = frequency;
        this.exp = 5;
        this.note = "";
        this.isTrashed = false;
        this.trashedDate = "";

        this.collection = "event";

    }
}
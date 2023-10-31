import {TASK, PENDING, MISSION, UNPLANNED, ASAP, UNPROCESSED, INBOX_ITEM, EVENT, REFERENCE, SOMEDAY } from './constants';

export class Item{
    constructor(name,description='None') {
        const d= new Date();

        this.type = INBOX_ITEM;
        this.id = d.getTime();
        this.entryDate = d.getTime();
        this.name = name;
        this.description = '';
        this.status = UNPROCESSED;
        this.exp = 5;
        this.isTrashed = false;
        this.trashedDate = "";
        this.processedDate = "";

    }
}

export class Task{
    constructor(name,outcome, requiredContext, associatedMissionID = 0, dueDate = SOMEDAY, order = 0) {
        const d = new Date();
        this.type = TASK;
        this.id = d.getTime()+Math.ceil(Math.random()*1000);
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
        this.timeRequired = 0;
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
    }
}

export class Mission{
    constructor(outcome ='', purpose ='', dueDate = ASAP, requirements = '', priority = "", frequency = '' ) {
        const d = new Date();
        this.type = MISSION;        
        this.id = d.getTime();
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
    }
}

export class Reference{
    constructor(name, details='') {
        const d= new Date();
        this.type = REFERENCE;
        this.id = d.getTime();
        this.entryDate = d.getTime();
        this.name = name;
        this.details = details;
        this.exp = 5;
        this.isTrashed = false;
    }
}

export class Event{
    constructor(name, date = new Date().toISOString().substr(0, 10), time = "", location ='', frequency = "") {
        const d= new Date();
        this.type = EVENT;
        this.id = d.getTime();
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
    }
}
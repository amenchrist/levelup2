import { TASK, LOW, DAILY } from "./constants";

export const TaskList = [
    {
        type: TASK,
        id: 1589657001522,
        entryDate: 20,
        status: 'PENDING' ,//PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
        frequency: 0,
        timeSpent: 600000,
        priority : LOW,
        outcomeRecordID: 0, //Assigned on task completion
        name: 'Buy bread 5 ',
        outcome: 'Bread in the fridge',
        requiredContext: 'At the Supermarket',
        note: 'Brown bread preferably',
        dueDate: new Date().toISOString().substr(0, 10), //gmt timestamp
        timeRequired: 900, //In seconds
        associatedMission: {
            name: 'Mission',
            id: 1589657001530
        },
        requirements: '£1 minimum',
        exp: 10
    },
    {
        type: TASK,
        id: 1589657001523,
        entryDate: 20,
        status: 'PENDING' ,//PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
        frequency: 0,
        timeSpent: 300000,
        priority : LOW,
        outcomeRecordID: 0, //Assigned on task completion
        name: 'Buy bread 4 ',
        outcome: 'Bread in the fridge',
        requiredContext: 'At the Supermarket',
        note: 'Brown bread preferably',
        dueDate: 1589657001523, //gmt timestamp
        timeRequired: 900, //In seconds
        associatedMission: {
            name: 'Mission',
            id: 1589657001530
        },
        requirements: '£1 minimum',
        exp: 10
    },
    {
        type: TASK,
        id: 1589657001524,
        entryDate: 20,
        status: 'PENDING' ,//PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
        frequency: DAILY,
        timeSpent: 150000,
        priority : LOW,
        outcomeRecordID: 0, //Assigned on task completion
        name: 'Buy bread 3 ',
        outcome: 'Bread in the fridge',
        requiredContext: 'At the Supermarket',
        note: 'Brown bread preferably',
        dueDate: 1589657001526, //gmt timestamp
        timeRequired: 900, //In seconds
        associatedMission: {
            name: 'Mission',
            id: 1589657001531
        },
        requirements: '£1 minimum',
        exp: 10
    },
    {
        type: TASK,
        id: 1589657001525,
        entryDate: 20,
        status: 'PENDING' ,//PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
        frequency: DAILY,
        timeSpent: 400000,
        priority : LOW,
        outcomeRecordID: 0, //Assigned on task completion
        name: 'Buy bread 2',
        outcome: 'recordable product of task completion',
        requiredContext: 'At the Supermarket',
        note: 'Brown bread preferably',
        dueDate: 1589657001526, //gmt timestamp
        timeRequired: 900, //In seconds
        associatedMission: {
            name: 'Mission',
            id: 1589657001532
        },
        requirements: '£1 minimum',
        exp: 10
    },
    {
        type: TASK,
        id: 1589657001526,
        entryDate: 20,
        status: 'PENDING' ,//PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
        frequency: 0,
        timeSpent: 500000,
        priority : LOW,
        outcomeRecordID: 0, //Assigned on task completion
        name: 'Buy bread',
        outcome: 'recordable product of task completion',
        requiredContext: 'At the Supermarket',
        note: 'Brown bread preferably',
        dueDate: 1589657001526, //gmt timestamp
        timeRequired: 900, //In seconds
        associatedMission: {
            name: 'Mission',
            id: 1589657001533
        },
        requirements: '£1 minimum',
        exp: 10
    }
]

/*
this.type = INBOX_ITEM;
        this.id = d.getTime();
        this.entryDate = d.getTime();
        this.status = PENDING;
        this.frequency = ONCE;
        this.timeSpent = 0;
        this.name = name;
        this.outcome = '';
        this.requiredContext = '';
        this.description = description;
        this.requirements = '';
*/
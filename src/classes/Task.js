import { updateDoc, doc } from 'firebase/firestore';
import { db } from "../firebase";
import {TASK, PENDING,} from '../constants';
import { v4 as uuid } from 'uuid';
import { constructorHelper } from './helpers';

export class Task{
    constructor(data) {
        const d = new Date();
        const defaultObj = {
          type: TASK,
          id: uuid(),
          entryDate: d.getTime(),
          status: PENDING,
          priority: 'NONE',
          frequency: 'NONE',
          outcomeRecordID: 0,
          name: '',
          outcome: '',
          requiredContext: '',
          note: '',
          dueDate: null,//(new Date()).toISOString().substr(0, 10);
          timeRequired: 15, //in multiples of 5 minutes
          requirements: '',
          associatedMissionID: 0,
          exp: 20,
          details: '',
          isTrashed: false,
          trashedDate: "N/A",
          timeSpent: 0,
          activeSince: 0,
          doneDate: "N/A",
          order: 0,
          collection: "task",
          agent: '',
          startDate: null,// 
          startTime: '00:00', // Time 
          scheduledDate: null, // Assigned by agent or system at creation
        }

        constructorHelper.call(this, data, defaultObj)
    }

    async update(taskUpdate) {
      try {
        await updateDoc(doc(db, `task`, this.id), taskUpdate);
        const updatedTask = new Task({...this, id: this.id, ...taskUpdate})
        console.log('task Updated successfully')
        return updatedTask;
      } catch (err) {
        console.log('Error updating task')
        console.log(err);
        return false
      }
    }
}
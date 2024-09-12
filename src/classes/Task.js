import { updateDoc, doc, setDoc } from 'firebase/firestore';
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
          dueDate: null,//(new Date()).toISOString().substr(0, 10);
          timeRequired: 15, //in multiples of 5 minutes
          requirements: '',
          associatedMissionID: 0,
          exp:10,
          details: '',
          isTrashed: false,
          trashedDate: "N/A",
          timeSpent: 0,
          activeSince: 0,
          doneDate: null,
          order: 0,
          collection: "task",
          playerId: '',
          startDate: null,// 
          startTime: '00:00', // Time 
          scheduledDate: null, // Assigned by agent or system at creation
          scheduledTime: '00:00',
          scheduledEndDate: null,
        }

        constructorHelper.call(this, data, defaultObj)

        this.scheduledEndDate = new Date(this?.scheduledDate).getTime() + (this.timeRequired * 60*1000)

    }

    setScheduledEndDate () {
      this.scheduledEndDate = new Date(this.scheduledDate).getTime() + (this.timeRequired * 60*1000)
    }

    setScheduledTime (time) {
      this.scheduledTime = time
    }

    setScheduledDate (date) {
      this.scheduledDate = date
    }

    // async update(taskUpdate) {
    //   try {
    //     await updateDoc(doc(db, `task`, this.id), taskUpdate);
    //     const updatedTask = new Task({...this, id: this.id, ...taskUpdate})
    //     console.log('task Updated successfully')
    //     return updatedTask;
    //   } catch (err) {
    //     console.log('Error updating task')
    //     console.log(err);
    //     return false
    //   }
    // }

    // async uploadTask(task) {
    //   try {
    //       await setDoc(doc(db, `task`, task.id), {...task});
    //       return true
    //   } catch (err) {
    //     console.log('Error uploading task')
    //     console.log(err);
    //     return false
    //   }
    // }
}
import { ASAP, MISSION, UNPLANNED } from "../constants";
import { v4 as uuid } from 'uuid';
import { constructorHelper } from './helpers';



export class Mission{
  constructor(data) {
      const d = new Date();
      const defaultObj = {
        type : MISSION,        
        id : uuid(),
        entryDate : d.getTime(),
        status : UNPLANNED,
        name : null,
        outcome: null,
        purpose : null,
        vision : '',
        principles : '',
        toDo : "",
        skillsRequired : "",
        infoRequired : "",
        abilityRequired : "",
        dueDate : ASAP, //,new Date(parseInt((d.getTime() + 7776000000)))).toISOString().substr(0, 10); // 3 months from the date the MISSION is planned 
        taskList : [],
        backStory: "",
        outputRef : 0,
        outputRecordUrl : "",
        timeRequired : 7776000000,
        timeSpent : 0,
        requirements : '',
        priority : 0,
        frequency : '',
        note : '',
        isTrashed : false,
        trashedDate : "",
        doneDate : "",
        exp : 100,
        collection : "mission",
      }

      constructorHelper.call(this, data, defaultObj)

      
  }

 
}
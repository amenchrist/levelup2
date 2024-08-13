import { ASAP, MISSION, UNPLANNED } from "../constants";
import { v4 as uuid } from 'uuid';


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
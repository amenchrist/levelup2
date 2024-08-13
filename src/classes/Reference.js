import { REFERENCE } from "../constants";
import { v4 as uuid } from 'uuid';


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
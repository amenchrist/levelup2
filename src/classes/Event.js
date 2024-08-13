import { EVENT } from "../constants";
import { v4 as uuid } from 'uuid';

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
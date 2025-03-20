import { EVENT } from "../constants";
import { v4 as uuid } from 'uuid';
import { constructorHelper } from "./helpers";

export class Event{
  constructor(data) {
      const d= new Date();
      const defaultObj = {
        type: EVENT,
        id: uuid(),
        entryDate: d.getTime(),
        name: "",
        scheduledDate: "",
        time: "",
        location: "",
        frequency: "",
        exp: 5,
        note: "",
        isTrashed: false,
        trashedDate: "",
        scheduledEndDate: "",
        collection: "event",
      }

      constructorHelper.call(this, data, defaultObj);
  }
}
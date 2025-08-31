import { EVENT } from "../constants";
import { v4 as uuid } from 'uuid';
import { constructorHelper } from "./helpers";

export class Event{
  constructor(data) {
      const d= new Date();
      const defaultObj = {
        type: EVENT,
        id: uuid(),
        entryDate: d.getTime(), // The timestamp the event was created
        name: "",
        scheduledDate: "", //STRING Eg "Mon Mar 24 2025 08:00:00 GMT+0000 (Greenwich Mean Time)"
        time: "",
        location: "",
        frequency: "",
        exp: 5,
        note: "",
        isTrashed: false,
        trashedDate: "",
        scheduledEndDate: "", //STRING Eg "Mon Mar 24 2025 08:00:00 GMT+0000 (Greenwich Mean Time)"
        collection: "event",
      }

      constructorHelper.call(this, data, defaultObj);
  }
}
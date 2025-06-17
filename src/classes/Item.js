import { INBOX_ITEM, PROCESSED, UNPROCESSED } from "../constants";
import { v4 as uuid } from 'uuid';
import { constructorHelper } from './helpers';


export class Item {
    
//   constructor(name,description='None') {data
  constructor(data) {
    const defaultObj = {
        type: INBOX_ITEM,
        id: uuid(),
        entryDate: new Date().getTime(),
        name: "",
        description: '',
        status: UNPROCESSED,
        exp: 5,
        isTrashed: false,
        trashedDate: "",
        processedDate: "",
        collection: "inbox",
    }

    constructorHelper.call(this, data, defaultObj)

    this.updateStatus = (status, updateFunc) => {
        this.status = status;
        updateFunc(this);
    }
    this.markAsProcessed = (updateFunc) => {
        this.status = PROCESSED;
        this.processedDate = new Date().toISOString().substr(0, 10);
        // updateFunc(this);
    }
  }
}
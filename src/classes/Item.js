import { INBOX_ITEM, PROCESSED, UNPROCESSED } from "../constants";
import { v4 as uuid } from 'uuid';


export class Item{
    
  constructor(name,description='None') {
      const d= new Date();
      this.type = INBOX_ITEM;
      this.id = uuid();
      this.entryDate = d.getTime();
      this.name = name;
      this.description = '';
      this.status = UNPROCESSED;
      this.exp = 5;
      this.isTrashed = false;
      this.trashedDate = "";
      this.processedDate = "";
      this.collection = "inbox";
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
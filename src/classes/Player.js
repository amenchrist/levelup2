import Biodata from "./Biodata"
import ContactInfo from "./ContactInfo"
import { constructorHelper } from "./helpers"
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";

export default class Player {
    constructor(data){
        const defaultUser = {
            id: null,
            emailVerified: false,
            biodata: new Biodata(),
            contactInfo: new ContactInfo(),
            primaryPage: null,
            pages: [],
            likedPosts: [],
            savedPosts: [],
            events: [],
            notes: [],
            reviews: [],
            church: null,
            allowsMarketing: true,
        }
        constructorHelper.call(this, data, defaultUser) 
    }

    async updateTask(update) {
        try {
          await updateDoc(doc(db, `task`, update.id), update); // To the database
          const updatedEvent = new Event({...this, id: this.id, ...update }) // To the local store
          return updatedEvent;
        } catch (err) {
          console.log('Error updating event')
          console.log(err);
          return false
        }
      }
}
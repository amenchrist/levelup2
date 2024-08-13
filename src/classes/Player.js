import Biodata from "./Biodata"
import ContactInfo from "./ContactInfo"
import { constructorHelper } from "./helpers"
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from 'uuid';

export default class Player {
    constructor(data){
        const defaultUser = {
            id: `p-${uuid()}`,
            emailVerified: false,
            name: '',
            handle: '',
            exp: 0,
            income: '£2,000/Mo',
            debt: '£2,500',
            rank: 'F',
            streak: 0,
            race: 'God',
            biodata: {...new Biodata()},
            contactInfo: {...new ContactInfo()},
            primaryPage: null,
            church: null,
            allowsMarketing: true,
        }
        constructorHelper.call(this, data, defaultUser) 
    }

    async uploadProfile() {
      try {
          await setDoc(doc(db, `player`, this.handle), {...this});
          return true
      } catch (err) {
        console.log('Error uploading player profile')
        console.log(err);
        return false
      }
    }

    async updateExp(exp) {
      try {
        await updateDoc(doc(db, `player`, this.handle), {exp: this.exp + exp});
        const updatedPlayer = new Player({...this, id: this.id, exp: this.exp + exp })
        return updatedPlayer;
      } catch (err) {
        console.log('Error updating player exp')
        console.log(err);
        return false
      }
    }
}
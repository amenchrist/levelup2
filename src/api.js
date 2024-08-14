import { db } from "./firebase";
import { getDocs, collection, doc, setDoc, updateDoc,  deleteDoc, getDoc } from "firebase/firestore";

//INBOX
const inboxCollectionRef = collection(db, 'inbox');
//Get Current Inbox from database
export async function getInbox(setFunc) {
    try{
        const data = await getDocs(inboxCollectionRef)
        const filteredData = data.docs.map(doc => ({...doc.data()}))
        setFunc([...new Set(filteredData)])
    } catch (e) {
        console.log('Something went wrong GETTING firestore INBOX data', e);
    }
}

//TASKS
const taskCollectionRef = collection(db, 'task');
//Get Current Tasklist from database
export async function getTasks(setFunc) {
    try{
        const data = await getDocs(taskCollectionRef)
        const filteredData = data.docs.map(doc => ({...doc.data()}))
        setFunc([...new Set(filteredData)])
    } catch (e) {
        console.log('Something went wrong GETTING firestore TASKS data', e);
    }
}


//MISSIONS
const missionCollectionRef = collection(db, 'mission');
//Get Current Mission list from database
export async function getMissions(setFunc) {
    try{
        const data = await getDocs(missionCollectionRef)
        const filteredData = data.docs.map(doc => ({...doc.data()}))
        setFunc([...new Set(filteredData)])
    } catch (e) {
        console.log('Something went wrong GETTING firestore MISSIONS data', e);
    }
}


//EVENTS
const eventCollectionRef = collection(db, 'event');
//Get Current Event list from database
export async function getEvents(setFunc) {
    try{
        const data = await getDocs(eventCollectionRef)
        const filteredData = data.docs.map(doc => ({...doc.data()}))
        setFunc([...new Set(filteredData)])
    } catch (e) {
        console.log('Something went wrong GETTING firestore EVENTS data', e);
    }
}


//REFERENCES
const referenceCollectionRef = collection(db, 'reference');
//Get Current Reference list from database
export async function getReferences(setFunc) {
    try{
        const data = await getDocs(referenceCollectionRef)
        const filteredData = data.docs.map(doc => ({...doc.data()}))
        setFunc([...new Set(filteredData)])
    } catch (e) {
        console.log('Something went wrong GETTING firestore REFERENCES data', e);
    }
}


///////-------------////////

//GET all items of a specific collection

//Get Current Reference list from database
export async function GetAll(setFunc, category, currentList) {
    try{
        const data = await getDocs(collection(db, category))
        const filteredData = data.docs.map(doc => ({...doc.data()}))
        setFunc([...new Set(filteredData)])
    } catch (e) {
        console.log(`Something went wrong GETTING ALL firestore ${category} data`, e);
        setFunc([...new Set(currentList)])
    }
}

//Update ANY Item
export async function UpdateItem(item){
    let id;
    item.collection === 'player' ? id = item.handle : id = item.id;
    const itemRef = doc(db, item.collection, id )
    try{
        await updateDoc(itemRef, {...item})
        return true
    } catch(e){
        console.log(`Something went wrong UPDATING ${item.collection} item in firestore`, e);
        return false
    }
}


//Upload ANY Item
export async function UploadItem(item){
    let id;
    item.collection === 'player' ? id = item.handle : id = item.id;
    try{
        await setDoc(doc(db, item.collection, id), {...item});
        return true
    } catch(e){
        console.log(`Something went wrong UPLOADING to firestore ${item.collection} collection`, e)
        return false
    }
}

//Delete ANY Item
export async function DeleteItem(item){
    let id;
    item.collection === 'player' ? id = item.handle : id = item.id;
    try{
        await deleteDoc(doc(db, item.collection, id ), {...item});
        return true
    } catch(e){
        console.log(`Something went wrong DELETING to firestore ${item.collection} collection`, e)
        return false
    }
}

//Get current player

export const getPlayer = async (handle, setFunc) => {

    try {
      const docRef = doc(db, 'player', handle)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()){
        setFunc(docSnap.data());
      } else {
        console.log('Player not found');
        return null
      }
    } catch (err) {
      console.log(err);
      return null
    } 
  }
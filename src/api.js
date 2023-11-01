import { db } from "./firebase";
import { getDocs, collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";

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

//Upload Inbox item
export async function uploadNewItem(item){
    try{
        await setDoc(doc(db, 'inbox', item.id), {...item})
    } catch(e){
        console.log(`Something went wrong UPLOADING firestore INBOX data`, e)
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

//Upload a Task
export async function uploadNewTask(item){
    try{
        await addDoc(taskCollectionRef, {...item})
    } catch(e){
        console.log('Something went wrong UPLOADING firestore TASK data', e)
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

//Upload a Mission
export async function uploadNewMission(item){
    try{
        await addDoc(missionCollectionRef, {...item})
    } catch(e){
        console.log('Something went wrong UPLOADING firestore MISSION data', e)
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

//Upload event
export async function uploadNewEvent(item){
    try{
        await addDoc(eventCollectionRef, {...item})
    } catch(e){
        console.log('Something went wrong UPLOADING firestore EVENT data', e)
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

//Upload A Reference
export async function uploadNewReference(item){
    try{
        await addDoc(referenceCollectionRef, {...item})
    } catch(e){
        console.log('Something went wrong UPLOADING firestore REFERENCE data', e)
    }
}



///////-------------////////

//Update Item
export async function updateItem(collection, id, item){

    const itemRef = doc(db, collection, item.id )
    try{
        await updateDoc(itemRef, {...item})
    } catch(e){
        console.log('Something went wrong UPDATING item in firestore', e)
    }
}

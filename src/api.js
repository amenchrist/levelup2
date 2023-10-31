import { db } from "./firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

const inboxCollectionRef = collection(db, 'inbox');

//Get Current Inbox from database
export async function getInbox(setFunc) {
    try{
        const data = await getDocs(inboxCollectionRef)
        const filteredData = data.docs.map(doc => ({...doc.data()}))
        setFunc([...new Set(filteredData)])
    } catch (e) {
        console.log('Something went wrong GETTING firestore data', e);
    }
}

export async function uploadNewItem(item){
    try{
        await addDoc(inboxCollectionRef, {...item})
    } catch(e){
        console.log('Something went wrong UPLOADING firestore data', e)
    }
}
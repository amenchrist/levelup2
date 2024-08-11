import Address from "./Address";
import { constructorHelper } from "./helpers"

export default class ContactInfo {
    constructor(data){
        const defaultObj = {
            email: null,
            phoneNumber: null,
            address: new Address()
        };
        constructorHelper.call(this, data, defaultObj)       
    }
}
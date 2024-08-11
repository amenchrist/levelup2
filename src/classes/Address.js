export default class Address {
    constructor(data){
        const fields = [ "houseNameOrNumber", "street", "cityOrTown", "state", "county", "country", "postOrZipCode" ]
        for (const value of fields){
            this[value] = null
        }
        for (const property in data) {
            if (fields.includes(property)){
                this[property] = data[property];
            }
        }
    }
}
export default class Biodata {
    constructor(data){
        const fields = [ "firstName", "middleName", "lastName", "gender", "dateOfBirth", "maritalStatus", "title", "nationality" ]
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
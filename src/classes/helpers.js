export function constructorHelper(dataObj, defObj){
    for (const property in defObj) {
        this[property] = defObj[property];
    }
    for (const property in dataObj) {
        if (Object.keys(defObj).includes(property)){
            this[property] = dataObj[property];
        }
    }
}
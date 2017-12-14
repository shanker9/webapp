import AppDataModelSingleton from '../DataModel/AppDataModel.js';
import format from 'format-number';

export default class RowController {

    constructor() {
        this.appDataModel = AppDataModelSingleton.getInstance();
    }

    getCellValueUsingColumnKeyFromData(columnKey, jsonData) {
        let temp = this.appDataModel.dataKeysJsonpathMapper[columnKey];
        if (temp != undefined) {
            return this.getJsonValAtPath(temp,jsonData);
        }
        else {
            return '';
        }
    }

    formatNumber(number){
        let myFormat = format({prefix: '$',integerSeparator :','});
        let formattedNum = myFormat(number);
        return formattedNum;
    }


    getJsonValAtPath(path, jsonObject) {
        let pathComponents = path.split('/').slice(1), tempJson = jsonObject, temp;
        for (let i = 0; i < pathComponents.length; i++) {
            temp = tempJson[pathComponents[i]];
            if (temp == undefined) {
                return null;
            }
            tempJson = temp;
        }
        if(typeof tempJson === 'number'){
            return this.formatNumber(tempJson.toFixed(2));
        }
        return tempJson;
    }
}
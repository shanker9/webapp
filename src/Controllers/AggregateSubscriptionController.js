import AmpsControllerSingleton from '../Amps/AmpsController.js';
import AppDataModelSingleton from '../DataModel/AppDataModel.js';

export default class AggregateSubscriptionController {
    constructor(controllerRef, groupingColumnsArray, commandObject) {
        this.parentControllerRef = controllerRef;
        this.ampsController = AmpsControllerSingleton.getInstance();
        this.dataModel = AppDataModelSingleton.getInstance();
        this.columnName = groupingColumnsArray;
        this.commandObject = commandObject
        this.groupingColumnKeyMap = undefined;
        this.aggregatedRowsData = undefined;
        this.groupingColumnArray = groupingColumnsArray;
    }


    /** GROUP SUBSCRIPTION DATAHANDLER **/

    groupingSubscriptionDataHandler(message) {
        if (message.c === 'group_begin') {
            // this.groupingColumnKeyMap = new Map();
            this.aggregatedRowsData = new Map();
            return;
        } else if (message.c === 'group_end') {
            this.sowGroupDataEnd = true;
            // this.appDataModel.setGroupColumnKeyMapper(this.groupingColumnKeyMap);
            // let keyBinMapper = this.getGroupBuckets(this.appDataModel.getDataMap(),this.groupingColumnArray);
            // let groupedDat = this.mapBinDataToAggregatedRows(this.aggregatedRowsData,keyBinMapper);
            // this.appDataModel.setGroupedData(groupedDat);
            this.dataModel.setGroupedData(this.aggregatedRowsData);
            // this.appDataModel.sortGroupedDataBy('product');
            let groupedViewData = this.dataModel.createGroupedViewedData(this.dataModel.getGroupedData());
            this.dataModel.setGroupedViewData(groupedViewData);
            this.parentControllerRef.updateUIWithGroupedViewData();
            console.log(this.dataModel.getGroupedData());
            return;
        }

        if (this.sowGroupDataEnd) {
            let val = this.dataModel.getDataFromGroupedData(message.k);
            let groupHeaderRow = JSON.parse(JSON.stringify(val.groupData));

            // Only updating 

            this.mergeJsonObjects(groupHeaderRow,message.data);
            val.groupData = groupHeaderRow;
            this.parentControllerRef.updateUIAggRowWithData(val.groupData, message.k);
        } else {
            // this.aggregatedRowsData.set(message.k, message.data);
            this.aggregatedRowsData.set(message.k,{
                "groupData": message.data,
                "bucketData": null,
                "showBucketData": false,
                "isBuckedDataAggregated": false
            });
            // this.groupingColumnKeyMap.set(this.groupingColumnArray.map((val,k)=>this.getJsonValAtPath(this.appDataModel.dataKeysJsonpathMapper[val],message.data)).join('-'), message.k);
        }
    }

    getJsonValAtPath(path,jsonObject){
        let pathComponents = path.split('/').slice(1), tempJson = jsonObject, temp;
        for(let i=0; i<pathComponents.length;i++){
            temp = tempJson[pathComponents[i]];
            if(temp === undefined){
                return null;
            }
            tempJson = temp;
        }
        return tempJson;
    }

    mergeJsonObjects(json1, json2) {
        for (var key in json2) {
            json1[key] = json2[key];
        }
        return json1;
    }

    groupingSubscriptionDetailsHandler(subscriptionId, groupByColumn) {
        console.log('GROUPING SUBSCRIPTION SUCCESSFUL, ID:', subscriptionId);
        this.parentControllerRef.addColumnSubscriptionMapper(subscriptionId, groupByColumn);
    }

    mapBinDataToAggregatedRows(aggregatedRowsData,keyBinMapper){
        let resultMap = new Map();
        aggregatedRowsData.forEach((item,key)=>{
            resultMap.set(key, {
                "groupData": item,
                "bucketData": keyBinMapper.get(key),
                "showBucketData": false,
                "isBuckedDataAggregated": false
            });
        })
        return resultMap;
    }

    getGroupBuckets(dataMap, groupingColumnArray) {
        let resultMap = new Map();
        dataMap.forEach((item, key) => {
            let groupingKey = groupingColumnArray.map((val,k)=>this.getJsonValAtPath(this.dataModel.dataKeysJsonpathMapper[val],item.data)).join('-');
            let resultMapIterationData = resultMap.get(this.groupingColumnKeyMap.get(groupingKey));
            if (resultMapIterationData === undefined) {
                let bucketData = new Map();
                // bucketData.set(key, item);
                resultMap.set(this.groupingColumnKeyMap.get(groupingKey), bucketData);
            } else {
                // resultMapIterationData.set(key, item);
            }
        });
        return resultMap;
    }

}
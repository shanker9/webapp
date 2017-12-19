
var AppDataModelSingleton = (function () {
    var instance;
    return {
        getInstance: function () {
            if (instance !== undefined) {
                return instance;
            } else {
                instance = new AppDataModel();
                return instance;
            }
        }
    }
})();

class AppDataModel {
    constructor() {
        this.dataMap = new Map();
        this.selectedRows = new Map();
        this.groupedData = undefined;
        this.groupColumnKeyMapper = undefined;
        this.groupedViewData = undefined;

        this.dataKeysJsonpathMapper = {
            "amerOrEuro": "/AmerOrEuro",
            "contractSize": "/ContractSize",
            "counterparty": "/Counterparty",

            "maturityDate": "/MaturityDate",

            "payCurrency": "/PayCurrency",
            "payDiscountCurve": "/PayDiscountCurve",
            "payFixedRate": "/PayFixedRate",
            "payNotional": "/PayNotional",

            "putOrCall": "/PutOrCall",

            "receiveCurrency": "/ReceiveCurrency",
            "receiveDiscountCurve": "/RreceiveDiscountCurve",
            "receiveIndex": "/ReceiveIndex",
            "receiveNotional": "/ReceiveNotional",

            "strike": "/Strike",

            "lastUpdated": "/LastUpdated",

            "payLeg": "/PayLeg",
            "receiveLeg": "/ReceiveLeg",

            "price": "/Price",
            "rho10bps": "/Rho10bps",
            "gamma1pct": "/Gamma1pct",
            "delta1pct": "/Delta1pct",
            "vega1pt": "/Vega1pt",
            "volatility": "/Volatility",

            "name": "/Name",
            "underlier": "/Underlier",
            "vertex": "/Vertex"
        }
    }

    /** dataMap methods */

    getDataMap() { return this.dataMap; }

    addorUpdateRowData(rowkey, rowdata) { this.dataMap.set(rowkey, rowdata); }

    getDataFromDefaultData(rowkey) { return this.dataMap.get(rowkey); }

    getDataMapInRangeFromDefaultData(startIndex, endIndex) {
        let iter = this.dataMap.keys();
        let i = 0, result = [], availableEndIndex;
        availableEndIndex = endIndex > this.dataMap.size ? this.dataMap.size : endIndex;
        for (; i < startIndex; i++) {
            iter.next();
        }
        for (; i < availableEndIndex; i++) {
            result.push(this.dataMap.get(iter.next().value));
        }
        return result;
    }

    getdefaultDataViewSize() { return this.dataMap.size; }

    addSelectedRow(rowKey, rowData) { this.selectedRows.set(rowKey, rowData); }
    removeSelectedRow(rowKey) { return this.selectedRows.delete(rowKey); }
    getSelectedRows() { return this.selectedRows; }
    clearSelectedRows() { this.selectedRows.clear() };
    clearSelectionStateData() {
        this.selectedRows.forEach((item, key) => {
            if (item.hasOwnProperty('aggRowKey')) {
                let childRows = this.getDataFromGroupedData(item.aggRowKey).bucketData;
                let dataForSelectedRow = childRows.get(item.rowID);
                dataForSelectedRow.isSelected = false;
            }
        })
        this.clearSelectedRows();
    }

    /** groupedData methods */

    getGroupedData() { return this.groupedData; }

    setGroupedData(groupedData) { this.groupedData = groupedData; }

    getDataFromGroupedData(groupKey) { return this.groupedData.get(groupKey); }

    setDataInGroupedData(groupRowkey, groupRowData) { this.groupedData.set(groupRowkey, groupRowData); }

    getDataMapInRangeFromGroupedData(startIndex, endIndex) { return this.groupedViewData.slice(startIndex, endIndex); }

    sortGroupedDataBy(columnkey) {
        // let jsonpath = this.dataKeysJsonpathMapper[columnkey];
        this.groupedData = this.sortMapByValue(this.groupedData, columnkey, (a, b) => {
            return a[0].localeCompare(b[0]);
            // this.getCellDataForKey(a[1].groupData, columnkey).localeCompare(this.getCellDataForKey(b[1].groupData, columnkey));
        })
    }

    getCellDataForKey(data, key) {
        try {
            let result, jsonpathforkey = this.dataKeysJsonpathMapper[key];

            if (jsonpathforkey === undefined) {
                return '';
            } else {
                let pathComponents = jsonpathforkey.split('/');
                pathComponents = pathComponents.filter(item => {
                    if (item !== "") {
                        return item;
                    } else {
                        return false;
                    }
                })

                result = data;
                pathComponents.forEach(pathComponent => {
                    result = result[pathComponent];
                })
            }

            return result;
        } catch (e) {
            console.log('error', e);
        }
    }

    sortMapByValue(map, columnkey, sortFunction) {
        var tupleArray = [], keyColumnMapper = new Map(), columnkeyData;
        map.forEach((item, key) => {
            columnkeyData = this.getCellDataForKey(item.groupData, columnkey);
            tupleArray.push([columnkeyData, item]);
            keyColumnMapper.set(columnkeyData, key);

            // tupleArray.push([key, item]);
        })
        tupleArray.sort(sortFunction);
        // tupleArray.forEach(item=>console.log(item[0]));        
        var sortedMap = new Map();
        tupleArray.forEach(function (item) {
            // sortedMap[keyColumnMapper.get(item[0])] = item[1];
            sortedMap.set(keyColumnMapper.get(item[0]), item[1]);
            // sortedMap.set(item[0],item[1]);
            // sortedMap[item[0]] = item[1];
        });
        return sortedMap;
    }

    /** groupedViewData methods */

    getGroupedViewData() { return this.groupedViewData; }

    setGroupedViewData(groupedViewData) { this.groupedViewData = groupedViewData; }

    getGroupedViewDataSize() { return this.groupedViewData.length; }


    /** groupColumnKeyMapper methods */

    getGroupColumnKeyMapper() { return this.groupColumnKeyMapper; }

    setGroupColumnKeyMapper(groupColumnKeyMapper) { this.groupColumnKeyMapper = groupColumnKeyMapper; }

    /** MULTI-LEVEL GROUPING METHODS**/

    // getMultiLevelGroupedData() {
    //     return this.multiLevelGroupedData;
    // }

    // setMultiLevelGroupedData(groupedMap) {
    //     this.multiLevelGroupedData = groupedMap;
    // }

    createGroupedViewedData(multiLevelGroupedData) {
        let result = [];
        multiLevelGroupedData.forEach((item, key) => {
            result.push({ "key": key, "data": item, "isAggregatedRow": true });
            if (item.isBuckedDataAggregated) {
                result.concat(this.createGroupedViewedData(item.bucketData));
            } else if (item.showBucketData) {
                item.bucketData.forEach((val, k) => { result.push({ "key": k, "data": val, "isAggregatedRow": false }) });
            }
        });
        // this.multiLevelGroupedData = result;
        return result;
    }


}

export default AppDataModelSingleton;
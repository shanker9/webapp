import AmpsControllerSingleton from '../Amps/AmpsController.js';
import AppDataModelSingleton from '../DataModel/AppDataModel.js';
import SubscriptionController from './SubscriptionController.js';
// import GroupSubscriptionController from './GroupSubscriptionController.js';
import AggregateSubscriptionController from './AggregateSubscriptionController';
import GraphQueryController from './GraphQueryController.js';
import AggregateDataQueryManager from './AggregateDataQueryManager';

export default class TableController {
    constructor(componentRef, subscriptionTopic) {
        this.uiRef = componentRef;
        this.subscriptionTopic = subscriptionTopic;
        this.ampsController = AmpsControllerSingleton.getInstance();
        this.appDataModel = AppDataModelSingleton.getInstance();

        this.groupingColumnsByLevel = [];
        this.livedatasubscriptionId = undefined;
        this.livedatasubscriptionCommmandCache = undefined;
        this.aggregateSubscriptionCommandCache = undefined;
        this.temporalSubscriptionCommandCache = undefined;
        this.isLiveData = true;
        this.graphQueryController = new GraphQueryController();
        this.columnSubscriptionMapper = new Map();
        this.setGroupingColumnKeyMapper = undefined;
    }

    /** FOR DEFAULT VIEW DATA SUBSCRIPTION */
    ampsSubscribe(commandObject, columnName) {
        let subController = new SubscriptionController(this, this.updateUIWithDefaultViewData.bind(this), this.rowUpdate.bind(this));
        this.ampsController.connectAndSubscribe(subController.defaultSubscriptionDataHandler.bind(subController),
            (subId) => {
                this.livedatasubscriptionId = subId;
                this.livedatasubscriptionCommmandCache = commandObject;
            },
            commandObject, columnName);
    }

    rowUpdate(rowObject, isAggregatedView) {
        isAggregatedView ? this.updateRowDataInGroupedData(rowObject) : this.updateUIRowWithData(rowObject.data, rowObject.isSelected, rowObject.rowID);
    }

    unsubscribe(subscriptionId, successCallback, subscriptionColumnReference) {
        this.ampsController.unsubscribe(subscriptionId, successCallback, subscriptionColumnReference);
    }

    updateUIWithDefaultViewData() {
        this.uiRef.loadDataGridWithDefaultView();
    }

    updateUIRowWithData(newData, selectState, rowReference) {
        this.uiRef.rowUpdate(newData, selectState, rowReference);
    }

    getDefaultViewData(startIndex, endIndex, rowHeight) {
        let gridDataSource = this.appDataModel.getDataMapInRangeFromDefaultData(startIndex, endIndex);
        let topDivHeight = startIndex * rowHeight;
        let bottomDivHeight = (this.appDataModel.getdefaultDataViewSize() - (startIndex + gridDataSource.length)) * rowHeight;
        return { gridDataSource, topDivHeight, bottomDivHeight };
    }

    updateRowDataInGroupedData(message) {
        let columnKeyMapper = this.appDataModel.getGroupColumnKeyMapper();
        let columnValue = this.groupingColumnsByLevel.map((val, k) => this.getJsonValAtPath(this.appDataModel.dataKeysJsonpathMapper[val], message.data)).join('-');
        let groupKey = columnKeyMapper.get(columnValue);
        let groupData = this.appDataModel.getDataFromGroupedData(groupKey);
        let existingData = groupData.bucketData.get(message.rowID);
        existingData.data = message.data;
    }

    getJsonValAtPath(path, jsonObject) {
        let pathComponents = path.split('/').slice(1), tempJson = jsonObject, temp;
        for (let i = 0; i < pathComponents.length; i++) {
            temp = tempJson[pathComponents[i]];
            if (temp === undefined) {
                return null;
            }
            tempJson = temp;
        }
        return tempJson;
    }


    getDatamapSize() {
        return this.appDataModel.getDataMap().size;
    }

    changeLiveDataStatus(status) {
        this.isLiveData = status;
    }

    /** GROUP SUBSCRIPTION DATAHANDLER **/

    groupDataByColumnKey(columnName) {
        // let subId = this.columnSubscriptionMapper.get(columnName);
        this.clearGroupSubscriptions();

        let index = this.groupingColumnsByLevel.indexOf(columnName);
        if (index !== -1) {
            // let newGroupingColumnsOrderArray = this.groupingColumnsByLevel.slice(0, index);
            // this.groupingColumnsByLevel = newGroupingColumnsOrderArray;
        } else {
            this.groupingColumnsByLevel.push(columnName);
        }

        this.groupingColumnsByLevel.length !== 0 ?
            this.ampsGroupSubscribe(this.groupingColumnsByLevel.slice(-1)[0])
            : this.updateUIWithDefaultViewData();
    }

    getGroupingColumnsArray(columnName) {
        return this.groupingColumnsByLevel;
    }

    ampsGroupSubscribe(columnName) {
        let commandObject = this.formCommandObjectForGroupSubscription(columnName);
        this.aggregateSubscriptionCommandCache = commandObject;
        let subController = new AggregateSubscriptionController(this, this.groupingColumnsByLevel, commandObject);

        this.ampsController.connectAndSubscribe(subController.groupingSubscriptionDataHandler.bind(subController),
            subController.groupingSubscriptionDetailsHandler.bind(subController),
            commandObject, columnName);
    }

    formCommandObjectForGroupSubscription(columnName) {
        let topic = this.subscriptionTopic;
        let orderby = `/${this.groupingColumnsByLevel[0]}`;
        let numericValueColumns = ['rho10bps', 'vega1pt', 'delta1pct', 'gamma1pct', 'payNotional', 'receiveNotional', 'price', 'receiveLeg', 'payLeg'];
        let maxValueColumns = ['lastUpdated','vertex'];
        let nonNumericColumns = ['counterparty', 'receiveIndex', 'payCurrency', 'payDiscountCurve', 'receiveDiscountCurve', 'receiveCurrency', 'amerOrEuro', 'putOrCall', 'contractSize', 'strike'];

        let groupingString = this.groupingColumnsByLevel.map((item, i) => `${this.getJSONPathForColumnKey(item)}`).join(',');

        let groupingColumnsCopy = this.groupingColumnsByLevel.slice(0);

        let groupingColumnsJsonpathArray = groupingColumnsCopy.map(item => this.getJSONPathForColumnKey(item));
        let nonNumericColumnsJsonpathArray = nonNumericColumns.map(item => this.getJSONPathForColumnKey(item));
        let dateValueColumnsJsonpathArray = maxValueColumns.map(item => this.getJSONPathForColumnKey(item));
        let aggregateColumnsJsonpathArray = numericValueColumns.map(item => this.getJSONPathForColumnKey(item));

        let projectionsArray = groupingColumnsJsonpathArray.concat(aggregateColumnsJsonpathArray, nonNumericColumnsJsonpathArray, dateValueColumnsJsonpathArray);
        projectionsArray.sort();

        projectionsArray = projectionsArray.map(path => {
            if (aggregateColumnsJsonpathArray.indexOf(path) !== -1) {
                return `SUM(${path}) AS ${path}`;
            } else {
                return `${path}`;
            }
        });
        projectionsArray = projectionsArray.map(projection => {
            if (dateValueColumnsJsonpathArray.indexOf(projection) !== -1) {
                return `MAX(${projection}) AS ${projection}`;
            } else {
                return `${projection}`;
            }
        });

        let projectionString = projectionsArray.join(',');

        let options = `projection=[${projectionString}],grouping=[${groupingString}]`;

        let commandObject;
        if (this.isLiveData) {
            let command = 'sow_and_subscribe';
            commandObject = { command, topic, orderby, options };
        } else {
            let command = 'sow';
            let bookmark = this.temporalSubscriptionCommandCache.bookmark;
            commandObject = { command, bookmark, topic, orderby, options };
        }
        return commandObject;
    }

    getJSONPathForColumnKey(key) {
        return this.appDataModel.dataKeysJsonpathMapper[key];
    }

    addColumnSubscriptionMapper(subscriptionId, columnName) {
        this.columnSubscriptionMapper.set(columnName, subscriptionId);
    }

    updateUIAggRowWithData(newData, rowReference) {
        this.uiRef.aggRowUpdate(newData, rowReference);
    }

    updateUIWithGroupedViewData() {
        this.uiRef.loadDataGridWithGroupedView();
    }

    updateGroupedViewData() {
        this.uiRef.updateDataGridWithGroupedView();
    }

    setGroupingColumnKeyMap(groupingColumnKeyMapper) {
        this.setGroupingColumnKeyMapper = groupingColumnKeyMapper;
    }

    isSubscriptionExists(groupByColumn) {
        let subscriptionId = this.columnSubscriptionMapper.get(groupByColumn);
        if (subscriptionId !== undefined) {
            return true;
        }
        return false;
    }

    getGroupedViewData(startIndex, endIndex, rowHeight) {
        let gridDataSource = this.appDataModel.getDataMapInRangeFromGroupedData(startIndex, endIndex);
        let topDivHeight = startIndex * rowHeight;
        let bottomDivHeight = (this.appDataModel.getGroupedViewDataSize() - (startIndex + gridDataSource.length)) * rowHeight;
        return { gridDataSource, topDivHeight, bottomDivHeight };
    }

    updateGroupExpansionStatus(groupKey) {
        let aggRowData = this.appDataModel.getDataFromGroupedData(groupKey);
        let isExpanded = aggRowData.showBucketData;
        aggRowData.showBucketData = !isExpanded;

        /** Write Logic to get childdata of aggregated row from amps */
        let aggDataQueryManager = AggregateDataQueryManager.getInstance();
        if (!isExpanded) {
            let command;
            command = this.isLiveData ? JSON.parse(JSON.stringify(this.aggregateSubscriptionCommandCache)) : JSON.parse(JSON.stringify(this.temporalSubscriptionCommandCache));
            delete command.options;
            let filterValuesArray = this.groupingColumnsByLevel.map((item) => {
                let key = this.appDataModel.dataKeysJsonpathMapper[item];
                let value = this.getJsonValAtPath(key, aggRowData.groupData);
                if (value == null) {
                    return `(${key} NOT LIKE '.')`
                } else {
                    return `${key}=='${value}'`;
                }
            });
            command.filter = filterValuesArray.join(' AND ');
            aggDataQueryManager.subscribeToDetailsOfAggRow(groupKey, command,
                this.updateGroupedViewData.bind(this), this.updateUIRowWithData.bind(this));
        } else {
            aggDataQueryManager.unsubscribeToDetailsOfAggRow(groupKey);
            aggRowData.bucketData.clear();
            aggRowData.bucketData = null;
            let groupedViewData = this.appDataModel.createGroupedViewedData(this.appDataModel.getGroupedData());
            this.appDataModel.setGroupedViewData(groupedViewData);
            this.updateGroupedViewData();
        }

    }

    createFilterString() {
        let aggRowData = this.appDataModel.getDataFromGroupedData(this.aggregatedRowReferenceKey);
        let filterValuesArray = this.filterArray.map((item) => {
            let value = this.getJsonValAtPath(this.appDataModel.dataKeysJsonpathMapper[item], aggRowData);
            return `/${item}=='${value}'`;
        });
        let filterString = filterValuesArray.join(' AND ');
        return filterString;
    }

    /** Clearing Grouping subscriptions */

    clearGroupSubscriptions() {
        if (this.columnSubscriptionMapper.size === 0) {
            return;
        }
        this.columnSubscriptionMapper.forEach((value, key) => {
            this.unsubscribe(value, (subId, columnRef) => this.columnSubscriptionMapper.delete(columnRef), key);
        });
        this.appDataModel.getGroupedData().clear();
        this.appDataModel.setGroupedData(undefined);
        // this.appDataModel.getGroupColumnKeyMapper().clear();
        // this.appDataModel.setGroupColumnKeyMapper(undefined);
        this.clearArray(this.appDataModel.getGroupedViewData());
        this.appDataModel.setGroupedViewData(undefined);
        // this.clearArray(this.groupingColumnsByLevel);
    }

    clearArray(array) {
        while (array.length > 0) {
            array.pop();
        }
    }

    /** DATA ROW SELECTION */

    updateRowSelectionData(indexValue, parentRowKey, isGroupedView) {
        // this.appDataModel.clearSelectionStateData();
        // Updating selectionstate in the rowData for later use in lazyloading
        let dataForSelectedRow;
        if (isGroupedView) {
            let parentDataofSelectedRow = this.appDataModel.getDataFromGroupedData(parentRowKey);
            let childRows = parentDataofSelectedRow.bucketData;
            dataForSelectedRow = childRows.get(indexValue);
        } else {
            dataForSelectedRow = this.appDataModel.getDataFromDefaultData(indexValue);
        }

        // let dataForSelectedRow = this.appDataModel.getDataFromDefaultData(indexValue);
        if (dataForSelectedRow !== undefined) {
            dataForSelectedRow.isSelected = !dataForSelectedRow.isSelected;
        } else {
            console.log('Data pertaining to the selected row does not exist in the appData');
        }

        //deselecting selected Rows
        let selectedRows = this.appDataModel.getSelectedRows();
        selectedRows.forEach(((item, key) => {
            if (item.hasOwnProperty('aggRowKey')) {
                let childRows = this.appDataModel.getDataFromGroupedData(item.aggRowKey).bucketData;
                let dataForSelectedRow = childRows.get(item.rowID);
                dataForSelectedRow.isSelected = false;
                this.updateUIRowWithData(dataForSelectedRow.data, dataForSelectedRow.isSelected, key);
            }else{
                let selectedRow = this.appDataModel.getDataFromDefaultData(key);
                selectedRow.isSelected = false;
                this.updateUIRowWithData(selectedRow.data, selectedRow.isSelected, key);                
            }

            // let dataFromDataMap = this.appDataModel.getDataFromDefaultData(key);
        }).bind(this))

        //clearing selectRows data
        this.appDataModel.clearSelectedRows();

        // updating selectedRows data
        if (dataForSelectedRow.isSelected) {
            this.appDataModel.addSelectedRow(indexValue, dataForSelectedRow);
        } else {
            this.appDataModel.removeSelectedRow(indexValue);
        }

        // update the UI for the selected row
        this.updateUIRowWithData(dataForSelectedRow.data, dataForSelectedRow.isSelected, indexValue);
    }

    fetchAndFormatGraphData(rowIndexValue, parentRowKey, isGroupedView, graphUpdateCallback) {
        let dataForSelectedRow;
        if (isGroupedView) {
            let parentDataofSelectedRow = this.appDataModel.getDataFromGroupedData(parentRowKey);
            let childRows = parentDataofSelectedRow.bucketData;
            dataForSelectedRow = childRows.get(rowIndexValue);
        } else {
            dataForSelectedRow = this.appDataModel.getDataFromDefaultData(rowIndexValue);
        }

        // let dataForSelectedRow = this.appDataModel.getDataFromDefaultData(rowIndexValue);
        const id = dataForSelectedRow.data.Vertex;
        if (id == null) {
            this.graphQueryController.unsubscribeParentNodeData();
            this.uiRef.updateGraphUIWithData({});            
            return;
        }
        let parentNodeData, parentNodeSources, childNodesArray;

        this.graphQueryController.unsubscribeParentNodeData();

        let parentNodeDataQueryRequest = this.graphQueryController.getParentNodeData(this.isLiveData, 'Graph', id, graphUpdateCallback);
        let parentNodeSourcesQueryRequest = this.graphQueryController.getGraphDataForNodeWithId('GraphSources', id);


        Promise.all([parentNodeDataQueryRequest, parentNodeSourcesQueryRequest]).then(values => {
            console.log('ParentNode and Sources data',values);
            parentNodeData = values[0];
            parentNodeSources = values[1].sources;
            let nodeDataArray = this.graphQueryController.getGraphNodesDataArrayWithIds('Graph', parentNodeSources);
            nodeDataArray.then(result => {
                console.log('childnodes data',result);
                childNodesArray = result;
                this.uiRef.updateGraphUIWithData({ parentNodeData, parentNodeSources, childNodesArray });
            })
        })
    }

    /* TEMPORAL METHODS */

    getDataAtBeforeMins(minutesInPast, isGroupedView) {
        let bookmark = this.getBookmarkInPast(minutesInPast);

        this.unsubscribeLiveData();
        this.clearGroupSubscriptions();

        if (isGroupedView) {
            let commandObject = this.aggregateSubscriptionCommandCache;
            commandObject.command = 'sow';
            commandObject.bookmark = bookmark;
            console.log(commandObject);
            let subController = new AggregateSubscriptionController(this, ['name'], commandObject);
            this.ampsController.connectAndSubscribe(subController.groupingSubscriptionDataHandler.bind(subController),
                subController.groupingSubscriptionDetailsHandler.bind(subController),
                commandObject);
            this.temporalSubscriptionCommandCache = commandObject;
        } else {
            let commandObject = {
                "command": "sow",
                "topic": this.subscriptionTopic,
                "bookmark": bookmark,
                "orderBy": "/product",
            }
            this.ampsSubscribe(commandObject);
            this.temporalSubscriptionCommandCache = commandObject;
        }
        this.isLiveData = false;

    }

    getBookmarkInPast(minutesInPast) {
        let dateNow = new Date(Date.now());
        dateNow.setMinutes(dateNow.getMinutes() - minutesInPast);
        let UTCfullYear = dateNow.getUTCFullYear();
        let UTCdate = dateNow.getUTCDate() < 10 ? '0' + dateNow.getUTCDate() : dateNow.getUTCDate();
        let UTCMonth = (dateNow.getUTCMonth() + 1) < 10 ? '0' + (dateNow.getUTCMonth() + 1) : (dateNow.getUTCMonth() + 1);
        let UTCHours = dateNow.getUTCHours() < 10 ? '0' + dateNow.getUTCHours() : dateNow.getUTCHours();
        let UTCMinutes = dateNow.getUTCMinutes() < 10 ? '0' + dateNow.getUTCMinutes() : dateNow.getUTCMinutes();
        let UTCSeconds = dateNow.getUTCSeconds() < 10 ? '0' + dateNow.getUTCSeconds() : dateNow.getUTCSeconds();

        let bookmark = `${UTCfullYear}${UTCMonth}${UTCdate}T${UTCHours}${UTCMinutes}${UTCSeconds}`;
        console.log(bookmark);
        return bookmark;
    }

    unsubscribeLiveData() {
        if (this.livedatasubscriptionId !== undefined) {
            this.unsubscribe(this.livedatasubscriptionId, (subid, colname) => console.log('unsubscribed live data subscription with id', subid))
        }
    }
}

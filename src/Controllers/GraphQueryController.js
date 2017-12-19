import AmpsControllerSingleton from '../Amps/AmpsController.js';
// import AppDataModelSingleton from '../DataModel/AppDataModel.js';

export default class GraphQueryController {
    constructor() {
        this.ampsController = AmpsControllerSingleton.getInstance();
        this.parentNodeSubscriptionId = undefined;
    }

    getGraphDataWithId(isLiveData, queryTopic, filter, dataHandler, subscriptionIdHandler, queryId) {
        let commandObject = {
            "topic": queryTopic,
            "filter": filter
        };

        commandObject.command = isLiveData ? 'sow_and_subscribe' : 'sow';

        this.ampsController.connectAndSubscribe(dataHandler, subscriptionIdHandler, commandObject);
    }

    getParentNodeData(isLiveData, queryTopic, nodeId, callback) {
        let graphNodeData, isSowDataEnd;
        return new Promise((resolve, reject) => {
            this.getGraphDataWithId(isLiveData, queryTopic, `/id=="${nodeId}"`, (message) => {

                // console.log("UPDATE: ",message.c,message.data);
                if (message.c === 'group_begin') { return; }
                else if (message.c === 'group_end') {
                    isSowDataEnd = true;
                    resolve(graphNodeData);
                }
                else {
                    if (isSowDataEnd) {
                        callback(message.data);
                        return;
                    }
                    graphNodeData = message.data;
                }
            }, subId => this.parentNodeSubscriptionId = subId)
        })
    }

    getGraphDataForNodeWithId(queryTopic, nodeId, unsubscribeAfterSowData, callback) {
        let graphNodeData, subscriptionId, isLiveData = false;
        return new Promise((resolve, reject) => {
            this.getGraphDataWithId(isLiveData, queryTopic, `/id=="${nodeId}"`, (message) => {

                if (message.c === 'group_begin') { return; }
                else if (message.c === 'group_end') {
                    this.ampsController.unsubscribe(subscriptionId, unsubscribeId => console.log('Query Unsubscribed Id:', unsubscribeId))
                    resolve(graphNodeData);
                }
                graphNodeData = message.data;
            }, subId => subscriptionId = subId)
        })
    }

    unsubscribeParentNodeData() {
        if (this.parentNodeSubscriptionId !== undefined) {
            this.ampsController.unsubscribe(this.parentNodeSubscriptionId, unsubscribeId => console.log('Query Unsubscribed Id:', unsubscribeId));
        }
    }

    getGraphNodesDataArrayWithIds(queryTopic, nodeIdArray) {
        let subscriptionId, graphNodesArray = [], isLiveData = false;
        let commaSeparatedNodeIds = nodeIdArray.map(item => `"${item}"`).join(',');
        let queryString = `/id in (${commaSeparatedNodeIds})`;

        return new Promise((resolve, reject) => {
            this.getGraphDataWithId(isLiveData, queryTopic, queryString, (message) => {
                if (message.c === 'group_begin') { return; }
                else if (message.c === 'group_end') {
                    this.ampsController.unsubscribe(subscriptionId, unsubscribeId => console.log('Query Unsubscribed Id:', unsubscribeId))
                    resolve(graphNodesArray);
                }
                else {
                    graphNodesArray.push(message.data);
                }
            }, subId => subscriptionId = subId)
        })
    }

}
import AmpsControllerSingleton from '../Amps/AmpsController.js';
// import AppDataModelSingleton from '../DataModel/AppDataModel.js';
import GraphNodeDataModel from '../DataModel/GraphNodeDataModel';
import PricingResultsObject from '../proto_js/PricingResultsMsg_pb';
import Wrapper_pb from '../proto_js/Wrapper_pb';
import TimeSeriesMsg_pb from '../proto_js/TimeSeriesMsg_pb';
import RateCurveMsg_pb from '../proto_js/RateCurveMsg_pb';
import SwapDefinitionMsg_pb from '../proto_js/SwapDefinitionMsg_pb';
import HolidayCalendarMsg_pb from '../proto_js/HolidayCalendarMsg_pb';
import SwapMsg_pb from '../proto_js/SwapMsg_pb';
import ProductDetailsMsg_pb from '../proto_js/ProductDetailsMsg_pb';
import OptionMsg_pb from '../proto_js/OptionMsg_pb';
import PricingResultsMsg_pb from '../proto_js/PricingResultsMsg_pb';
import DateTimeMsg_pb from '../proto_js/DateTimeMsg_pb';

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

        this.ampsController.connectAndSubscribeForProtobuf(dataHandler, subscriptionIdHandler, commandObject);
    }

    getParentNodeData(isLiveData, queryTopic, nodeId, callback) {
        let graphNodeData, subscriptionId, isSowDataEnd, updateData;
        return new Promise((resolve, reject) => {
            this.getGraphDataWithId(isLiveData, queryTopic, `/vertex/id=="${nodeId}"`, (message) => {

                let messageType = message.c;

                switch (messageType) {
                    case 'group_begin':
                        break;
                    case 'group_end':
                        // this.ampsController.unsubscribeProtobuf(subscriptionId, unsubscribeId => console.log('Query Unsubscribed Id:', unsubscribeId))
                        resolve(graphNodeData);
                        break;
                    case 'sow':
                        graphNodeData = new GraphNodeDataModel(this.convertBinaryToProtobuf(message.data));
                        graphNodeData.deserializeSubType();
                        break;
                    case 'p':
                        updateData = new GraphNodeDataModel(this.convertBinaryToProtobuf(message.data));
                        updateData.deserializeSubType();
                        callback(updateData);
                        break;
                }
            }, subId => this.parentNodeSubscriptionId = subId)
        })
    }

    getGraphDataForNodeWithId(queryTopic, nodeId, unsubscribeAfterSowData, callback) {
        let graphNodeData, subscriptionId, isLiveData = false;
        return new Promise((resolve, reject) => {
            this.getGraphDataWithId(isLiveData, queryTopic, `/sources/id=="${nodeId}"`, (message) => {

                let messageType = message.c;

                switch (messageType) {
                    case 'group_begin':
                        break;
                    case 'group_end':
                        this.ampsController.unsubscribeProtobuf(subscriptionId, unsubscribeId => console.log('Query Unsubscribed Id:', unsubscribeId))
                        resolve(graphNodeData);
                        break;
                    case 'sow':
                        graphNodeData = this.convertBinaryToProtobuf(message.data);
                        break;
                    case 'p':
                        break;
                }
            }, subId => subscriptionId = subId)
        })
    }

    unsubscribeParentNodeData() {
        if (this.parentNodeSubscriptionId !== undefined) {
            this.ampsController.unsubscribeProtobuf(this.parentNodeSubscriptionId, unsubscribeId => console.log('Query Unsubscribed Id:', unsubscribeId));
        }
    }

    getGraphNodesDataArrayWithIds(queryTopic, nodeIdArray) {
        let subscriptionId, graphNodesArray = [], isLiveData = false, convertSubTypes = true;
        let commaSeparatedNodeIds = nodeIdArray.map(item => `"${item}"`).join(',');
        let queryString = `/vertex/id in (${commaSeparatedNodeIds})`;

        return new Promise((resolve, reject) => {
            this.getGraphDataWithId(isLiveData, queryTopic, queryString, (message) => {

                let messageType = message.c;

                switch (messageType) {
                    case 'group_begin':
                        break;
                    case 'group_end':
                        this.ampsController.unsubscribeProtobuf(subscriptionId, unsubscribeId => console.log('Query Unsubscribed Id:', unsubscribeId))
                        resolve(graphNodesArray);
                        break;
                    case 'sow':
                        graphNodesArray.push(new GraphNodeDataModel(this.convertBinaryToProtobuf(message.data)));
                        break;
                    case 'p':
                        break;
                }
            }, subId => subscriptionId = subId)
        })
    }

    convertBinaryToProtobuf(binaryData) {
        let deserializedProtobufData, isDataVertex, deserializedObjectData, type, value, deserializedVertexTypeProtobufData;
        deserializedProtobufData = Wrapper_pb.Wrapper.deserializeBinary(binaryData);
        return deserializedProtobufData;
    }

}
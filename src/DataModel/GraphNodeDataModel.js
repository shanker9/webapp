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

class GraphNodeDataModel {
    constructor(graphNodeDataObject) {
        this.vertexObject = graphNodeDataObject;
        this.subTypeDeserialized = undefined;
        this.isSubTypeDeserialized = false;
    }

    getVertex() {
        return this.vertexObject.getVertex();
    }

    getId() {
        return this.getVertex().getId();
    }

    getShortId() {
        return this.getVertex().getShortId();
    }

    getDeserializedJson() {
        let jsonObject = this.formDeserializedJson(this.vertexObject);
        return jsonObject;
    }

    deserializeSubType() {
        let isDataVertex, type, value, deserializeSubType;
        isDataVertex = this.vertexObject.getVertex().hasData();

        if (isDataVertex) {
            type = this.vertexObject.getVertex().getData().getData().getTypeName();
            value = this.vertexObject.getVertex().getData().getData().getValue();
        } else {
            type = this.vertexObject.getVertex().getFunc().getResult().getData().getTypeName();
            value = this.vertexObject.getVertex().getFunc().getResult().getData().getValue();
        };

        deserializeSubType = this.deserializeBinaryToType(type, value);
        this.subTypeDeserialized = deserializeSubType;
        this.isSubTypeDeserialized = true;
    }

    formDeserializedJson(deserializedProtobufData) {
        let isDataVertex, deserializedObjectData, type, value, deserializedVertexTypeProtobufData;
        deserializedObjectData = deserializedProtobufData.toObject();
        isDataVertex = deserializedProtobufData.getVertex().hasData();

        if (isDataVertex) {
            type = deserializedProtobufData.getVertex().getData().getData().getTypeName();
            value = deserializedProtobufData.getVertex().getData().getData().getValue();
        } else {
            type = deserializedProtobufData.getVertex().getFunc().getResult().getData().getTypeName();
            value = deserializedProtobufData.getVertex().getFunc().getResult().getData().getValue();
        };

        deserializedVertexTypeProtobufData = this.deserializeBinaryToType(type, value);
        isDataVertex ? deserializedObjectData.vertex.data.data.value = deserializedVertexTypeProtobufData.toObject() : deserializedObjectData.vertex.func.result.data.value = deserializedVertexTypeProtobufData.toObject();
        return deserializedObjectData;
    }

    deserializeBinaryToType(type, binaryData) {
        let deserializedVertexTypeProtobufData;
        switch (type) {
            case 'qspace.TimeSeriesMsg':
                deserializedVertexTypeProtobufData = TimeSeriesMsg_pb.TimeSeriesMsg.deserializeBinary(binaryData);
                break;
            case 'qspace.RateCurveMsg':
                deserializedVertexTypeProtobufData = RateCurveMsg_pb.RateCurveMsg.deserializeBinary(binaryData);
                break;
            case 'qspace.SwapDefinitionMsg':
                deserializedVertexTypeProtobufData = SwapDefinitionMsg_pb.SwapDefinitionMsg.deserializeBinary(binaryData);
                break;
            case 'qspace.HolidayCalendarMsg':
                deserializedVertexTypeProtobufData = HolidayCalendarMsg_pb.HolidayCalendarMsg.deserializeBinary(binaryData);
                break;
            case 'qspace.SwapMsg':
                deserializedVertexTypeProtobufData = SwapMsg_pb.SwapMsg.deserializeBinary(binaryData);
                break;
            case 'qspace.ProductDetailsMsg':
                deserializedVertexTypeProtobufData = ProductDetailsMsg_pb.ProductDetailsMsg.deserializeBinary(binaryData);
                break;
            case 'qspace.OptionMsg':
                deserializedVertexTypeProtobufData = OptionMsg_pb.OptionMsg.deserializeBinary(binaryData);
                break;
            case 'qspace.PricingResultsMsg':
                deserializedVertexTypeProtobufData = PricingResultsMsg_pb.PricingResultsMsg.deserializeBinary(binaryData);
                break;
            case 'qspace.DateTimeMsg':
                deserializedVertexTypeProtobufData = DateTimeMsg_pb.DateTimeMsg.deserializeBinary(binaryData);
                break;
        }
        return deserializedVertexTypeProtobufData;
    }

}

export default GraphNodeDataModel;